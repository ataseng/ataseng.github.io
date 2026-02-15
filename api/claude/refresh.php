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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->refresh_token)) {
    $decoded = $jwt_handler->validateRefreshToken($data->refresh_token);

    if ($decoded) {
        $user_id = $decoded->data->user_id;

        // Refresh token'ı veritabanında doğrula
        if ($user->validateRefreshToken($user_id, $data->refresh_token)) {
            // Kullanıcı bilgilerini al
            $user->id = $user_id;
            $stmt = $user->findById();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row && $row['is_active'] == 1) {
                // Yeni access token oluştur
                $new_access_token = $jwt_handler->generateAccessToken(
                    $row['id'],
                    $row['email'],
                    $row['role']
                );

                http_response_code(200);
                echo json_encode(array(
                    "success" => true,
                    "message" => "Token yenilendi.",
                    "data" => array(
                        "access_token" => $new_access_token
                    )
                ));
            } else {
                http_response_code(403);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Hesap aktif değil."
                ));
            }
        } else {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Geçersiz refresh token."
            ));
        }
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Refresh token süresi dolmuş veya geçersiz."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Refresh token gereklidir."
    ));
}
?>