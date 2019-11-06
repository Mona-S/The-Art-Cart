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


function getBodyData($json){
    $phpObj = json_decode($json);
    return $phpObj;
}

// function getBodyData() {
//     $result = file_get_contents('php://input');
//     $result = json_decode($result);
//     return json_encode($result);
// }

?>