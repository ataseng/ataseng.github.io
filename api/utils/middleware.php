<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/jwt.php';

function require_auth(): array {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/Bearer\s+(.+)/', $auth, $m)) {
        http_response_code(401);
        echo json_encode(['error'=>'missing_token']);
        exit;
    }
    try {
        $payload = jwt_decode_verify($m[1], JWT_SECRET);
        // (opsiyonel) iss/aud kontrolü jwt_decode_verify içinde yapılıyor olmalı
        return $payload; // ['sub'=>..., 'email'=>..., 'role'=>..., ...]
    } catch (Throwable $e) {
        http_response_code(401);
        echo json_encode(['error'=>'invalid_token']);
        exit;
    }
}

function require_role(array $payload, string|array $roles): void {
    $need = is_array($roles) ? $roles : [$roles];
    if (!in_array($payload['role'] ?? '', $need, true)) {
        http_response_code(403);
        echo json_encode(['error'=>'forbidden']);
        exit;
    }
}
