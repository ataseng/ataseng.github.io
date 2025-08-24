<?php

declare(strict_types=1);

function base64url_encode(string $s): string {
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

function base64url_decode(string $s): string {
    return base64_decode(strtr($s, '-_', '+/'));
}

function base64url_decode_strict(string $data): string {
    $b64 = strtr($data, '-_', '+/');

    $pad = strlen($b64) % 4;
    if ($pad)
        $b64 .= str_repeat('=', 4 - $pad);

    $out = base64_decode($b64, true);
    if ($out === false)
        throw new \RuntimeException('bad_b64');

    return $out;
}

function jwt_encode(array $payload, string $secret): string {
    $header = [
        'alg'=>'HS256',
        'typ'=>'JWT'
    ];
    $h = base64url_encode(json_encode($header, JSON_UNESCAPED_SLASHES));
    $p = base64url_encode(json_encode($payload, JSON_UNESCAPED_SLASHES));
    $sig = base64url_encode(hash_hmac('sha256', "$h.$p", $secret, true));
    return "$h.$p.$sig";
}

function jwt_decode_verify(string $jwt, string $secret): array {
    $parts = explode('.', $jwt);
    if (count($parts) !== 3)
        throw new RuntimeException('bad_jwt');
    [$h, $p, $s] = $parts;

    $headerJson = base64url_decode_strict($h);
    $header = json_decode($headerJson, true);
    if (!is_array($header))
        throw new \RuntimeException('bad_header');
    if (($header['alg'] ?? '') !== 'HS256')
        throw new \RuntimeException('alg');

    $calc = base64url_encode(hash_hmac('sha256', "$h.$p", $secret, true));
    if (!hash_equals($calc, $s))
        throw new RuntimeException('sig_mismatch');

    $payloadJson = base64url_decode_strict($p);
    $payload = json_decode($payloadJson, true);

    if (!is_array($payload))
        throw new \RuntimeException('bad_payload');

    $now = time();
    if (($payload['nbf'] ?? 0) > $now)
        throw new RuntimeException('nbf');

    if (($payload['exp'] ?? 0) <= $now)
        throw new RuntimeException('exp');

    return $payload;
}

?>