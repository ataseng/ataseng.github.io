<?php

declare(strict_types=1);

// require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/jwt.php';

function require_auth(): array {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    // if (!preg_match('/Bearer\s+(.+)/', $auth, $m)) {
    if (!preg_match('/^\s*Bearer\s+([A-Za-z0-9\-\._~\+\/]+=*)\s*$/', $auth, $m)) {
        http_response_code(401);
        echo json_encode(['error'=>'missing_token']);
        exit;
    }
    try {
        $payload = jwt_decode_verify($m[1], JWT_SECRET);
        // (opsiyonel) iss/aud kontrolü jwt_decode_verify içinde yapılıyor olmalı
        return $payload; // ['sub'=>..., 'email'=>..., 'role'=>..., ...]
    } catch (Throwable $e) {
        $reason = $e->getMessage(); // 'exp', 'sig_mismatch', 'bad_jwt', 'nbf', ...
        http_response_code(401);
        echo json_encode(['error'=>'invalid_token']);

    //     header('WWW-Authenticate: Bearer error="invalid_token", error_description="'.$reason.'"');

    // // Prod'da ayrıntıyı sadeleştir:
    // $code = match ($reason) {
    //     'exp'          => 'token_expired',
    //     'nbf','iat'    => 'token_not_yet_valid',
    //     'sig_mismatch' => 'signature_invalid',
    //     'bad_jwt','bad_header','bad_payload' => 'malformed_jwt',
    //     default        => 'invalid_token',
    // };

    // echo json_encode(['error' => $code]);
        exit;
    }
}

// function require_role(array $payload, string|array $roles): void {
//     $need = is_array($roles) ? $roles : [$roles];
//     if (!in_array($payload['role'] ?? '', $need, true)) {
//         http_response_code(403);
//         echo json_encode(['error'=>'forbidden']);
//         exit;
//     }
// }
