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

// $image_extension = $image['extension'];

$target_dir = "images/educations/";

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$title = $_POST["title"];
$content = $_POST["content"];
$target_file = $target_dir . basename($_FILES["image"]["name"]);
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
    $response_message["detail"] = "The file ". htmlspecialchars( basename( $_FILES["image"]["name"])). " has been uploaded!";
    echo json_encode($response_message);
} else {
    $response_message["message"] = "fail";
    $response_message["detail"] = "Sorry, there was an error uploading your file!";
    echo json_encode($response_message);
}

?>