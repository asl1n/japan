<?php
// Email Configuration
define('SMTP_HOST', 'smtp.gmail.com'); // For Gmail
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com'); // Your Gmail address
define('SMTP_PASSWORD', 'your-app-password'); // Your Gmail app password
define('SMTP_ENCRYPTION', 'tls');

// Site Configuration
define('SITE_NAME', 'ASN Abroad Study Nepal');
define('ADMIN_EMAIL', 'admin@yourwebsite.com');
define('FROM_EMAIL', 'noreply@yourwebsite.com');

// Security
define('ALLOWED_ORIGINS', ['http://localhost', 'https://yourwebsite.com']);

// Database Configuration (if you want to store submissions)
define('DB_HOST', 'localhost');
define('DB_NAME', 'contact_forms');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
?>