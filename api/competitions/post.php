<?php

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';

$title = $_POST["title"];
$description = $_POST["description"];
$location = $_POST["location"];
$date = $_POST["date"] . " " . $_POST["time"];
$last_application_date = $_POST["last_application_date"];
$last_application_time = $_POST["last_application_time"];
$last_application = $last_application_date . " " . $last_application_time;
$status = $_POST["status"];

$tags = $_POST["tags"];
$tags = explode(',', $tags);

try {
    $pdo = db();

    $sql = "SELECT PostActive FROM Settings";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Competition (Title, Description, Location, Date, Last_Application, Status) VALUES (:Title, :Description, :Location, :Date, :Last_Application, :Status)";
        $query = $pdo->prepare($sql);
        $query->execute([
            "Title" => $title,
            "Description" => $description,
            "Location" => $location,
            "Date" => $date,
            "Last_Application" => $last_application,
            "Status" => $status,
        ]);

        $competition_id = (int)$pdo->lastInsertId();

        $sql = "INSERT INTO Competition_Tag (Competition_ID, Tag_ID) VALUES ";
        // $params = [
        //     "Competition_ID" => (int) $competition_id,
        // ];

        $params = [];

        $index = 0;
        $tag_count = count($tags);

        foreach ($tags as $tag) {
            if($index === $tag_count - 1){
                $sql = $sql . "(:Competition_ID_" . $tag . ", :Tag_ID_" . $tag . ")";
            }
            else{
                $sql = $sql . "(:Competition_ID_" . $tag . ", :Tag_ID_" . $tag . "), ";
            }
            $params += [
                "Competition_ID_" . $tag => (int) $competition_id,
                "Tag_ID_" . $tag => (int) $tag
            ];
            // $sql = "INSERT INTO Competition_Tag (Competition_ID, Tag_ID) VALUES (:Competition_ID, :Tag_ID)";
            // $query = $pdo->prepare($sql);
            // $query->execute([
            //     "Competition_ID" => (int) $competition_id,
            //     "Tag_ID" => (int) $tag
            // ]);
            $index++;
        }

        $query = $pdo->prepare($sql);
        $query->execute($params);
        // $query->execute([
        //     "Competition_ID" => (int) $competition_id,
        //     "Tag_ID" => (int) $tag
        // ]);

        $response_message["message"] = "success";
        $response_message["detail"] = "New competition created successfully!";
        
        echo json_encode($response_message);
    } else {
        $response_message["message"] = "fail";
        $response_message["detail"] = "Post Not Active!";
        echo json_encode($response_message);
        exit;
    }
    
} catch (PDOException $e) {
    $response_message["message"] = "fail";
    $response_message["detail"] = "PDO Exception!";
    $response_message["sql"] = $sql;
    $response_message["errors"] = $e->getMessage();
    echo json_encode($response_message);
    exit;
}

?>