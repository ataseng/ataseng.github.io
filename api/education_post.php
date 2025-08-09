<?php

define('__ROOT__', dirname(__FILE__));

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: *');

header("Content-Type: multipart/form-data; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
    echo json_encode(array(
        "error" => "Post only method",
    ));
    exit;
}

// $json = file_get_contents('php://input');
// $formData = json_decode($json, true);

// var_dump($_POST);

$title = $_POST["title"];
$description = $_POST["title"];

$image = pathinfo($_FILES["image"]["name"]);
$image_extension = $image['extension'];

$new_image_name = "newname." . $image_extension;

$target = __ROOT__ . "/images/" . $new_image_name;

move_uploaded_file($_FILES["image"]["name"], $target);

echo json_encode(array(
    "message" => "success",
    // "a" => $info,
    // "b" => $ext,
    "title" => $title,
    "description" => $description,
    "new_image_name" => $new_image_name,
    "target" => $target,
));

?>