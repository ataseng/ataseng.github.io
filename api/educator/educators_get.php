<?php

require_once(__DIR__.'/config.php');

// PDO Create
$db = new PDO(DB_SERVER, DB_USERNAME, DB_PASSWORD,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);

// Get table name for section

if($_GET["for_select"] == "true"){
    $sql = "SELECT ID, Name, Surname FROM Educator";
}
else{
    $sql = "SELECT * FROM Educator";
}

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