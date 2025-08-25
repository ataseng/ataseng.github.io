<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/temp_mail_check.php';

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

$json = file_get_contents('php://input');
$formData = json_decode($json, true);

$name = $formData["name"];
$surname = $formData["surname"];
$email = $formData["email"];
$message = $formData["message"];

$remote_ip = $_SERVER["REMOTE_ADDR"];
$proxy_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
$client_ip = $_SERVER['HTTP_CLIENT_IP'];


if (check_temp_mail($email)){
    http_response_code(422);
    $response_message["message"] = "fail";
	$response_message["detail"] = "Geçersiz Email";
    echo json_encode($response_message);
    exit;
}

try {
    $pdo = db();
    $sql = "INSERT INTO ContactMessages (Name, Surname, Email, Message, Remote_IP, Proxy_IP, Client_IP) VALUES (:Name, :Surname, :Email, :Message, :Remote_IP, :Proxy_IP, :Client_IP)";
    $query = $pdo->prepare($sql);
    $query->execute([
        "Name" => $name,
        "Surname" => $surname,
        "Email" => $email,
        "Message" => $message,
        "Remote_IP" => $remote_ip,
        "Proxy_IP" => $proxy_ip,
        "Client_IP" => $client_ip
    ]);
    echo json_encode(array(
        "message" => "Mesajınız başarıyla iletildi!"
    ));
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Bir hata meydana geldi!"
    ));
}

?>