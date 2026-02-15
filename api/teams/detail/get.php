<?php

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/db.php';

$slug = $_GET['slug'] ?? null;

if (!$slug) {
    echo json_encode([
        "error" => "Slug Required!"
    ]);
    exit;
}

try {
    $pdo = db();

    // $select_teams_sql = "SELECT ID, About, Banner FROM Team_Details WHERE Team_ID = (SELECT ID FROM Teams Where Slug = :slug LIMIT 1)";
    $select_team_detail_sql = "SELECT td.About, td.Banner, t.Name FROM Team_Details td INNER JOIN Teams t ON t.ID = td.Team_ID WHERE t.Slug = :slug";
    $stmt = $pdo->prepare($select_team_detail_sql);
    $stmt->execute([
        "slug" => $slug
    ]);
    $team_detail = $stmt->fetch(PDO::FETCH_ASSOC);
   
    http_response_code(200);

    echo json_encode([
        "message" => "success",
        "content" => $team_detail
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
    http_response_code(400);
    error_log('DB connect error: ' . $e->getMessage());
    echo $e->getMessage();
}

?>