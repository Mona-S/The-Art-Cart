<?php

function error_handler($error) {
    $output = array(
        "Success" => "false",
        "error" => $error -> getMessage(),
    );

    http_response_code(500);

    $json_output = json_encode($output);
    print($json_output);
}

function startup() {
    header('Content-Type: application/json');
}

function getBodyData(){
    $getBody = file_get_contents('php://input');
    $phpArray = json_decode($getBody,true); //,true//
    return $phpArray;
}

?>