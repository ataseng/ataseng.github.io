<?php

$debug = TRUE;

if ($debug) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header('Access-Control-Allow-Methods: *');
}
else{
    header("Access-Control-Allow-Origin: https://ataseng.com");
    header("Access-Control-Allow-Headers: https://ataseng.com");
    header('Access-Control-Allow-Methods: https://ataseng.com');
}

// header('Content-Type: application/json');
header("Content-Type: application/json; charset=UTF-8");

$env = parse_ini_file('.env');

$server_name = $env["SERVER_NAME"];
$db_name = $env["DB_NAME"];
$username = $env["USERNAME"];
$password = $env["PASSWORD"];

?>