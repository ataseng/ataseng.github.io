<?php

declare(strict_types=1);

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    try {
        $pdo = new PDO(DB_SERVER, DB_USERNAME, DB_PASSWORD, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_MULTI_STATEMENTS => false,
        // PDO::ATTR_TIMEOUT => 5, // istersen bağlantı zaman aşımı
        ]);
        return $pdo;
    } catch (PDOException $e) {
        // Üretimde hassas bilgiyi göstermeyin; loglayın
        error_log('DB connect error: ' . $e->getMessage());
        // Üst katmana "gizli" bir mesajla fırlat
        throw new RuntimeException('db_connect_failed', 0, $e);
    }
}

?>