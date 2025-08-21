<?php

require_once __DIR__ . '/../config.php';

if($_SERVER["REQUEST_METHOD"] != "POST"){
    echo json_encode(array(
        "error" => "Post only method",
    ));
    exit;
}

$json = file_get_contents('php://input');
$formData = json_decode($json, true);

if (isset($formData["access_token"])){
    $access_token = $formData["access_token"];

    $user_data = json_decode(file_get_contents("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" . $access_token));

    if($user_data){
        print_r($user_data);
    }
    else{
        http_response_code(401);
        die("Unauthorized");
    }
}



// $studentNo = $formData["studentNo"];
// $password = $formData["password"];

// try {
//     $server_db = 'mysql:host=' . $server_name . ';dbname=' . $db_name;
//     $conn = new PDO($server_db, $username, $password,
//     [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     $sql = "INSERT INTO Messages (Name, Surname, Email, Message) VALUES (:Name, :Surname, :Email, :Message)";
//     $query = $conn->prepare($sql);
//     $query->execute([
//         "Name" => $name,
//         "Surname" => $surname,
//         "Email" => $email,
//         "Message" => $message
//     ]);
//     echo json_encode(array(
//         "message" => "Mesajınız başarıyla iletildi!"
//     ));
// } catch (PDOException $e) {
//     http_response_code(400);
//     echo json_encode(array(
//         "sql" => $sql,
//         "errors" => $e->getMessage(),
//         "message" => "Bir hata meydana geldi!"
//     ));
// }

?>