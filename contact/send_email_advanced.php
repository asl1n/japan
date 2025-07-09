<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Import PHPMailer classes (if using PHPMailer for better email delivery)
// require_once 'vendor/autoload.php';
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
// use PHPMailer\PHPMailer\Exception;

class ContactFormHandler {
    private $response;
    
    public function __construct() {
        $this->response = array('success' => false, 'message' => '');
    }
    
    public function handleRequest() {
        try {
            $this->validateRequest();
            $formData = $this->sanitizeInput();
            $this->validateFormData($formData);
            
            // Store in database (optional)
            // $this->storeSubmission($formData);
            
            // Send email
            $this->sendEmail($formData);
            
            $this->response['success'] = true;
            $this->response['message'] = 'Thank you! Your message has been sent successfully.';
            
        } catch (Exception $e) {
            $this->response['success'] = false;
            $this->response['message'] = $e->getMessage();
            $this->logError($e->getMessage());
        }
        
        return $this->response;
    }
    
    private function validateRequest() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            throw new Exception('Invalid request method');
        }
        
        // Check for spam (simple honeypot and rate limiting)
        if (isset($_POST['website']) && !empty($_POST['website'])) {
            throw new Exception('Spam detected');
        }
        
        // Rate limiting (simple session-based)
        session_start();
        $now = time();
        if (isset($_SESSION['last_submission']) && ($now - $_SESSION['last_submission']) < 60) {
            throw new Exception('Please wait before submitting another message');
        }
        $_SESSION['last_submission'] = $now;
    }
    
    private function sanitizeInput() {
        return array(
            'full_name' => $this->sanitize($_POST['full_name'] ?? ''),
            'email' => filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL),
            'phone' => $this->sanitize($_POST['phone'] ?? ''),
            'preferred_media' => $this->sanitize($_POST['preferred_media'] ?? ''),
            'message' => $this->sanitize($_POST['message'] ?? ''),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'timestamp' => date('Y-m-d H:i:s')
        );
    }
    
    private function sanitize($input) {
        return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
    }
    
    private function validateFormData($data) {
        $errors = array();
        
        if (empty($data['full_name']) || strlen($data['full_name']) < 2) {
            $errors[] = 'Full name must be at least 2 characters';
        }
        
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Valid email address is required';
        }
        
        if (empty($data['phone']) || !preg_match('/^[\+]?[0-9\s\-$$$$]{10,}$/', $data['phone'])) {
            $errors[] = 'Valid phone number is required';
        }
        
        if (empty($data['preferred_media'])) {
            $errors[] = 'Preferred contact method is required';
        }
        
        if (empty($data['message']) || strlen($data['message']) < 10) {
            $errors[] = 'Message must be at least 10 characters';
        }
        
        if (!empty($errors)) {
            throw new Exception(implode(', ', $errors));
        }
    }
    
    private function sendEmail($data) {
        $to = ADMIN_EMAIL;
        $subject = SITE_NAME . ' - Contact Form: ' . $data['full_name'];
        
        $emailBody = $this->generateEmailTemplate($data);
        
        $headers = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . FROM_EMAIL,
            'Reply-To: ' . $data['email'],
            'X-Mailer: PHP/' . phpversion(),
            'X-Priority: 1'
        );
        
        if (!mail($to, $subject, $emailBody, implode("\r\n", $headers))) {
            throw new Exception('Failed to send email. Please try again later.');
        }
        
        // Send confirmation email to user
        $this->sendConfirmationEmail($data);
    }
    
    private function sendConfirmationEmail($data) {
        $subject = 'Thank you for contacting ' . SITE_NAME;
        $body = $this->generateConfirmationTemplate($data);
        
        $headers = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . FROM_EMAIL,
            'X-Mailer: PHP/' . phpversion()
        );
        
        mail($data['email'], $subject, $body, implode("\r\n", $headers));
    }
    
    private function generateEmailTemplate($data) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
                .header { background: linear-gradient(135deg, #143249, #1a3d52); color: white; padding: 30px 20px; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; }
                .header p { margin: 5px 0 0 0; opacity: 0.9; }
                .content { padding: 30px 20px; }
                .field { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
                .field:last-child { border-bottom: none; }
                .label { font-weight: 600; color: #143249; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
                .value { margin-top: 8px; padding: 12px; background: #f8f9fa; border-left: 4px solid #4fd1c7; font-size: 16px; }
                .message-field .value { white-space: pre-wrap; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
                .urgent { background: #fff3cd; border-left-color: #ffc107; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>New Contact Form Submission</h1>
                    <p>" . SITE_NAME . "</p>
                </div>
                
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Full Name</div>
                        <div class='value'>{$data['full_name']}</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Email Address</div>
                        <div class='value'><a href='mailto:{$data['email']}'>{$data['email']}</a></div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Phone Number</div>
                        <div class='value'><a href='tel:{$data['phone']}'>{$data['phone']}</a></div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Preferred Contact Method</div>
                        <div class='value'>" . ucfirst($data['preferred_media']) . "</div>
                    </div>
                    
                    <div class='field message-field'>
                        <div class='label'>Message</div>
                        <div class='value'>{$data['message']}</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>Submission Details</div>
                        <div class='value'>
                            <strong>Date:</strong> {$data['timestamp']}<br>
                            <strong>IP Address:</strong> {$data['ip_address']}<br>
                            <strong>User Agent:</strong> {$data['user_agent']}
                        </div>
                    </div>
                </div>
                
                <div class='footer'>
                    <p>This email was automatically generated from your website contact form.</p>
                    <p>Please respond directly to: <a href='mailto:{$data['email']}'>{$data['email']}</a></p>
                </div>
            </div>
        </body>
        </html>";
    }
    
    private function generateConfirmationTemplate($data) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Thank you for contacting us</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
                .header { background: linear-gradient(135deg, #143249, #1a3d52); color: white; padding: 30px 20px; text-align: center; }
                .content { padding: 30px 20px; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
                .highlight { color: #4fd1c7; font-weight: 600; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Thank You!</h1>
                    <p>" . SITE_NAME . "</p>
                </div>
                
                <div class='content'>
                    <p>Dear <strong>{$data['full_name']}</strong>,</p>
                    
                    <p>Thank you for contacting us! We have received your message and will get back to you within <span class='highlight'>24 hours</span>.</p>
                    
                    <p>Here's a summary of your submission:</p>
                    <ul>
                        <li><strong>Name:</strong> {$data['full_name']}</li>
                        <li><strong>Email:</strong> {$data['email']}</li>
                        <li><strong>Phone:</strong> {$data['phone']}</li>
                        <li><strong>Preferred Contact:</strong> " . ucfirst($data['preferred_media']) . "</li>
                        <li><strong>Submitted:</strong> {$data['timestamp']}</li>
                    </ul>
                    
                    <p>If you have any urgent questions, please don't hesitate to call us directly at <strong>+977 9842516435</strong>.</p>
                    
                    <p>Best regards,<br>
                    <strong>" . SITE_NAME . " Team</strong></p>
                </div>
                
                <div class='footer'>
                    <p>This is an automated confirmation email. Please do not reply to this message.</p>
                </div>
            </div>
        </body>
        </html>";
    }
    
    private function storeSubmission($data) {
        // Optional: Store in database
        try {
            $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $stmt = $pdo->prepare("
                INSERT INTO contact_submissions 
                (full_name, email, phone, preferred_media, message, ip_address, user_agent, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['full_name'],
                $data['email'],
                $data['phone'],
                $data['preferred_media'],
                $data['message'],
                $data['ip_address'],
                $data['user_agent'],
                $data['timestamp']
            ]);
            
        } catch (PDOException $e) {
            // Log database error but don't fail the email sending
            $this->logError("Database error: " . $e->getMessage());
        }
    }
    
    private function logError($message) {
        error_log("[Contact Form Error] " . $message . " - " . date('Y-m-d H:i:s') . " - IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    }
}

// Handle the request
$handler = new ContactFormHandler();
$response = $handler->handleRequest();

echo json_encode($response);
?>