<?php

require_once(__DIR__.'/config.php');

// PDO Create
$db = new PDO(DB_SERVER, DB_USERNAME, DB_PASSWORD,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);

// Get table name for section
$sql = "SELECT edc.*, edr.Name as Educator_Name, edr.Surname as Educator_Surname, edr.Image as Educator_Image, edr.Expertise as Educator_Expertise, edr.Gender as Educator_Gender FROM Education as edc LEFT JOIN Educator as edr ON edc.Educator_ID = edr.ID WHERE edc.Status = 'active'";
$stmt = $db->prepare($sql);
$stmt->execute();

if ($stmt && $stmt->rowCount() > 0) {
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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