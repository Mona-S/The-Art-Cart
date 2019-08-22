<?php

function error_handler($error) {
    $output = array(
        "Sucesss" => false,
        "error" => $error -> getMessage()

    );
}

?>