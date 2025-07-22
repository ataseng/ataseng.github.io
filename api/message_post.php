<?php

define('__ROOT__', dirname(__FILE__));

require_once(__ROOT__.'/config.php');

if($_SERVER["REQUEST_METHOD"] != "POST"){
    echo json_encode(array(
        "error" => "Post only method",
    ));
    exit;
}

$json = file_get_contents('php://input');
$formData = json_decode($json, true);

$name = $formData["name"];
$surname = $formData["surname"];
$email = $formData["email"];
$message = $formData["message"];

try {
    $server_db = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
    $conn = new PDO($server_db, $username, $password,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO Messages (Name, Surname, Email, Message) VALUES (:Name, :Surname, :Email, :Message)";
    $query = $conn->prepare($sql);
    $query->execute([
        "Name" => $name,
        "Surname" => $surname,
        "Email" => $email,
        "Message" => $message
    ]);
    echo json_encode(array(
        "message" => "Mesajınız başarıyla iletildi!"
    ));
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(array(
        "sql" => $sql,
        "errors" => $e->getMessage(),
        "message" => "Bir hata meydana geldi!"
    ));
}

