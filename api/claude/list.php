<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../models/User.php';
require_once '../utils/JWTHandler.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$jwt_handler = new JWTHandler();

// Token'ı header'dan al
$token = $jwt_handler->getBearerToken();

if ($token) {
    $decoded = $jwt_handler->validateAccessToken($token);

    if ($decoded) {
        // Admin kontrolü
        if ($decoded->data->role !== 'admin') {
            http_response_code(403);
            echo json_encode(array(
                "success" => false,
                "message" => "Bu işlem için yetkiniz yok."
            ));
            exit();
        }

        $stmt = $user->getAll();
        $users = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $user_item = array(
                "id" => $row['id'],
                "email" => $row['email'],
                "full_name" => $row['full_name'],
                "role" => $row['role'],
                "is_active" => $row['is_active'],
                "created_at" => $row['created_at']
            );

            array_push($users, $user_item);
        }

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => $users
        ));
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Geçersiz token."
        ));
    }
} else {
    http_response_code(401);
    echo json_encode(array(
        "success" => false,
        "message" => "Token bulunamadı."
    ));
}
?>