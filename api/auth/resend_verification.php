<?php

declare(strict_types=1);

require_once __DIR__ . '/../utils/config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/read_json.php';
require_once __DIR__ . '/../utils/verify.php';

use App\Utils\JsonBodyException;
use function App\Utils\readJson;

try {
    $postData = readJson();
} catch (JsonBodyException $e) {
    http_response_code($e->status);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

$email = trim((string)($postData['email'] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Geçersiz Email!']);
    exit;
}

$pdo = db();
$stmt = $pdo->prepare('SELECT ID, name, Is_Active FROM Users WHERE Email=:email LIMIT 1');
$stmt->execute(["email" => $email]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(200);
    echo json_encode(['ok'=>true]);
    exit;
} // bilgi sızıntısı önleme

if ((int)$user['Is_Active'] === 1) {
    http_response_code(200);
    echo json_encode(['ok'=>true]);
    exit;
}

// Throttle: son 60 sn içinde gönderildiyse engelle
$last = $pdo->prepare('SELECT Created_At FROM EmailVerifications WHERE User_ID=:user_id ORDER BY ID DESC LIMIT 1');
$last->execute([
    "user_id" => (int)$user['ID']
]);
$lr = $last->fetch();
if ($lr && strtotime($lr['Created_At']) > time() - 60) {
    http_response_code(429);
    echo json_encode(['error'=>'too_many_requests']);
    exit;
}

// Öncekileri geçersiz kılmak istersen:
$pdo->prepare('UPDATE EmailVerifications SET Used_At=NOW() WHERE User_ID=:user_id AND Used_At IS NULL')->execute([
    "user_id" => (int)$user['ID']
]);

[$token, $tokenHash] = new_email_verify_token();
$exp = date('Y-m-d H:i:s', time() + VERIFY_TOKEN_TTL_SEC);
$pdo->prepare('INSERT INTO EmailVerifications (User_ID, Token_Hash, Expires_At, Sent_To, Created_by_IP, User_Agent) VALUES (:user_id, :token_hash, :expires_at, :sent_to, :created_by_ip, :user_agent)')
    ->execute([
        "user_id" => (int)$user['ID'],
        "token_hash" => $tokenHash,
        "expires_at" => $exp,
        "sent_to" => $email,
        "created_by_ip" => $_SERVER['REMOTE_ADDR'] ?? null,
        "user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? null
    ]);

$url = build_verify_url((int)$user['ID'], $token);
send_verification_email($email, $user['Name'], $url);

echo json_encode(['ok'=>true]);

?>