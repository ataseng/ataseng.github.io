<?php

header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

require_once __DIR__ . '/../config.php';

use App\Utils\JsonBodyException;
use function App\Utils\readJson;

require_once __DIR__ . '/../utils/read_json.php';

// function readJson(): array {
//   $raw = file_get_contents('php://input') ?: '';
//   $data = json_decode($raw, true);
//   if (!is_array($data)) { http_response_code(400); echo json_encode(['error'=>'invalid_json']); exit; }
//   return $data;
// }

function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function jwt_encode(array $payload, string $secret): string {
    $header = ['alg'=>'HS256','typ'=>'JWT'];
    $h = base64url_encode(json_encode($header, JSON_UNESCAPED_SLASHES));
    $p = base64url_encode(json_encode($payload, JSON_UNESCAPED_SLASHES));
    $sig = hash_hmac('sha256', "$h.$p", $secret, true);
    $s = base64url_encode($sig);
    return "$h.$p.$s";
}

try {
	$pdo = new PDO(
		$db_server, $db_username, $db_password,
		[
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		]
	);
} catch (Throwable $e) {
  http_response_code(500); echo json_encode(['error'=>'db_connect_failed']); exit;
}

try {
	$postData = readJson();

	$email = trim((string)($postData['email'] ?? ''));
	$password = (string)($postData['password'] ?? '');

	if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
        http_response_code(422);
        echo json_encode(['error'=>'validation']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT usr.ID, usr.Email, usr.PasswordHash, usr.Status, usr.Role_ID, mbr.Name, mbr.Surname FROM Users AS usr JOIN Members AS mbr ON usr.ID = mbr.User_ID WHERE email = :email LIMIT 1');
    $stmt->execute([
        "email" => $email
    ]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['PasswordHash'])) {
        http_response_code(401);
        echo json_encode(['error'=>'invalid_credentials']);
        exit;
    }

    if ((int)$user['Status'] !== 1) {
        http_response_code(403);
        echo json_encode(['error'=>'inactive_user']);
        exit;
    }

	$hash = password_hash($password, PASSWORD_DEFAULT);

	$now = time();
    $duration = 15 * 60;
    $exp = $now + $duration; // 15 dk
    $payload = [
        'iss' => $base_url,
        'aud' => "https://" . $server_name,
        'iat' => $now,
        'nbf' => $now,
        'exp' => $exp,
        'sub' => (string)$user['ID'],
        'name'=> $user['Name'],
        'email'=> $user['Email'],
        'role'=> $user['Role_ID'] == 1 ? "Admin" : "Member"
    ];
    $accessToken = jwt_encode($payload, JWT_SECRET);

	http_response_code(200);
	echo json_encode([
        'ok' => true,
        'access_token' => $accessToken,
        'token_type' => 'Bearer',
        'expires_in' => $duration,
        'user' => [
            'id' => (int)$user['ID'],
            'name' => $user['Name'],
            'surname' => $user['Surname'],
            'email' => $user['Email'],
            'role' => $user['Role_ID'] == 1 ? "Admin" : "Member",
        ]
    ]);

} catch (JsonBodyException $e) {
	http_response_code($e->status);
	echo json_encode(['error' => $e->getMessage()]);
}

?>