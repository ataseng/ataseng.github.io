<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/middleware.php';
require_once __DIR__ . '/../utils/jwt.php';

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Post only method";
    echo json_encode($response_message);
    exit;
}

$payload = require_auth();

$json = file_get_contents('php://input');
$postData = json_decode($json, true);

$email = $payload["email"];
$rating = $postData["rating"];
$content = $postData["content"];

try {
    $pdo = db();

    $select_user_sql = "SELECT ID FROM Users WHERE Email=:email";
    $select_user_query = $pdo->prepare($select_user_sql);
    $select_user_query->execute([
        "email" => $email
    ]);
    $user = $select_user_query->fetch();
    $user_id = $user["ID"];

    $sql = "INSERT INTO Feedbacks (Rating, Content, User_ID) VALUES (:rating, :content, :user_id)";
    $query = $pdo->prepare($sql);
    $query->execute([
        "rating" => $rating,
        "content" => $content,
        "user_id" => $user_id
    ]);
    http_response_code(200);
    echo json_encode(array(
        "message" => "Mesajınız başarıyla iletildi!"
    ));
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(array(
        "error" => "an_error_occured",
        "message" => "Bir hata meydana geldi!"
    ));
}

?>