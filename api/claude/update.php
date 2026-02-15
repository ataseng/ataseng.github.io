<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
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

        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->id) && !empty($data->full_name)) {
            $user->id = $data->id;
            $user->full_name = $data->full_name;
            $user->role = $data->role;
            $user->is_active = $data->is_active;
            $user->password = isset($data->password) ? $data->password : '';

            if ($user->update()) {
                http_response_code(200);
                echo json_encode(array(
                    "success" => true,
                    "message" => "Kullanıcı başarıyla güncellendi."
                ));
            } else {
                http_response_code(500);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Kullanıcı güncellenemedi."
                ));
            }
        } else {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "ID ve ad soyad gereklidir."
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