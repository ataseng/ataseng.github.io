<?php

declare(strict_types=1);

// TODO Delete local host

function cors_preflight(): void {
    if(DEBUG_STATUS){
        // header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Origin: http://localhost:3000");
    }
    else{
        header("Access-Control-Allow-Origin: " . FRONTEND_ORIGIN);
    }
    header("Access-Control-Allow-Credentials: true"); // cookie için şart
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token");
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
}

function cors_headers(): void {
    if(DEBUG_STATUS){
        // header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Origin: http://localhost:3000");
    }
    else{
        header('Access-Control-Allow-Origin: ' . FRONTEND_ORIGIN);
    }
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');
}

?>