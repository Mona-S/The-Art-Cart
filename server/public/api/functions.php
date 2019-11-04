<?php

function error_handler($error) {
    $output = array(
        "Sucesss" => "false",
        "error" => $error -> getMessage(),
    );

    http_response_code(500);

    $json_output = json_encode($output);
    print($json_output);
}

function startup() {
    header('Content-Type: application/json');
}

function getBodyData() {
    $results = file_get_contents('php://input');
    $results = json_decode($results);
    return json_encode($results);
}

?>