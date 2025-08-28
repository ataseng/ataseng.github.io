<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    $pdo = db();

    $select_hackathons_sql = "SELECT Hackathon.Title, Hackathon.`Description`, Hackathon.Location, Hackathon.Date, Hackathon.Last_Application, Hackathon.`Status`, Hackathon.Card_Image, Tags.`Name` AS `Tag` FROM Hackathon CROSS JOIN Tags JOIN Hackathon_Tag
  ON Hackathon_Tag.Hackathon_ID = Hackathon.ID AND Hackathon_Tag.Tag_ID = Tags.ID";
    $stmt = $pdo->prepare($select_hackathons_sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $hackathons = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $result = [];

    foreach ($hackathons as $hackathon) {
        $title = $hackathon["Title"];
        $tag = $hackathon["Tag"];
        unset($hackathon["Tag"]);
        if(!in_array($title, array_column($result, "Title")))
            array_push($result, $hackathon);

        $titles = array_column($result, "Title");
        $index = array_search($title, $titles);
        $result[$index]["Tags"][] = $tag;
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