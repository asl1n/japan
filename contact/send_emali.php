<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$to_email = "pukarhirachan@gmail.com"; // Replace with your email
$from_email = "noreply@yourwebsite.com"; // Replace with your domain email
$subject_prefix = "Contact Form - ASN Abroad Study Nepal";

// Response array
$response = array('success' => false, 'message' => '');

try {
    // Check if form was submitted via POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Sanitize and validate input data
    $full_name = filter_input(INPUT_POST, 'full_name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $preferred_media = filter_input(INPUT_POST, 'preferred_media', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validation
    $errors = array();

    if (empty($full_name)) {
        $errors[] = 'Full name is required';
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email address is required';
    }

    if (empty($phone)) {
        $errors[] = 'Phone number is required';
    }

    if (empty($preferred_media)) {
        $errors[] = 'Preferred contact media is required';
    }

    if (empty($message)) {
        $errors[] = 'Message is required';
    }

    if (!empty($errors)) {
        throw new Exception(implode(', ', $errors));
    }

    // Prepare email content
    $subject = $subject_prefix . " - " . $full_name;
    
    $email_body = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #143249; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #143249; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #4fd1c7; }
            .footer { background: #143249; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
                <p>ASN Abroad Study Nepal</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='label'>Full Name:</div>
                    <div class='value'>" . htmlspecialchars($full_name) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email Address:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Phone Number:</div>
                    <div class='value'>" . htmlspecialchars($phone) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Preferred Contact Media:</div>
                    <div class='value'>" . htmlspecialchars(ucfirst($preferred_media)) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Submitted On:</div>
                    <div class='value'>" . date('F j, Y \a\t g:i A') . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>This email was sent from the contact form on your website.</p>
                <p>Please respond to: " . htmlspecialchars($email) . "</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Email headers
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $from_email,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );

    // Send email
    if (mail($to_email, $subject, $email_body, implode("\r\n", $headers))) {
        $response['success'] = true;
        $response['message'] = 'Email sent successfully';
        
        // Log successful submission (optional)
        error_log("Contact form submission from: " . $email . " - " . date('Y-m-d H:i:s'));
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    
    // Log error
    error_log("Contact form error: " . $e->getMessage() . " - " . date('Y-m-d H:i:s'));
}

// Return JSON response
echo json_encode($response);
?>