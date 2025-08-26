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
$telephone = $formData["telephone"];

try {
    $pdo = db();

    $sql = "SELECT RegistrationActive FROM Settings";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Registration (StudentNo, Name, Surname, Department, Grade, Interest, Email, Telephone) VALUES (:student_no, :name, :surname, :department, :grade, :interest, :email, :telephone)";
        $query = $pdo->prepare($sql);
        $query->execute([
            "student_no" => $studentNo,
            "name" => $name,
            "surname" => $surname,
            "department" => $department,
            "grade" => $grade,
            "interest" => $interest,
            "email" => $email,
            "telephone" => $telephone,
        ]);
        http_response_code(200);
        echo json_encode(array(
            "message" => "Başvurunuz Alınmıştır",
        ));
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