<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/middleware.php';
require_once __DIR__ . '/../utils/jwt.php';

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "PUT"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Put only method";
    echo json_encode($response_message);
    exit;
}

$payload = require_auth();

// print_r($payload); exit;

$json = file_get_contents('php://input');
$putData = json_decode($json, true);

$payload_user_id = (int) $payload["sub"];
$payload_email = $payload["email"];

$put_user_id = (int)$putData["ID"];
$put_user_student_no = $putData["StudentNo"];
$put_user_old_password = $putData["old_password"];
$put_user_new_password = $putData["new_password"];
$put_user_name = $putData["Name"];
$put_user_surname = $putData["Surname"];
$put_user_department = $putData["Department"];
$put_user_grade = $putData["Grade"];
$put_user_birthdate = $putData["BirthDate"];
$put_user_gender = $putData["Gender"];
$put_user_phone = $putData["Phone"];

if (!is_null($put_user_new_password)) {
    if (strlen($put_user_new_password) < 8){
        http_response_code(422);
        echo json_encode([
            'error'=>'Form Hatası',
            'message'=>'Parola En Az 8 Karakter Olmalıdır!'
        ]); exit;
    }
}

try {
    $pdo = db();

    $select_user_sql = "SELECT ID, Email, PasswordHash FROM Users WHERE ID=:id";
    $select_user_query = $pdo->prepare($select_user_sql);
    $select_user_query->execute([
        "id" => $payload_user_id
    ]);
    $user = $select_user_query->fetch();
    $selected_user_id = (int)$user["ID"];

    if($selected_user_id !== $payload_user_id || $selected_user_id !== $put_user_id){
        http_response_code(400);
        echo json_encode(array(
            "error" => "an_error_occured",
            "message" => "Doğrulama Hatası!"
        ));
        exit;
    }

    if(!is_null($put_user_new_password) && !is_null($put_user_old_password)){

        $selected_user_password_hash = $user["PasswordHash"];
	    if(!password_verify($put_user_old_password, $selected_user_password_hash)){
            http_response_code(400);
            echo json_encode(array(
                "error" => "an_error_occured",
                "message" => "Parola Yanlış!"
            ));
            exit;
        }
    }

    $check_sql_with_count = "SELECT COUNT(*) AS member_exists FROM Member WHERE StudentNo = :student_no";

  	$stmt = $pdo->prepare($check_sql_with_count);
	$stmt->execute([
		"student_no" => $put_user_student_no
	]);
	$result = $stmt->fetch();

	if($result && $result != NULL){
		$member_exists= (int)$result["member_exists"] == 1;
        if($member_exists)
        {
            http_response_code(409);
            echo json_encode([
                'error'=>'student_number_already_registered',
                "message" => "Öğrenci Numarası Zaten Kayıtlı!"
            ]);
            exit;
        }
	}

    $pdo->beginTransaction();

    $update_sql = "UPDATE Member SET StudentNo=:student_no, Name=:name, Surname=:surname, Grade=:grade, Department=:department, BirthDate=:birthdate, Gender=:gender, Phone=:phone WHERE User_ID = :user_id";
    $query = $pdo->prepare($update_sql);
    $query->execute([
        "student_no" => $put_user_student_no,
        "name" => $put_user_name,
        "surname" => $put_user_surname,
        "grade" => $put_user_grade,
        "department" => $put_user_department,
        "birthdate" => $put_user_birthdate,
        "gender" => $put_user_gender,
        "phone" => $put_user_phone,
        "user_id" => $selected_user_id
    ]);

	$pdo->commit();

    http_response_code(204);
    echo json_encode(array(
        "message" => "Başarıyla Güncellendi!"
    ));
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(400);
    echo json_encode(array(
        "error" => "an_error_occured",
        "message" => "Bir hata meydana geldi!"
    ));
}

?>