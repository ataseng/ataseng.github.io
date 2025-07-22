<?php

define('__ROOT__', dirname(__FILE__));

require_once(__ROOT__.'/config.php');

// $registrationActive = TRUE;

// if(!$registrationActive){
//     echo json_encode(array(
//         "error" => "Registration Not Active",
//     ));
//     exit;
// }

if($_SERVER["REQUEST_METHOD"] != "POST"){
    echo json_encode(array(
        "error" => "Post only method",
    ));
    exit;
}

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
    $server_db = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
    $conn = new PDO($server_db, $username, $password,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT RegistrationActive FROM Settings";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Registration (No, FullName, Department, Class, Interest, Email, Telephone) VALUES (:No, :FullName, :Department, :Class, :Interest, :Email, :Telephone)";
        $query = $conn->prepare($sql);
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

