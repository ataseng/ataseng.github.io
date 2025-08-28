<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

try {
    $pdo = db();

    // $select_competitions_sql = "SELECT ID, Title, Description, Location, Date, Last_Application, Status, Image FROM Competitions";
    // $stmt = $pdo->prepare($select_competitions_sql);
    // $stmt->execute();

    // if ($stmt && $stmt->rowCount() > 0) {
    //     $competitions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // }

    // $select_tags_sql = "SELECT * FROM Tags";
    // $stmt = $pdo->prepare($select_tags_sql);
    // $stmt->execute();

    // if ($stmt && $stmt->rowCount() > 0) {
    //     $tags = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // }

    // $select_competition_tag_sql = "SELECT * FROM Competition_Tag";
    // $stmt = $pdo->prepare($select_competition_tag_sql);
    // $stmt->execute();

    // if ($stmt && $stmt->rowCount() > 0) {
    //     $competitions_tags = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // }


    $select_competitions_sql = "SELECT Competition.Title, Competition.`Description`, Competition.Location, Competition.Date, Competition.Last_Application, Competition.`Status`, Competition.Card_Image, Tags.`Name` AS `Tag` FROM Competition CROSS JOIN Tags JOIN Competition_Tag
  ON Competition_Tag.Competition_ID = Competition.ID AND Competition_Tag.Tag_ID = Tags.ID";
    $stmt = $pdo->prepare($select_competitions_sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $competitions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $result = [];

    foreach ($competitions as $competition) {
        // if(!array_any($result, fn($obj) => property_exists($obj, "Title") && $obj->"Title" === $competition["Title"])){
        //     array_push($result, $competition);
        // }
        $title = $competition["Title"];
        $tag = $competition["Tag"];
        unset($competition["Tag"]);
        if(!in_array($title, array_column($result, "Title")))
            array_push($result, $competition);

        $titles = array_column($result, "Title");
        $index = array_search($title, $titles);
        $result[$index]["Tags"][] = $tag;
            // array_push($result[$index]["Tags"], $tag);
        // $competition["Tags"] = array("a", "b", "c");
        // $competitions[$key] = $competition;
    }
    
    // if($result && $result != NULL){
    //     echo json_encode(array(
    //         "message" => "success",
    //         "content" => $result
    //     ));
        
    // } else {
    //     http_response_code(400);
    //     echo json_encode(array(
    //         "error" => "an_error_occured",
    //         "message" => "Bir Hata Meydana Geldi!"
    //     ));
    // }

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