<?php

function check_temp_mail($email) : bool {
    $email_domain = explode('@', $email)[1];

    $json_file = file_get_contents(__DIR__ . '/temp_mail_list.json');
    $temp_mail_list = json_decode($json_file, true);

    if(in_array($email_domain, $temp_mail_list)){
        return true;
        // http_response_code(400);
        // $response_message["message"] = "fail";
        // $response_message["detail"] = "Temp mail address detected!";
        // echo json_encode($response_message);
        // exit;
    }
    return false;
}

?>