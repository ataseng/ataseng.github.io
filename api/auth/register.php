<?php

require_once __DIR__ . '/../config.php';

header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

use App\Utils\JsonBodyException;
use function App\Utils\readJson;

require_once __DIR__ . '/../utils/read_json.php';

// function readJson(): array {
//   $raw = file_get_contents('php://input') ?: '';
//   $data = json_decode($raw, true);
//   if (!is_array($data)) { http_response_code(400); echo json_encode(['error'=>'invalid_json']); exit; }
//   return $data;
// }

try {
	$db_server = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
	$pdo = new PDO(
		$db_server, $username, $password,
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
	$student_no = trim((string)($postData['student_no'] ?? ''));
	$name = trim((string)($postData['name'] ?? ''));
	$surname = trim((string)($postData['surname'] ?? ''));
	$grade = trim((string)($postData['grade'] ?? ''));
	$department = trim((string)($postData['department'] ?? ''));

	$errors = [];
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'invalid_email';
	if (strlen($password) < 8) $errors['password'] = 'min_8_chars';
	if ($student_no === '') $errors['student_no'] = 'required';
	if ($name === '') $errors['name'] = 'required';
	if ($surname === '') $errors['surname'] = 'required';
	if ($grade === '') $errors['grade'] = 'required';
	if ($department === '') $errors['department'] = 'required';
	if ($errors) {
		http_response_code(422);
		echo json_encode(['error'=>'validation','fields'=>$errors]); exit;
	}

	$stmt = $pdo->prepare('SELECT ID FROM Users WHERE Email = :Email LIMIT 1');
	$stmt->execute([
		"Email" => $email
	]);
	if ($stmt->fetch()) { http_response_code(409); echo json_encode(['error'=>'email_in_use']); exit; }

	$hash = password_hash($password, PASSWORD_DEFAULT);

	$pdo->beginTransaction();

	$stmt = $pdo->prepare('INSERT INTO Users (Email, PasswordHash) VALUES (:Email, :PasswordHash)');
	$stmt->execute([
		"Email" => $email,
		"PasswordHash" => $hash
	]);

	$userId = (int)$pdo->lastInsertId();

	$stmt = $pdo->prepare(
        "INSERT INTO Members (StudentNo, Name, Surname, Grade, Department, User_ID) VALUES (:studentNo, :name, :surname, :grade, :department, :user_id)"
    );

	$stmt->execute([
		"studentNo" => $student_no,
		"name" => $name,
		"surname" => $surname,
		"grade" => $grade,
		"department" => $department,
		"user_id" => $userId
	]);

	$pdo->commit();

	http_response_code(201);
	echo json_encode(['ok'=>true, 'message'=>'registered']);

} catch (JsonBodyException $e) {
	http_response_code($e->status);
	echo json_encode(['error' => $e->getMessage()]);
}

?>