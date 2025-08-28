<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    $pdo = db();

    // Get table name for section
    $sql = "SELECT cd.*, sp.Name as Curator_Name, sp.Surname as Curator_Surname, sp.Image as Curator_Image, sp.Expertise as Curator_Expertise, sp.Gender as Curator_Gender FROM CareerDays as cd LEFT JOIN Speaker as sp ON cd.Speaker_ID = sp.ID";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchAll();
    }
    
    http_response_code(200);
    echo json_encode(array(
        "message" => "success",
        "content" => $result
    ));
} catch (PDOException $e) {
    http_response_code(400);
    error_log('DB connect error: ' . $e->getMessage());
    echo $e->getMessage();
}



?>