<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    $pdo = db();

    // $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // $data = [
    //     "linkedin" => "https://www.linkedin.com/in/osmandurdag",
    //     "github" => "https://github.com/zumrudu-anka",
    //     "website" => "https://osmandurdag.com"
    // ];

    // $pdo->prepare("UPDATE Member SET Social = ? WHERE ID=?")
    //     ->execute(
    //         [
    //             json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    //             2
    //         ]);


    // $data = [
    //     ["type" => "linkedin", "url" => "https://www.linkedin.com/in/osmandurdag"],
    //     ["type" => "github",   "url" => "https://github.com/zumrudu-anka"],
    //     ["type" => "website",  "url" => "https://osmandurdag.com"],
    // ];

    // $stmt = $pdo->prepare("UPDATE `Member` SET `Social` = ? WHERE `ID` = ?");
    // $stmt->execute([
    //     json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    //     2
    // ]);

    $select_team_sql = "SELECT ID, Name, Surname, Department, Grade, Position, Gender, Image, Social FROM Member";
    $stmt = $pdo->prepare($select_team_sql);
    $stmt->execute();
    $team = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($team as &$member) {
        if (!empty($member['Social'])) {
            $member['Social'] = json_decode($member['Social'], true);
        }
    }
    
    http_response_code(200);

    echo json_encode([
        "message" => "success",
        "content" => $team
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
    http_response_code(400);
    error_log('DB connect error: ' . $e->getMessage());
    echo $e->getMessage();
}

?>