<?php

require_once('./functions.php');
set_exception_handler('error_handler');
set_error_handler('error_handler');

startup();

require_once('./db_connection.php');
header('Content-Type: application/json');

$query = "SELECT * FROM `products`";
$result = mysqli_query($conn, $query);

if(!$result){
  throw new Exception(mysqli_connect_error());
}

$output = array("Success" => true,
"data"=> []);

while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
};
print(json_encode($data));

?>
