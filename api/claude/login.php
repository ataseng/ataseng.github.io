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

if (!empty($data->email) && !empty($data->password)) {
    $user->email = $data->email;
    $stmt = $user->findByEmail();
    $num = $stmt->rowCount();

    if ($num > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Kullanıcı aktif mi kontrol et
        if ($row['is_active'] != 1) {
            http_response_code(403);
            echo json_encode(array(
                "success" => false,
                "message" => "Hesabınız devre dışı bırakılmış."
            ));
            exit();
        }

        // Şifreyi doğrula
        if (password_verify($data->password, $row['password'])) {
            // Access token oluştur
            $access_token = $jwt_handler->generateAccessToken(
                $row['id'],
                $row['email'],
                $row['role']
            );

            // Refresh token oluştur
            $refresh_token = $jwt_handler->generateRefreshToken($row['id']);

            // Refresh token'ı veritabanına kaydet
            $user->saveRefreshToken($row['id'], $refresh_token);

            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Giriş başarılı.",
                "data" => array(
                    "access_token" => $access_token,
                    "refresh_token" => $refresh_token,
                    "user" => array(
                        "id" => $row['id'],
                        "email" => $row['email'],
                        "full_name" => $row['full_name'],
                        "role" => $row['role']
                    )
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Email veya şifre hatalı."
            ));
        }
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Email veya şifre hatalı."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Email ve şifre gereklidir."
    ));
}
?>