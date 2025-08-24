<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/jwt.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/read_json.php';

use App\Utils\JsonBodyException;
use function App\Utils\readJson;

try {
    $postData = readJson();
} catch (JsonBodyException $e) {
    http_response_code($e->status);
    echo json_encode([
        'error' => $e->getMessage(),
        "message" => $e->getMessage()
    ]); exit;
}

$email = trim((string)($postData['email'] ?? ''));
$password = (string)($postData['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
    http_response_code(422);
    echo json_encode([
        'error' => 'invalid_email',
        "message" => "Geçersiz Email!"
    ]);
    exit;
}

$pdo = db();
$stmt = $pdo->prepare('SELECT usr.ID, usr.Email, usr.PasswordHash, usr.Is_Active, usr.Role_ID, mbr.Name, mbr.Surname FROM Users AS usr JOIN Members AS mbr ON usr.ID = mbr.User_ID WHERE usr.Email = :email LIMIT 1');
$stmt->execute([
    "email" => $email
]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['PasswordHash'])) {
    http_response_code(401);
    echo json_encode([
        'error'=>'invalid_credentials',
        "message" => "Hatalı Giriş!"
    ]);
    exit;
}

if ((int)$user['Is_Active'] !== 1) {
    http_response_code(403);
    echo json_encode([
        'error' => 'inactive_user',
        "message" => "Aktif Olmayan Kullanıcı!"
    ]);
    exit;
}

$user_id = $user["ID"];
$user_name = $user["Name"];
$user_email = $user["Email"];
$user_role = $user['Role_ID'] == 1 ? "Admin" : "Member";
$access = make_access_token((int)$user_id, $user_email, $user_role);

// --- Refresh token (DB + Cookie)
$rawRefresh = new_refresh_token();
$hash = hash('sha256', $rawRefresh);
$exp  = date('Y-m-d H:i:s', time() + REFRESH_TTL_SEC);

$ins = $pdo->prepare('INSERT INTO RefreshTokens (User_ID, Token_Hash, Expires_At, Created_by_IP, User_Agent) VALUES (:user_id, :token_hash, :expires_at, :created_by_ip, :user_agent)');
$ins->execute([
    "user_id" => (int)$user_id,
    "token_hash" => $hash,
    "expires_at" => $exp,
    "created_by_ip" => $_SERVER['REMOTE_ADDR'] ?? null,
    "user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? null
]);

set_refresh_cookie($rawRefresh);

echo json_encode([
    'ok'=>true,
    'access_token'=>$access,
    'token_type'=>'Bearer',
    'expires_in'=>ACCESS_TTL_SEC,
    'user'=>[
        'id'=>(int)$user_id,
        'name'=>$user_name,
        'email'=>$user_email,
        'role'=>$user_role
    ]
]);

?>