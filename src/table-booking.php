<?php
// Function to respond with standardized JSON format (since React expects JSON)
function respond($message, $success = true, $isAjax = true) {
    global $bookingRef;
    error_log("📤 RESPONSE PREPARATION:");
    error_log("  - Success: " . ($success ? 'true' : 'false'));
    error_log("  - Message: $message");
    error_log("  - Booking Ref: " . ($bookingRef ?? 'Not set'));
    $response = [
        'success' => $success,
        'message' => $message,
        'bookingRef' => $bookingRef ?? null,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    if (!headers_sent()) {
        header('Content-Type: application/json');
        header('Cache-Control: no-cache, must-revalidate');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    }
    $jsonResponse = json_encode($response, JSON_PRETTY_PRINT);
    error_log("📋 JSON Response: $jsonResponse");
    echo $jsonResponse;
    error_log("✅ Response sent successfully");
    error_log("=== TABLE_BOOKINGS.PHP REQUEST ENDED ===");
    error_log("🕒 End timestamp: " . date('Y-m-d H:i:s'));
    exit;
}

// Enable comprehensive error reporting and logging
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Set error log file if needed (optional - will use system default)
// ini_set('error_log', __DIR__ . '/table_bookings_error.log');

// Start comprehensive logging
error_log("=== TABLE_BOOKINGS.PHP REQUEST STARTED ===");
error_log("🕒 Timestamp: " . date('Y-m-d H:i:s'));
error_log("🌐 Server Environment Check:");
error_log("  - PHP Version: " . phpversion());
error_log("  - Server Software: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'));
error_log("  - Document Root: " . $_SERVER['DOCUMENT_ROOT']);
error_log("  - Script Name: " . $_SERVER['SCRIPT_NAME']);
error_log("  - Request URI: " . $_SERVER['REQUEST_URI']);
error_log("  - Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("  - Current Working Directory: " . getcwd());
error_log("  - This File Path: " . __FILE__);
error_log("  - File Exists: " . (file_exists(__FILE__) ? 'Yes' : 'No'));

// Check if this is AJAX request
$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
error_log("🔍 Request Type Analysis:");
error_log("  - Is AJAX: " . ($isAjax ? 'Yes' : 'No'));
error_log("  - Content Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'Not set'));
error_log("  - HTTP_X_REQUESTED_WITH: " . ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? 'Not set'));

// Log all headers
error_log("📋 Request Headers:");
$headers = getallheaders();
if ($headers) {
    foreach ($headers as $name => $value) {
        error_log("  - $name: $value");
    }
} else {
    error_log("  - No headers found or getallheaders() not available");
}

// Check PHP extensions
error_log("🔧 PHP Extensions Check:");
error_log("  - cURL: " . (extension_loaded('curl') ? 'Loaded' : 'NOT LOADED'));
error_log("  - OpenSSL: " . (extension_loaded('openssl') ? 'Loaded' : 'NOT LOADED'));
error_log("  - JSON: " . (extension_loaded('json') ? 'Loaded' : 'NOT LOADED'));
error_log("  - Mail: " . (function_exists('mail') ? 'Available' : 'NOT AVAILABLE'));

// Log POST and JSON data with detailed analysis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("📨 POST Request Analysis:");
    error_log("  - POST Data Count: " . count($_POST));
    error_log("  - POST Data: " . print_r($_POST, true));
    error_log("  - FILES Data: " . print_r($_FILES, true));
    
    $rawInput = file_get_contents('php://input');
    error_log("📄 Raw Input Analysis:");
    error_log("  - Raw Input Length: " . strlen($rawInput));
    error_log("  - Raw Input Empty: " . (empty($rawInput) ? 'Yes' : 'No'));
    error_log("  - Raw Input Preview: " . substr($rawInput, 0, 200) . (strlen($rawInput) > 200 ? '...' : ''));
    
    if (!empty($rawInput)) {
        error_log("🔍 JSON Decode Attempt:");
        $jsonData = json_decode($rawInput, true);
        if ($jsonData !== null) {
            error_log("  - JSON Decode: SUCCESS");
            error_log("  - Decoded Data Keys: " . implode(', ', array_keys($jsonData)));
            error_log("  - Decoded JSON: " . print_r($jsonData, true));
        } else {
            error_log("  - JSON Decode: FAILED");
            error_log("  - JSON Error Code: " . json_last_error());
            error_log("  - JSON Error Message: " . json_last_error_msg());
        }
    }
} else {
    error_log("❌ Non-POST request received: " . $_SERVER['REQUEST_METHOD']);
}

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Load Composer's autoloader (ensure Composer is installed and PHPMailer is required via composer.json)

require __DIR__ . '/../vendor/autoload.php';

// Email configuration settings (update these with your actual details)
$config = [
    // Email addresses
    'to_email' => "mukudutinotenda00@gmail.com", // Primary recipient email (you will receive bookings here)
    'cc_email' => "",  // CC recipient (leave empty if none)
    'bcc_email' => "", // BCC recipient (leave empty if none)
    
    // Sender information
    'from_name' => "Table Booking System",
    'from_email' => "mukudutinotenda00@gmail.com",
    
    // Email settings
    'subject_prefix' => "[Table Booking] ",
    
    // SMTP Settings (use Gmail SMTP as in your example)
    'use_smtp' => true,
    'smtp_host' => "smtp.gmail.com",
    'smtp_port' => 587,
    'smtp_username' => "mukudutinotenda00@gmail.com",
    'smtp_password' => "sayq dsfn embg arwn", // Use app password for Gmail
    'smtp_secure' => "tls",
    
    // Debug mode
    'debug_mode' => true
];

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("✅ POST request received, processing...");
    
    // Generate a unique booking reference
    $typeCode = 'TABLE'; // Customize based on booking type
    $bookingRef = 'HCSA-' . $typeCode . '-' . date('Ymd') . '-' . rand(1000, 9999);
    error_log("Generated booking reference: $bookingRef");
    
    // Initialize response variables
    $success = false;
    $message = "";
    $emailSent = false;

    // Log received data
    if ($config['debug_mode']) {
        error_log("Table Booking Request - Ref: $bookingRef");
        error_log("POST data: " . print_r($_POST, true));
        error_log("FILES data: " . print_r($_FILES, true));
    }
    
    // Process JSON data (since React sends JSON)
    error_log("📄 Processing JSON request data");
    $requestBody = file_get_contents('php://input');
    error_log("Request body length: " . strlen($requestBody));
    
    if (empty($requestBody)) {
        error_log("❌ Empty request body received");
        respond("No data received. Please ensure form data is being sent.", false, true); // Assume AJAX since React fetch
        exit;
    }
    
    $data = json_decode($requestBody, true);
    
    // Debugging: Check if JSON decoding failed
    if ($data === null) {
        error_log("❌ JSON decode failed: " . json_last_error_msg());
        error_log("Raw request body: " . $requestBody);
        respond("Error decoding JSON: " . json_last_error_msg(), false, true);
        exit;
    }
    
    error_log("✅ JSON decoded successfully");
    error_log("Decoded data: " . print_r($data, true));
    
    // Extract form data from the decoded JSON (based on your React formData and colleagues)
    $tableType = isset($data['tableType']) ? $data['tableType'] : '';
    $firstName = isset($data['firstName']) ? $data['firstName'] : '';
    $lastName = isset($data['lastName']) ? $data['lastName'] : '';
    $address = isset($data['address']) ? $data['address'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $phone = isset($data['phone']) ? $data['phone'] : '';
    $wantsGown = isset($data['wantsGown']) ? $data['wantsGown'] : 'no';
    $gownSize = isset($data['gownSize']) ? $data['gownSize'] : '';
    $hasColleagues = isset($data['hasColleagues']) ? $data['hasColleagues'] : 'no';
    $terms = isset($data['terms']) ? $data['terms'] : false;
    $colleagues = isset($data['colleagues']) && is_array($data['colleagues']) ? $data['colleagues'] : [];
    $submission_time = isset($data['submission_time']) ? $data['submission_time'] : date('Y-m-d H:i:s');
    
    $contactEmail = $email;
    $contactPhone = $phone;
    
    error_log("📋 Extracted table booking data:");
    error_log("Table Type: $tableType");
    error_log("Name: $firstName $lastName");
    error_log("Email: $email");
    error_log("Phone: $phone");
    error_log("Address: $address");
    error_log("Wants Gown: $wantsGown (Size: $gownSize)");
    error_log("Has Colleagues: $hasColleagues");
    error_log("Terms Accepted: " . ($terms ? 'Yes' : 'No'));
    error_log("Submission Time: $submission_time");
    error_log("Colleagues: " . print_r($colleagues, true));
    
    // Simple validation
    if (empty($tableType) || empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($address) || !$terms) {
        error_log("❌ Validation failed - missing required fields");
        respond("Please fill in all required fields and accept terms.", false, true);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("❌ Invalid email: $email");
        respond("Please enter a valid email address.", false, true);
        exit;
    }
    
    error_log("✅ Validation passed");
    
    // Prepare email content
    $fullName = trim($firstName . ' ' . $lastName);
    $emailSubject = $config['subject_prefix'] . "New Table Booking - $fullName";
    
    // Start HTML email structure
    $emailStart = "
        <html>
        <head>
            <title>New Table Booking</title>
            <style>
                body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
                h2 { color: #4c5a7d; border-bottom: 2px solid #4c5a7d; padding-bottom: 10px; }
                h4 { color: #4c5a7d; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; }
                p { margin: 5px 0; }
                .booking-ref { background-color: #f8f9fa; padding: 10px; border-left: 4px solid #4c5a7d; margin: 15px 0; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px; }
            </style>
        </head>
        <body>
            <h2>New Table Booking</h2>
            <div class='booking-ref'>
                <p><strong>Booking Reference:</strong> $bookingRef</p>
                <p><strong>Submission Time:</strong> $submission_time</p>
            </div>
    ";
    
    $emailEnd = "
            <div class='footer'>
                <p>This is an automated message from the Table Booking System.</p>
                <p>© " . date('Y') . " Honourable Cabinet Summit Awards</p>
            </div>
        </body>
        </html>
    ";
    
    // Build colleague details if available
    $colleagueDetails = "";
    if ($hasColleagues === 'yes' && !empty($colleagues)) {
        $colleagueDetails = "<h4>Colleague Details</h4>";
        foreach ($colleagues as $index => $colleague) {
            $colleagueNumber = $index + 1;
            $colleagueDetails .= "
                <p><strong>Colleague $colleagueNumber:</strong></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Position:</strong> " . htmlspecialchars($colleague['position'] ?? 'Not provided') . "</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Gown:</strong> " . ($colleague['wantsGown'] === 'yes' ? 'Yes (Size: ' . htmlspecialchars($colleague['gownSize'] ?? 'N/A') . ')' : 'No') . "</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Name:</strong> " . htmlspecialchars($colleague['name'] ?? 'Not provided') . "</p>";
            
            // Add additional info if provided
            if (isset($colleague['additionalInfo']) && !empty(trim($colleague['additionalInfo'])) && 
                trim(strtolower($colleague['additionalInfo'])) !== 'none' && 
                trim($colleague['additionalInfo']) !== '') {
                $colleagueDetails .= "
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Additional Info:</strong> " . htmlspecialchars($colleague['additionalInfo']) . "</p>";
            }
        }
    }
    
    // Build table type details (map to human-readable names/prices from your React tableTypes)
    $tableTypeMap = [
        'silver' => ['name' => 'Silver', 'price' => '$250 USD', 'seats' => 'Seat for the high profile winner'],
        'gold' => ['name' => 'Gold Seat', 'price' => '$500 USD', 'seats' => 'One gold High profile reservation'],
        'platinum' => ['name' => 'Platinum Seat', 'price' => '$1000 USD', 'seats' => 'Customized platinum seat']
    ];
    $tableInfo = $tableTypeMap[$tableType] ?? ['name' => $tableType, 'price' => 'N/A', 'seats' => 'N/A'];
    
    $tableDetails = "
        <h4>Table Booking Details</h4>
        <p><strong>Type:</strong> {$tableInfo['name']}</p>
        <p><strong>Price:</strong> {$tableInfo['price']}</p>
        <p><strong>Seats:</strong> {$tableInfo['seats']}</p>
    ";
    
    // Gown details
    $gownDetails = "
        <h4>Gown Booking</h4>
        <p><strong>Wants Gown:</strong> " . ucfirst($wantsGown) . "</p>
        <p><strong>Gown Size:</strong> " . ($wantsGown === 'yes' ? htmlspecialchars($gownSize) : 'N/A') . "</p>
    ";
    
    // Assemble full email message
    $emailMessage = $emailStart . "
        <h4>Personal Information</h4>
        <p><strong>Name:</strong> $fullName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Address:</strong> $address</p>
        
        $tableDetails
        
        $gownDetails
        
        <h4>Additional Details</h4>
        <p><strong>Colleagues Booking:</strong> " . ucfirst($hasColleagues) . "</p>
        <p><strong>Terms Accepted:</strong> " . ($terms ? 'Yes' : 'No') . "</p>
        
        $colleagueDetails
    " . $emailEnd;
    
    $message = $emailMessage;

    // Send email using PHPMailer
    error_log("📧 Attempting to send email...");
    $mail = new PHPMailer(true);

    try {
        // Configure SMTP if enabled
        if ($config['use_smtp']) {
            error_log("🔧 Configuring SMTP...");
            $mail->isSMTP();
            $mail->Host       = $config['smtp_host'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $config['smtp_username'];
            $mail->Password   = $config['smtp_password'];
            $mail->SMTPSecure = $config['smtp_secure'];
            $mail->Port       = $config['smtp_port'];
            
            if ($config['debug_mode']) {
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                $mail->Debugoutput = function($str, $level) {
                    error_log("SMTP DEBUG: $str");
                };
            }
        }

        // Set sender and recipient
        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($config['to_email']);
        
        // Add CC and BCC if provided
        if (!empty($config['cc_email'])) {
            $mail->addCC($config['cc_email']);
        }
        if (!empty($config['bcc_email'])) {
            $mail->addBCC($config['bcc_email']);
        }
        
        // Add reply-to as the customer's email if available
        if (!empty($contactEmail) && filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($contactEmail);
        }

        // Set email content
        $mail->isHTML(true);
        $mail->Subject = $emailSubject;
        $mail->Body    = $emailMessage;
        $mail->AltBody = strip_tags(str_replace(['<br>', '</p>'], ["\n", "\n\n"], $emailMessage));

        // Send the email
        if ($mail->send()) {
            error_log("✅ Email sent successfully");
            respond("Booking submitted successfully", true, true);
        } else {
            error_log("❌ Failed to send email: " . $mail->ErrorInfo);
            respond("Failed to send email notification. Please try again or contact support.", false, true);
        }
    } catch (Exception $e) {
        error_log("💥 PHPMailer exception: " . $e->getMessage());
        respond("There was a problem with the email service. Please try again later.", false, true);
    }
} else {
    respond("Invalid request method. Use POST.", false, true);
}