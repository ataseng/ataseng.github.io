<?php

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

$json = file_get_contents('php://input');
$formData = json_decode($json, true);

$studentNo = $formData["studentNo"];
$studentFullName = $formData["studentFullName"];
$studentDepartment = $formData["studentDepartment"];
$studentClass = $formData["studentClass"];
$studentInterest = $formData["studentInterest"];
$studentEmail = $formData["studentEmail"];
$studentTel = $formData["studentTel"];

try {
    $pdo = db();

    $sql = "SELECT RegistrationActive FROM Settings";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Registration (No, FullName, Department, Class, Interest, Email, Telephone) VALUES (:No, :FullName, :Department, :Class, :Interest, :Email, :Telephone)";
        $query = $pdo->prepare($sql);
        $query->execute([
            "No" => $studentNo,
            "FullName" => $studentFullName,
            "Department" => $studentDepartment,
            "Class" => $studentClass,
            "Interest" => $studentInterest,
            "Email" => $studentEmail,
            "Telephone" => $studentTel,
        ]);
        echo json_encode(array(
            "message" => "New record created successfully",
        ));
    } else {
        echo json_encode(array(
            "error" => "Registration Not Active",
            "message" => $result
        ));
        exit;
    }
    
    
} catch (PDOException $e) {
    echo json_encode(array(
        "sql" => $sql,
        "errors" => $e->getMessage()
    ));
}

?>