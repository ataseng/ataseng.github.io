<?php

namespace App;

define("DEBUG_STATUS", TRUE);

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
define("REFRESH_COOKIE_DOMAIN", 'ataseng.com'); // genellikle bos birak (API domaini); cross-subdomain icin ".example.com"
// define("REFRESH_COOKIE_DOMAIN", ''); // genellikle bos birak (API domaini); cross-subdomain icin ".example.com"

// TODO Change Lax to Strict
// define("REFRESH_COOKIE_SAMESITE", "Strict"); // farklı site ise 'None' + HTTPS sart, 
// define("REFRESH_COOKIE_SAMESITE", "Lax"); // farklı site ise 'None' + HTTPS sart,
if(DEBUG_STATUS){
    define("REFRESH_COOKIE_SAMESITE", "None"); // farklı site ise 'None' + HTTPS sart,
}
else{
    define("REFRESH_COOKIE_SAMESITE", "Strict");
}

define("VERIFY_TOKEN_DURATION", 3);
define("VERIFY_TOKEN_TTL_SEC", 60 * 60 * VERIFY_TOKEN_DURATION); // 3 saat
define("VERIFY_URL_BACKEND", 'https://ataseng.com/api/auth/verify.php'); // doğrulama endpoint’i
define("VERIFY_REDIRECT_OK", 'https://ataseng.com/email_verified.html');        // doğrulama sonrası yönlendir
define("VERIFY_REDIRECT_FAIL", 'https://ataseng.com/email_verify_failed.html');

define("SMTP_HOST", $env["SMTP_HOST"]);
define("SMTP_PORT", $env["SMTP_PORT"]); // 465 kullanıyorsanız SMTPS
define("SMTP_USER", $env["SMTP_USER"]);
define("SMTP_PASS", $env["SMTP_PASS"]);
define("SMTP_FROM_EMAIL", $env["SMTP_FROM_EMAIL"]);
define("SMTP_FROM_NAME", $env["SMTP_FROM_NAME"]);

require_once __DIR__ . '/utils/cors.php';

cors_headers(); cors_preflight();

?>