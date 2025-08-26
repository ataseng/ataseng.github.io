<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

$json = file_get_contents('php://input');
$formData = json_decode($json, true);

$studentNo = $formData["studentNo"];
$name = $formData["name"];
$surname = $formData["surname"];
$department = $formData["department"];
$grade = $formData["grade"];
$interest = $formData["interest"];
$email = $formData["email"];
$phone = $formData["phone"];

try {
    $pdo = db();

    $sql = "SELECT RegistrationActive FROM Settings LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $postActive = $stmt->fetchColumn();

    if($postActive && $postActive == 1 ){

        $check_duplication_sql = "INSERT INTO Registration (StudentNo, Name, Surname, Department, Grade, Interest, Email, Phone) SELECT :student_no, :name, :surname, :department, :grade, :interest, :email, :phone WHERE NOT EXISTS(SELECT 1 FROM Members m WHERE m.StudentNo = :student_no2) OR NOT EXISTS(SELECT 1 FROM Members m WHERE m.Phone = :phone2) OR NOT EXISTS(SELECT 1 FROM Users u WHERE u.Email = :email2)";
        $query = $pdo->prepare($check_duplication_sql);
        $stmt = $query->execute([
            "student_no" => $studentNo,
            "name" => $name,
            "surname" => $surname,
            "department" => $department,
            "grade" => $grade,
            "interest" => $interest,
            "email" => $email,
            "phone" => $phone,
            "student_no2" => $studentNo,
            "phone2" => $phone,
            "email2" => $email
        ]);

        $lastInsertId = (int)$pdo->lastInsertId();

        if ($lastInsertId != 0){
            http_response_code(200);
            echo json_encode(array(
                "message" => "Başvurunuz Alınmıştır",
            ));
        }
        else{
            http_response_code(400);
            echo json_encode(array(
                "error" => "duplicate_fields",
                "message" => "Öğrenci No, E-posta veya Telefon Zaten Kayıtlı!"
            ));
            exit;
        }
        
    } else {
        http_response_code(400);
        echo json_encode(array(
            "error" => "registration_not_active",
            "message" => "Registration Not Active"
        ));
        exit;
    }
    
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode([
        'error'=> "an_error_occured",
        'message'=> $e->getMessage(),
    ]);
}

?>