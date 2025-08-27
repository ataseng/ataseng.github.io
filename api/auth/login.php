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
$stmt = $pdo->prepare('SELECT usr.ID, usr.Email, usr.PasswordHash, usr.Is_Active, rl.Name as Role, mbr.StudentNo, mbr.Name, mbr.Surname, mbr.Grade, mbr.Position, mbr.Task, mbr.Department, mbr.BirthDate, mbr.Gender, mbr.Phone FROM Users AS usr JOIN Members AS mbr ON usr.ID = mbr.User_ID JOIN Roles AS rl ON usr.Role_ID = rl.ID WHERE usr.Email = :email LIMIT 1');
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
$user_email = $user["Email"];
$user_role = $user['Role'];
$user_studentNo = $user["StudentNo"];
$user_name = $user["Name"];
$user_surname = $user["Surname"];
$user_grade = $user["Grade"];
$user_position = $user["Position"];
$user_task = $user["Task"];
$user_department = $user["Department"];
$user_birthdate = $user["BirthDate"];
$user_gender = $user["Gender"];
$user_phone = $user["Phone"];

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
        'email'=>$user_email,
        'role'=>$user_role,
        'student_no' => $user_studentNo,
        'name'=>$user_name,
        'surname'=>$user_surname,
        'grade'=>$user_grade,
        'position'=>$user_position,
        'task' => $user_task,
        'department' => $user_department,
        'birthdate' => $user_birthdate,
        'gender' => $user_gender,
        'phone' => $user_phone
    ]
]);

?>