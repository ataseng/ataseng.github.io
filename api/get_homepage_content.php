<?php

define('__ROOT__', dirname(__FILE__));

require_once(__ROOT__.'/config.php');

// PDO Create
$db_host_and_name = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
$db = new PDO($db_host_and_name, $username, $password,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);

// Get table name for section
$sql = "SELECT * FROM HomePage";
$stmt = $db->prepare($sql);
$stmt->execute(); 

if ($stmt && $stmt->rowCount() > 0) {
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
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