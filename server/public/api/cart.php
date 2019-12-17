<?php
require_once('./functions.php');
require_once('./db_connection.php');

session_start();
startup();

set_exception_handler('error_handler');
define("INTERNAL", true);

$method = $_SERVER['REQUEST_METHOD'];
if($method == 'POST'){
  require_once('./cart_add.php');
} else if($method == 'GET'){
  require_once('./cart_get.php');
} else if($method == 'PUT'){
  require_once('./cart_update.php');
} else{
  http_response_code(404);
  print(json_encode(['error' => 'Not Found', 'message' => 'cannot find $method /api/cart.php']));
}

?>


