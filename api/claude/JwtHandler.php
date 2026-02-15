<?php

class JWTHandler {
    private $secret_key = "YOUR_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION"; // Üretim ortamında değiştirin!
    private $refresh_secret_key = "YOUR_REFRESH_SECRET_KEY_CHANGE_THIS"; // Üretim ortamında değiştirin!
    private $issuer = "https://yourwebsite.com";
    private $audience = "https://yourwebsite.com";
    private $access_token_expiry = 900; // 15 dakika
    private $refresh_token_expiry = 604800; // 7 gün

    /**
     * Base64 URL encoding
     */
    private function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64 URL decoding
     */
    private function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }

    /**
     * JWT token oluştur
     */
    private function createToken($payload, $secret) {
        // Header
        $header = json_encode([
            'typ' => 'JWT',
            'alg' => 'HS256'
        ]);

        // Encode Header ve Payload
        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode(json_encode($payload));

        // Signature oluştur
        $signature = hash_hmac(
            'sha256',
            $base64UrlHeader . "." . $base64UrlPayload,
            $secret,
            true
        );
        $base64UrlSignature = $this->base64UrlEncode($signature);

        // JWT token'ı birleştir
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * JWT token'ı doğrula ve decode et
     */
    private function verifyToken($token, $secret) {
        // Token'ı parçalara ayır
        $tokenParts = explode('.', $token);
        
        if (count($tokenParts) !== 3) {
            return false;
        }

        list($header, $payload, $signature) = $tokenParts;

        // Signature'ı yeniden oluştur ve doğrula
        $validSignature = $this->base64UrlEncode(
            hash_hmac(
                'sha256',
                $header . "." . $payload,
                $secret,
                true
            )
        );

        // Signature doğru mu?
        if ($signature !== $validSignature) {
            return false;
        }

        // Payload'ı decode et
        $payloadData = json_decode($this->base64UrlDecode($payload));

        // Süre kontrolü
        if (isset($payloadData->exp) && $payloadData->exp < time()) {
            return false; // Token süresi dolmuş
        }

        return $payloadData;
    }

    /**
     * Access token oluştur
     */
    public function generateAccessToken($user_id, $email, $role) {
        $issued_at = time();
        $expiration = $issued_at + $this->access_token_expiry;

        $payload = [
            "iss" => $this->issuer,
            "aud" => $this->audience,
            "iat" => $issued_at,
            "exp" => $expiration,
            "data" => [
                "user_id" => $user_id,
                "email" => $email,
                "role" => $role
            ]
        ];

        return $this->createToken($payload, $this->secret_key);
    }

    /**
     * Refresh token oluştur
     */
    public function generateRefreshToken($user_id) {
        $issued_at = time();
        $expiration = $issued_at + $this->refresh_token_expiry;

        $payload = [
            "iss" => $this->issuer,
            "aud" => $this->audience,
            "iat" => $issued_at,
            "exp" => $expiration,
            "data" => [
                "user_id" => $user_id
            ]
        ];

        return $this->createToken($payload, $this->refresh_secret_key);
    }

    /**
     * Access token'ı doğrula
     */
    public function validateAccessToken($token) {
        return $this->verifyToken($token, $this->secret_key);
    }

    /**
     * Refresh token'ı doğrula
     */
    public function validateRefreshToken($token) {
        return $this->verifyToken($token, $this->refresh_secret_key);
    }

    public function getBearerToken() {
        $headers = $this->getAuthorizationHeader();
        
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    private function getAuthorizationHeader() {
        $headers = null;

        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(
                array_map('ucwords', array_keys($requestHeaders)), 
                array_values($requestHeaders)
            );

            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }

        return $headers;
    }
}
?>