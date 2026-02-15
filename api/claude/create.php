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

        if (!empty($data->email) && !empty($data->password) && !empty($data->full_name)) {
            // Email kontrolü
            $user->email = $data->email;
            $stmt = $user->findByEmail();
            
            if ($stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Bu email adresi zaten kullanılıyor."
                ));
                exit();
            }

            $user->password = $data->password;
            $user->full_name = $data->full_name;
            $user->role = isset($data->role) ? $data->role : 'user';
            $user->is_active = isset($data->is_active) ? $data->is_active : 1;

            if ($user->create()) {
                http_response_code(201);
                echo json_encode(array(
                    "success" => true,
                    "message" => "Kullanıcı başarıyla oluşturuldu.",
                    "data" => array(
                        "id" => $user->id,
                        "email" => $user->email,
                        "full_name" => $user->full_name,
                        "role" => $user->role,
                        "is_active" => $user->is_active
                    )
                ));
            } else {
                http_response_code(500);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Kullanıcı oluşturulamadı."
                ));
            }
        } else {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Email, şifre ve ad soyad gereklidir."
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