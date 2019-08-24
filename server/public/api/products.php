<?php

require_once('./functions.php');
set_exception_handler('error_handler');
set_error_handler('error_handler');

startup();

require_once('./db_connection.php');

if(empty($_GET['id'])){
  $whereClause = '';
} else{
  $whereClause = "WHERE id = " . $_GET['id'];
}

$query = "SELECT * FROM `products`" .$whereClause;
$result = mysqli_query($conn, $query);

if(!$result){
  throw new Exception(mysqli_connect_error());
}

$output = array();

while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
};
print(json_encode($output));

?>
