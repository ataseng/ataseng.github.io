<?php

define('__ROOT__', dirname(__FILE__));

require_once(__ROOT__.'/config.php');

// PDO Create
$db_host_and_name = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
$db = new PDO($db_host_and_name, $username, $password,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);

// Get table name for section
$sql = "SELECT edc.*, edr.Name as Educator_Name, edr.Surname as Educator_Surname, edr.Image as Educator_Image, edr.Expertise as Educator_Expertise FROM Education as edc LEFT JOIN Educator as edr ON edc.Educator_ID = edr.ID";
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
        "message" => "fail",
        "server" => $server_name
    ));
}

?>