<?php

declare(strict_types=1);

/** Access token üret */
function make_access_token(int $userId, string $email, string $role): string {
    $now = time();
    $payload = [
        'iss'=> BASE_URL,
        'aud'=> FRONTEND_ORIGIN,
        'iat'=> $now,
        'nbf'=> $now,
        'exp'=> $now + ACCESS_TTL_SEC,
        'sub'=> (string)$userId,
        'email'=> $email,
        'role'=> $role,
    ];
    return jwt_encode($payload, JWT_SECRET);
}

/** Rastgele refresh token üretir (raw) */
function new_refresh_token(): string {
    return rtrim(strtr(base64_encode(random_bytes(64)), '+/', '-_'), '='); // 86-88 char
}

/** Refresh token'ı cookie'ye yazar */
function set_refresh_cookie(string $rawToken): void {
    $opts = [
        'expires'  => time() + REFRESH_TTL_SEC,
        'path'     => REFRESH_COOKIE_PATH,
        'domain'   => REFRESH_COOKIE_DOMAIN ?: '', // çoğu durumda boş bırak
        'secure'   => true,
        'httponly' => true,
        'samesite' => REFRESH_COOKIE_SAMESITE,     // 'Lax' genelde yeterli; cross-site ise 'None'
    ];
    setcookie(REFRESH_COOKIE_NAME, $rawToken, $opts);
}

/** Cookie'yi temizler */
function clear_refresh_cookie(): void {
    setcookie(REFRESH_COOKIE_NAME, '', [
        'expires'=> time()-3600,
        'path'=> REFRESH_COOKIE_PATH,
        'domain'=> REFRESH_COOKIE_DOMAIN ?: '',
        'secure'=> true,
        'httponly'=> true,
        'samesite'=> REFRESH_COOKIE_SAMESITE,
    ]);
}
