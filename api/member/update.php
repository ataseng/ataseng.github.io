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

$put_user_id = $putData["id"];
$put_user_student_no = $putData["student_no"];
$put_user_name = $putData["name"];
$put_user_surname = $putData["surname"];
$put_user_department = $putData["department"];
$put_user_grade = $putData["grade"];
$put_user_birthdate = $putData["birthdate"];
$put_user_gender = $putData["gender"];
$put_user_phone = $putData["phone"];

try {
    $pdo = db();

    $select_user_sql = "SELECT ID, Email FROM Users WHERE ID=:id";
    $select_user_query = $pdo->prepare($select_user_sql);
    $select_user_query->execute([
        "id" => $payload_user_id
    ]);
    $user = $select_user_query->fetch();
    $selected_user_id = $user["ID"];
    if($selected_user_id !== $payload_user_id || $selected_user_id !== $put_user_id){
        http_response_code(400);
        echo json_encode(array(
            "error" => "an_error_occured",
            "message" => "Tehlikeli İstek!"
        ));
        exit;
    }

    $pdo->beginTransaction();

    $update_sql = "UPDATE Members SET StudentNo=:student_no, Name=:name, Surname=:surname, Grade=:grade, Department=:department, BirthDate=:birthdate, Gender=:gender, Phone=:phone WHERE User_ID = :user_id";
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
    http_response_code(200);
    echo json_encode(array(
        "message" => "Mesajınız başarıyla iletildi!"
    ));
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(array(
        "error" => "an_error_occured",
        "message" => "Bir hata meydana geldi!"
    ));
}

?>