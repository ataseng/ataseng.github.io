<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/jwt.php';
require_once __DIR__ . '/../utils/auth.php';

$raw = $_COOKIE[REFRESH_COOKIE_NAME] ?? null;

if (!$raw) {
    http_response_code(401);
    echo json_encode(['error'=>'no_refresh_cookie']);
    exit;
}

try {

    $pdo = db();
    $hash = hash('sha256', $raw);
    $pdo->beginTransaction();

    // Kayıt var mı?
    $q = $pdo->prepare('SELECT * FROM RefreshTokens WHERE Token_Hash=:token_hash LIMIT 1 FOR UPDATE');
    $q->execute([
        "token_hash" => $hash
    ]);
    $rt = $q->fetch();
    if (!$rt) {
        throw new RuntimeException('refresh_not_found');
    }
    if ((int)$rt['Revoked'] === 1) {
        throw new RuntimeException('refresh_revoked');
    }
    if (strtotime($rt['Expires_At']) <= time()) {
        throw new RuntimeException('refresh_expired');
    }

    // Kullanıcıyı çek
    $select_user_sql = $pdo->prepare('SELECT usr.ID, usr.Email, rl.Name AS Role FROM Users AS usr JOIN Roles AS rl ON usr.Role_ID = rl.ID WHERE usr.ID=:id LIMIT 1');
    $select_user_sql->execute([
        "id" => (int)$rt['User_ID']
    ]);
    $user = $select_user_sql->fetch();
    if (!$user) {
        throw new RuntimeException('user_missing');
    }

    // Rotasyon: mevcut refresh'i revoke et + yenisini üret
    $newRaw = new_refresh_token();
    $newHash = hash('sha256', $newRaw);
    $newExp  = date('Y-m-d H:i:s', time() + REFRESH_TTL_SEC);

    $pdo->prepare('UPDATE RefreshTokens SET Revoked=1, Replaced_by_Token_Hash=:replaced_by_token_hash WHERE ID=:id')
        ->execute([
            "replaced_by_token_hash" => $newHash, 
            "id" => (int)$rt['ID']
        ]);

    
    $pdo->prepare('INSERT INTO RefreshTokens (User_ID, Token_Hash, Expires_At, Created_by_IP, User_Agent) VALUES (:user_id, :token_hash, :expires_at, :created_by_ip, :user_agent)')
        ->execute([
            "user_id" => (int)$rt['User_ID'],
            "token_hash" => $newHash,
            "expires_at" => $newExp,
            "created_by_ip" => $_SERVER['REMOTE_ADDR'] ?? null,
            "user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);

    // Yeni access
    $access = make_access_token((int)$user['ID'], $user['Email'], $user["Role"]);

    // Yeni cookie
    set_refresh_cookie($newRaw);

    $pdo->commit();

    echo json_encode([
        'ok'=>true,
        'access_token'=>$access,
        'token_type'=>'Bearer',
        'expires_in'=>ACCESS_TTL_SEC
    ]);

} catch (Throwable $e) {
    $pdo->rollBack();
    // Eski cookie’yi de temizleyelim
    // clear_refresh_cookie();
    http_response_code(401);
    echo json_encode([
        'error'=>'refresh_invalid',
        'detail'=>$e->getMessage()]);
}

?>