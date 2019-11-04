<?php

define('INTERNAL', true);

require_once('./functions.php');
session_start();

set_error_handler('error_handler');
require_once('./db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
  require_once('./cart_add.php');
}else {
  require_once('./cart_get.php');
};






// header('Content-Type: application/json');

// $method = $_SERVER['REQUEST_METHOD'];
// $item = file_get_contents('php://input');

// if ($method == 'GET') {
//   readfile('dummy-cart-items.json');
// } else if ($method == 'POST') {
//   http_response_code(201);
//   print($item);
// } else {
//   http_response_code(404);
//   print(json_encode([
//     'error' => 'Not Found',
//     'message' => "Cannot $method /api/cart.php"
//   ]));
// }

?>
