<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

$pdo = db();

// Get table name for section
$sql = "SELECT edc.*, edr.Name as Curator_Name, edr.Surname as Curator_Surname, edr.Image as Curator_Image, edr.Expertise as Curator_Expertise, edr.Gender as Curator_Gender FROM Education as edc LEFT JOIN Educator as edr ON edc.Educator_ID = edr.ID";
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