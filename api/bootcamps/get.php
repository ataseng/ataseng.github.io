<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    $pdo = db();

    $select_bootcamps_sql = "SELECT Bootcamp.Title, Bootcamp.`Description`, Bootcamp.Location, Bootcamp.Date, Bootcamp.Last_Application, Bootcamp.`Status`, Bootcamp.Card_Image, Tags.`Name` AS `Tag` FROM Bootcamp CROSS JOIN Tags JOIN Bootcamp_Tag
  ON Bootcamp_Tag.Bootcamp_ID = Bootcamp.ID AND Bootcamp_Tag.Tag_ID = Tags.ID";
    $stmt = $pdo->prepare($select_bootcamps_sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $bootcamps = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $result = [];

    foreach ($bootcamps as $bootcamp) {
        $title = $bootcamp["Title"];
        $tag = $bootcamp["Tag"];
        unset($bootcamp["Tag"]);
        if(!in_array($title, array_column($result, "Title")))
            array_push($result, $bootcamp);

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