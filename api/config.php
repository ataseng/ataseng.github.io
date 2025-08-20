<?php

namespace App;

const DEBUG = TRUE;

$env = parse_ini_file('.env');

define("SERVER_NAME", "ataseng.com");
define("FRONTEND_ORIGIN", "https://ataseng.com");

define("DB_NAME", $env["DB_NAME"]);
define("DB_USERNAME", $env["DB_USERNAME"]);
define("DB_PASSWORD", $env["DB_PASSWORD"]);
define("DB_SERVER", "mysql:host=" . SERVER_NAME . ";dbname=" . DB_NAME);

define("BASE_URL", "https://" . SERVER_NAME . "/api/");

define("JWT_SECRET", $env["JWT_SECRET"]);

define("ACCESS_TTL_SEC", 15 * 60); // 15 dk
define("REFRESH_TTL_SEC", 60 * 60 * 24 * 30); // 30 gun
define("REFRESH_COOKIE_NAME", "refresh_token");
define("REFRESH_COOKIE_PATH", '/');
define("REFRESH_COOKIE_DOMAIN", ''); // genellikle bos birak (API domaini); cross-subdomain icin ".example.com"
define("REFRESH_COOKIE_SAMESITE", "Lax"); // farklı site ise 'None' + HTTPS sart

require_once __DIR__ . '/utils/cors.php';

cors_headers(); cors_preflight();

?>