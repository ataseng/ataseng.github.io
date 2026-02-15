<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    $pdo = db();

    $select_teams_sql = "SELECT ID, Name, Slug, Description, Icon FROM Teams";
    $stmt = $pdo->prepare($select_teams_sql);
    $stmt->execute();
    $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
    http_response_code(200);

    echo json_encode([
        "message" => "success",
        "content" => $teams
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
    http_response_code(400);
    error_log('DB connect error: ' . $e->getMessage());
    echo $e->getMessage();
}

?>