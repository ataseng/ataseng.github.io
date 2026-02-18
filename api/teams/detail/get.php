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
    // $select_team_detail_sql = "SELECT td.About, td.Banner, t.Name FROM Team_Details td INNER JOIN Teams t ON t.ID = td.Team_ID WHERE t.Slug = :slug";
    $select_team_detail_sql = "SELECT 
                                    td.About, 
                                    td.Banner, 
                                    t.Name,
                                    -- Üyeleri JSON nesneleri dizisi (Array of Objects) olarak alıyoruz
                                    JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            'id', m.ID,
                                            'name', m.Name,
                                            'surname', m.Surname,
                                            'department', m.Department,
                                            'gender', m.Gender,
                                            'role', tm.Role,
                                            'image', m.Image
                                        )
                                    ) AS Members_JSON
                                FROM Teams t
                                INNER JOIN Team_Details td ON t.ID = td.Team_ID
                                LEFT JOIN Team_Member tm ON t.ID = tm.Team_ID
                                LEFT JOIN Member m ON tm.Member_ID = m.ID
                                WHERE t.Slug = :slug
                                GROUP BY td.About, td.Banner, t.Name;";
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