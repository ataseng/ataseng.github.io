<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

// PDO Create
$pdo = db();

// Get table name for section

if($_GET["for_select"] == "true"){
    $sql = "SELECT ID, Name, Surname FROM Educator";
}
else{
    $sql = "SELECT * FROM Educator";
}

$stmt = $pdo->prepare($sql);
$stmt->execute();

if ($stmt && $stmt->rowCount() > 0) {
    $result = $stmt->fetchAll();
}

if($result && $result != NULL){
    echo json_encode(array(
        "message" => "success",
        "content" => $result
    ));
    
} else {
    echo json_encode(array(
        "message" => "fail"
    ));
}

?>