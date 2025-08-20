<?php
declare(strict_types=1);

function b64u(string $s): string {
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

function b64ud(string $s): string {
    return base64_decode(strtr($s, '-_', '+/'));
}

function jwt_encode(array $payload, string $secret): string {
    $header = [
        'alg'=>'HS256',
        'typ'=>'JWT'
    ];
    $h = b64u(json_encode($header, JSON_UNESCAPED_SLASHES));
    $p = b64u(json_encode($payload, JSON_UNESCAPED_SLASHES));
    $sig = b64u(hash_hmac('sha256', "$h.$p", $secret, true));
    return "$h.$p.$sig";
}

function jwt_decode_verify(string $jwt, string $secret): array {
    $parts = explode('.', $jwt);
    if (count($parts) !== 3) throw new RuntimeException('bad_jwt');
    [$h,$p,$s] = $parts;
    $calc = b64u(hash_hmac('sha256', "$h.$p", $secret, true));
    if (!hash_equals($calc, $s)) throw new RuntimeException('sig_mismatch');
    $payload = json_decode(b64ud($p), true);
    if (!is_array($payload)) throw new RuntimeException('bad_payload');
    $now = time();
    if (($payload['nbf'] ?? 0) > $now) throw new RuntimeException('nbf');
    if (($payload['exp'] ?? 0) <= $now) throw new RuntimeException('exp');
    return $payload;
}

?>