<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/read_json.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/temp_mail_check.php';
require_once __DIR__ . '/../utils/verify.php';

use App\Utils\JsonBodyException;
use function App\Utils\readJson;

$pdo = db();

try {
    $postData = readJson();
} catch (JsonBodyException $e) {
	http_response_code($e->status);
	echo json_encode(['error' => $e->getMessage()]);
    exit;
}

$email = trim((string)($postData['email'] ?? ''));
$password = (string)($postData['password'] ?? '');
$student_no = trim((string)($postData['student_no'] ?? ''));
$name = trim((string)($postData['name'] ?? ''));
$surname = trim((string)($postData['surname'] ?? ''));
$grade = trim((string)($postData['grade'] ?? ''));
$department = trim((string)($postData['department'] ?? ''));

$errors = [];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Geçersiz Email!';
if (check_temp_mail($email)) $errors["email"] = "Geçersiz Email!";
if (strlen($password) < 8) $errors['password'] = 'Parola En Az 8 Karakter Olmalıdır!';
if ($student_no === '') $errors['student_no'] = 'required';
if ($name === '') $errors['name'] = 'required';
if ($surname === '') $errors['surname'] = 'required';
if ($grade === '') $errors['grade'] = 'required';
if ($department === '') $errors['department'] = 'required';
if ($errors) {
    http_response_code(422);
    echo json_encode(['error'=>'Form Hatası','fields'=>$errors]); exit;
}

try {

    // $check_sql_with_union = "SELECT User AS SOURCE, ID FROM Users WHERE Email = :email UNION SELECT 'Member' AS SOURCE, StudentNo FROM Members WHERE StudentNo = :student_no";

    $check_sql_with_count = "SELECT (SELECT COUNT(*) FROM Users WHERE Email = :email) AS user_exists,
  (SELECT COUNT(*) FROM Members WHERE StudentNo = :student_no) AS member_exists";

  	$stmt = $pdo->prepare($check_sql_with_count);
	$stmt->execute([
		"email" => $email,
		"student_no" => $student_no
	]);
	$result = $stmt->fetch();

	if($result && $result != NULL){
		$user_exists = (int)$result["user_exists"] == 1;
		$member_exists= (int)$result["member_exists"] == 1;
		if($user_exists || $member_exists){
			http_response_code(409);
			if($user_exists)
				echo json_encode(['error'=>'Email Kullanılmaktadır!']);
			else if($member_exists)
				echo json_encode(['error'=>'Öğrenci Numarası Zaten Kayıtlı!']);
			exit;
		}
	}

	// $stmt = $pdo->prepare('SELECT ID FROM Users WHERE Email = :Email LIMIT 1');
	// $stmt->execute([
	// 	"Email" => $email
	// ]);
	// if ($stmt->fetch()) { http_response_code(409); echo json_encode(['error'=>'Email Kullanılmaktadır!']); exit; }

	$hash = password_hash($password, PASSWORD_DEFAULT);

	$pdo->beginTransaction();

	$stmt = $pdo->prepare('INSERT INTO Users (Email, PasswordHash) VALUES (:email, :password_hash)');
	$stmt->execute([
		"email" => $email,
		"password_hash" => $hash
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

    [$token, $tokenHash] = new_email_verify_token();
    $exp = date('Y-m-d H:i:s', time() + VERIFY_TOKEN_TTL_SEC);
    $pdo->prepare('INSERT INTO EmailVerifications (User_ID, Token_Hash, Expires_At, Sent_To, Created_by_IP, User_Agent) VALUES (:user_id, :token_hash, :expires_at, :sent_to, :created_by_ip, :user_agent)')
      ->execute([
        $userId,
        $tokenHash,
        $exp,
        $email,
        $_SERVER['REMOTE_ADDR'] ?? null,
        $_SERVER['HTTP_USER_AGENT'] ?? null
    ]);

	$pdo->commit();

    $url = build_verify_url($userId, $token);
    if (!send_verification_email_phpmailer($email, $name, $url)) {
        // gönderim hatası: kullanıcı var, ama kullanıcıya “tekrar dene” akışı göster
        // (istersen burada token kaydını silip tekrar deneyebilirsin)
    }

	http_response_code(201);
	echo json_encode(['ok'=>true, 'message'=>'Kayıt Başarılı!']);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
	// http_response_code($e->status);
    http_response_code(500);
	echo json_encode(['error' => $e->getMessage()]);
}

?>