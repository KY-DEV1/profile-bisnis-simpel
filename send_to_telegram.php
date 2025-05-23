<?php
header('Content-Type: application/json');

// Validasi request method
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

// Ambil dan sanitasi data input
$name = htmlspecialchars(strip_tags(trim($_POST["name"] ?? '')));
$email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($_POST["phone"] ?? '')));
$message = htmlspecialchars(strip_tags(trim($_POST["message"] ?? '')));

// Validasi data wajib
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["message" => "Nama, email, dan pesan wajib diisi"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["message" => "Format email tidak valid"]);
    exit;
}

// ================= KONFIGURASI TELEGRAM ================= //
// Ganti dengan token bot Telegram Anda
$botToken = '-';
// Ganti dengan chat ID tujuan
$chatId = '-';

// Format pesan
$text = urlencode("📨 *PESAN BARU DARI WEBSITE*
    
*Nama*: $name
*Email*: $email
*Telepon*: " . ($phone ? $phone : '-') . "
    
*Pesan*:
$message");

// URL API Telegram
$telegramUrl = "https://api.telegram.org/bot{$botToken}/sendMessage?chat_id={$chatId}&text={$text}&parse_mode=Markdown";

// Kirim ke Telegram
$response = file_get_contents($telegramUrl);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["message" => "Gagal mengirim pesan ke Telegram"]);
} else {
    $responseData = json_decode($response, true);
    if ($responseData['ok']) {
        echo json_encode(["message" => "Terima kasih! Pesan Anda telah terkirim ke Telegram kami."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Gagal mengirim pesan: " . $responseData['description']]);
    }
}
?>
