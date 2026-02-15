<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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
        $user_id = $decoded->data->user_id;

        // Refresh token'ı sil
        if ($user->deleteRefreshToken($user_id)) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Çıkış başarılı."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Çıkış işlemi başarısız."
            ));
        }
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