<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils/db.php';

// PDO Create
$pdo = db();

// Get table name for section
$sql = "SELECT * FROM HomePage";
$stmt = $pdo->prepare($sql);
$stmt->execute(); 

if ($stmt && $stmt->rowCount() > 0) {
    $result = $stmt->fetch();
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