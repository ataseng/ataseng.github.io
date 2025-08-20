<?php

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

require_once(__DIR__.'/config.php');

$title = $_POST["title"];
$content = $_POST["content"];
$date = $_POST["date"] . " " . $_POST["time"];
$location = $_POST["location"];
$last_application_date = $_POST["last_application_date"];
$last_application_time = $_POST["last_application_time"];
$last_application = $last_application_date . " " . $last_application_time;
$status = $_POST["status"];
$educator_id = $_POST["educator_id"];

try {
    $conn = new PDO(DB_SERVER, DB_USERNAME, DB_PASSWORD,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT PostActive FROM Settings";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Education (Title, Content, Date, Location, Last_Application, Status, Educator_ID) VALUES (:Title, :Content, :Date, :Location, :Last_Application, :Status, :Educator_ID)";
        $query = $conn->prepare($sql);
        $query->execute([
            "Title" => $title,
            "Content" => $content,
            "Date" => $date,
            "Location" => $location,
            "Last_Application" => $last_application,
            "Status" => $status,
            "Educator_ID" => $educator_id,
        ]);
        $response_message["message"] = "success";
        $response_message["detail"] = "New education created successfully!";
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