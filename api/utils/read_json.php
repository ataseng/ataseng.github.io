<?php
// api/utils/readJson.php
declare(strict_types=1);

namespace App\Utils;

use RuntimeException;

final class JsonBodyException extends RuntimeException {
    public int $status;
    public function __construct(string $message, int $status = 400) {
        parent::__construct($message);
        $this->status = $status;
    }
}

/**
 * HTTP JSON body okur ve dizi döner.
 * - Content-Type kontrolü (application/json, +charset opsiyonel)
 * - Boyut limiti (varsayılan 1 MB)
 * - Boş gövde ve JSON hatalarında istisna fırlatır
 */
function readJson(array $options = []): array {
    $maxSize = (int)($options['max_size'] ?? 1024 * 1024); // 1 MB
    $requireContentType = (bool)($options['require_content_type'] ?? true);

    if ($requireContentType) {
        $ct = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
        // "application/json" ya da "application/json; charset=utf-8" gibi değerleri kabul et
        if (!preg_match('#^application/json\b#i', $ct)) {
            throw new JsonBodyException('invalid_content_type', 415); // Unsupported Media Type
        }
    }

    // Boyut limiti (varsa CONTENT_LENGTH'a bak)
    $len = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($maxSize > 0 && $len > $maxSize) {
        throw new JsonBodyException('payload_too_large', 413);
    }

    $raw = file_get_contents('php://input');
    if ($raw === false) {
        throw new JsonBodyException('body_read_error', 400);
    }
    if ($raw === '') {
        throw new JsonBodyException('empty_body', 400);
    }

    // JSON parse – json_throw_on_error ile istisna yakalarız
    try {
        /** @var array $data */
        $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    } catch (\JsonException $e) {
        throw new JsonBodyException('invalid_json', 400);
    }

    if (!is_array($data)) {
        throw new JsonBodyException('invalid_json_root', 400);
    }

    return $data;
}
