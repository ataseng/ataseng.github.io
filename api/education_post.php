<?php

define('__ROOT__', dirname(__FILE__));

require_once(__ROOT__.'/config.php');

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

$title = $_POST["title"];
$content = $_POST["content"];
$date = $_POST["date"] . " " . $_POST["time"];
$location = $_POST["location"];
$last_application_date = $_POST["last_application_date"];
$last_application_time = $_POST["last_application_time"];
$last_application = $last_application_date . " " . $last_application_time;
$status = $_POST["status"];
$educator_id = $_POST["educator_id"];

$target_dir = "images/educations/";

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$image = basename($_FILES["image"]["name"]);
$target_file = $target_dir . time() . "_" . $image;

try {
    $server_db = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
    $conn = new PDO($server_db, $username, $password,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT PostActive FROM Settings";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Education (Title, Content, Date, Location, Last_Application, Image, Status, Educator_ID) VALUES (:Title, :Content, :Date, :Location, :Last_Application, :Image, :Status, :Educator_ID)";
        $query = $conn->prepare($sql);
        $query->execute([
            "Title" => $title,
            "Content" => $content,
            "Date" => $date,
            "Location" => $location,
            "Last_Application" => $last_application,
            "Image" => $target_file,
            "Status" => $status,
            "Educator_ID" => $educator_id,
        ]);
        $response_message["message"] = "success";
        $response_message["detail"] = "New education created successfully!";
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

// $image_extension = $image['extension'];

$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if($_SERVER["REQUEST_METHOD"] == "POST") {
  $check = getimagesize($_FILES["image"]["tmp_name"]);
  if($check !== false) {
    // echo "File is an image - " . $check["mime"] . ".";
  } else {
    $response_message["message"] = "fail";
    $response_message["detail"] = "File is not an image!";
    echo json_encode($response_message);
    exit;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
    $response_message["message"] = "fail";
    $response_message["detail"] = "Sorry, file already exists!";
    echo json_encode($response_message);
    exit;
}

// Check file size
if ($_FILES["image"]["size"] > 512000) {
    $response_message["message"] = "fail";
    $response_message["detail"] = "Sorry, your file is too large! (Maximum Size: 512 KB)";
    echo json_encode($response_message);
    exit;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    $response_message["message"] = "fail";
    $response_message["detail"] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed!";
    echo json_encode($response_message);
    exit;
}

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    // $response_message["detail"] = "The file ". htmlspecialchars( basename( $_FILES["image"]["name"])). " has been uploaded!";
    echo json_encode($response_message);
} else {
    $response_message["message"] = "fail";
    $response_message["detail"] = "Sorry, there was an error uploading your file!";
    echo json_encode($response_message);
}

?>