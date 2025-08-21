<?php

declare(strict_types=1);

require_once __DIR__ . "/jwt.php";

/** Tek kullanımlık raw token üret (base64url sıkıntısız taşınsın) */
function new_email_verify_token(): array {
    $raw = random_bytes(32);           // raw bytes
    $token = base64url_encode($raw);               // linkte taşınacak değer
    $hash = hash('sha256', $raw);      // DB’ye yazılacak
    return [$token, $hash];
}

/** Doğrulama linki oluştur */
function build_verify_url(int $userId, string $token): string {
    $url_query = http_build_query(['user_id' => $userId, 'token' => $token]);
    return VERIFY_URL_BACKEND . '?' . $url_query;
}

/** E-posta gönder (örnek: mail() veya PHPMailer) */
function send_verification_email(string $toEmail, string $toName, string $verifyUrl): bool {
    // Basit mail() örneği (prod’da SMTP + PHPMailer tavsiye):
    $subject = 'E-posta Doğrulama';
    $body = "Merhaba {$toName},\n\nHesabınızı doğrulamak için linke tıklayın:\n{$verifyUrl}\n\nBu bağlantı" . VERIFY_TOKEN_DURATION . "saat geçerlidir.";
    $headers = "From: no-reply@yoursite.example\r\nContent-Type: text/plain; charset=UTF-8";
    return @mail($toEmail, $subject, $body, $headers);
}

function send_via_sendgrid(string $apiKey, string $fromEmail, string $fromName,
                           string $toEmail, string $toName,
                           string $subject, string $html, string $text=''): bool {
  $payload = [
    'personalizations' => [[ 'to' => [[ 'email' => $toEmail, 'name' => $toName ]] ]],
    'from' => [ 'email' => $fromEmail, 'name' => $fromName ],
    'subject' => $subject,
    'content' => [
      [ 'type' => 'text/plain', 'value' => $text !== '' ? $text : strip_tags($html) ],
      [ 'type' => 'text/html',  'value' => $html ],
    ],
  ];

  $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      'Authorization: Bearer ' . $apiKey,
      'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
  ]);
  $res = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  if ($res === false || $code >= 300) {
    error_log('SendGrid error: ' . ($res ?: curl_error($ch)) . " (HTTP $code)");
    curl_close($ch);
    return false;
  }
  curl_close($ch);
  return true;
}

require_once __DIR__ . "/../vendors/PHPMailer/PHPMailer.php";
require_once __DIR__ . "/../vendors/PHPMailer/Exception.php";
require_once __DIR__ . "/../vendors/PHPMailer/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function send_verification_email_phpmailer(string $toEmail, string $toName, string $verifyUrl): bool {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->Port = SMTP_PORT;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // 465 ise ENCRYPTION_SMTPS
        $mail->CharSet = 'UTF-8';

        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress($toEmail, $toName);

        $mail->isHTML(true);
        $mail->Subject = 'E-posta Doğrulama';
        $mail->Body = "Merhaba {$toName},<br><br>Hesabınızı doğrulamak için <a href=\"{$verifyUrl}\">buraya tıklayın</a>.<br><br>Bağlantı " . VERIFY_TOKEN_DURATION . " saat geçerlidir.";
        $mail->AltBody = "Merhaba {$toName},\n\nDoğrulama linki: {$verifyUrl}\n(" . VERIFY_TOKEN_DURATION . " saat geçerli)";

        return $mail->send();
    } catch (Exception $e) {
        error_log('Mail error: ' . $mail->ErrorInfo);
        return false;
    }
}

?>