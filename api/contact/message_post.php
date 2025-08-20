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

$json = file_get_contents('php://input');
$formData = json_decode($json, true);

$name = $formData["name"];
$surname = $formData["surname"];
$email = $formData["email"];
$message = $formData["message"];

$remote_ip = $_SERVER["REMOTE_ADDR"];
$proxy_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
$client_ip = $_SERVER['HTTP_CLIENT_IP'];

require_once(__ROOT__.'/utils/temp_mail_check.php');

try {
    $conn = new PDO(DB_SERVER, DB_USERNAME, DB_PASSWORD,
    [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO Messages (Name, Surname, Email, Message, Remote_IP, Proxy_IP, Client_IP) VALUES (:Name, :Surname, :Email, :Message, :Remote_IP, :Proxy_IP, :Client_IP)";
    $query = $conn->prepare($sql);
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
        "sql" => $sql,
        "errors" => $e->getMessage(),
        "message" => "Bir hata meydana geldi!"
    ));
}

?>