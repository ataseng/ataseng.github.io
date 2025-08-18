<?php

$json_file = file_get_contents(dirname(__FILE__).'/temp_mail_list.json');
$temp_mail_list = json_decode($json_file, true);

$email_domain = explode('@', $email)[1];

if(in_array($email_domain, $temp_mail_list)){
    http_response_code(400);
	$response_message["message"] = "fail";
	$response_message["detail"] = "Temp mail address detected!";
    echo json_encode($response_message);
    exit;
}

?>