<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/middleware.php';

$response_message = array("message" => "success");

if($_SERVER["REQUEST_METHOD"] != "GET"){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "GET only method";
    echo json_encode($response_message);
    exit;
}

// $parts = parse_url($url);
// $query_str = parse_url($url, PHP_URL_QUERY);
// parse_str($parts['query'], $query);
// print_r($query);

$payload = require_auth();

print_r($payload); exit;

$user_id = $_GET["id"];

try {
    $pdo = db();

    $stmt = $pdo->prepare('SELECT usr.ID, usr.Email, mbr.StudentNo, mbr.Name, mbr.Surname, mbr.Grade, mbr.Position, mbr.Task, mbr.Department, mbr.BirthDate, mbr.Gender, mbr.Phone, mbr.Image FROM Users AS usr JOIN Members AS mbr ON usr.ID = mbr.User_ID WHERE usr.ID = :id LIMIT 1');
    $stmt->execute([
        "id" => $user_id
    ]);
    $user = $stmt->fetch();

    echo json_encode([
        'ok'=>true,
        'content'=> $user
    ]);
    
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(array(
        "error" => "an_error_occured",
        "message" => "Bir hata meydana geldi!"
    ));
}





?>