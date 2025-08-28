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

$name = $_POST["name"];
$surname = $_POST["surname"];
$expertise = $_POST["expertise"];
$gender = $_POST["gender"];

$target_dir = "assets/images/educators/";

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$image = basename($_FILES["image"]["name"]);
$target_file = $target_dir . time() . "_" . $image;

$image_path = "";
if(strlen($image) > 0){
    $image_path = BASE_URL . $target_file;
}

try {
    $pdo = db();

    $sql = "SELECT PostActive FROM Settings";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    if ($stmt && $stmt->rowCount() > 0) {
        $result = $stmt->fetchColumn();
    }

    if($result && $result == '1' ){
        $sql = "INSERT INTO Educator (Name, Surname, Image, Expertise, Gender) VALUES (:Name, :Surname, :Image, :Expertise, :Gender)";
        $query = $pdo->prepare($sql);
        $query->execute([
            "Name" => $name,
            "Surname" => $surname,
            "Image" => $image_path,
            "Expertise" => $expertise,
            "Gender" => $gender,
        ]);
        $response_message["message"] = "success";
        $response_message["detail"] = "New educator created successfully!";
        if(!strlen($image) > 0){
            echo json_encode($response_message);
        }
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

if(strlen($image) > 0){
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
}



?>