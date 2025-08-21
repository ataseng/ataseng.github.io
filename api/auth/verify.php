<?php

declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../utils/db.php';
require_once __DIR__ . '/../utils/verify.php';
require_once __DIR__ . '/../utils/jwt.php';

$user_id   = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
$token = isset($_GET['token']) ? (string)$_GET['token'] : '';

if ($user_id <= 0 || $token === '') {
    header('Location: ' . VERIFY_REDIRECT_FAIL); exit;
}

$pdo = db();

try {
  // base64url decode → raw → sha256
    $raw = base64url_decode($token);
    if ($raw === false) { header('Location: ' . VERIFY_REDIRECT_FAIL); exit; }
    $tokenHash = hash('sha256', $raw);

    $pdo->beginTransaction();

    // Token’ı bul (kullanılmamış + süresi dolmamış)
    $q = $pdo->prepare('SELECT * FROM EmailVerifications WHERE Token_Hash=:token_hash AND User_ID=:user_id LIMIT 1 FOR UPDATE');
    $q->execute([
        "token_hash" => $tokenHash,
        "user_id" => $user_id
    ]);
    $row = $q->fetch();

    if (!$row) { throw new RuntimeException('not_found'); }
    if ($row['Used_At'] !== null) { throw new RuntimeException('already_used'); }
    if (strtotime($row['Expires_At']) <= time()) { throw new RuntimeException('expired'); }

    // Kullanıcıyı aktif et
    $pdo->prepare('UPDATE Users SET Is_Active=1, Email_Verified_At=NOW() WHERE ID=:user_id')->execute([
        "user_id" => $user_id
    ]);

    // Token’ı işaretle (tek kullanımlık)
    $pdo->prepare('UPDATE EmailVerifications SET Used_At=NOW() WHERE ID=:id')->execute([
        "id" => (int)$row['ID']
    ]);

    // (Opsiyonel) aynı kullanıcıya ait diğer kullanılmamış doğrulama kayıtlarını geçersiz kıl
    $pdo->prepare('UPDATE EmailVerifications SET Used_At=NOW() WHERE User_ID=:user_id AND Used_At IS NULL AND ID<>:id')
        ->execute([
            "user_id" => $user_id,
            "id" => (int)$row['ID']
        ]);

    $pdo->commit();

    // Frontend’e yönlendir (başarılı sayfa)
    header('Location: ' . VERIFY_REDIRECT_OK);
    exit;

} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    error_log('verify error: ' . $e->getMessage());
    header('Location: ' . VERIFY_REDIRECT_FAIL);
    exit;
}
