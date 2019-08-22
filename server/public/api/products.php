<?php

use PHPMailer\PHPMailer\Exception;

require_once('./functions.php');

set_exception_handler('error_handler');

header('Content-Type: application/json');

$output = file_get_contents('./dummy-products-list.json');
print($output);

?>
