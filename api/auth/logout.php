<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/auth.php';

$raw = $_COOKIE[REFRESH_COOKIE_NAME] ?? null;
if ($raw) {
    $pdo = db();
    $hash = hash('sha256', $raw);
    $pdo->prepare('UPDATE RefreshTokens SET Revoked=1 WHERE Token_Hash=:token_hash')->execute([
        "token_hash" => $hash
    ]);
}

clear_refresh_cookie();

echo json_encode(['ok'=>true]);
