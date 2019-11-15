<?php

require_once('./functions.php');
set_exception_handler('error_handler');
set_error_handler('error_handler');

startup();

require_once('./db_connection.php');

if(empty($_GET['id'])){
  $whereClause = '';
} 
else {
  $whereClause = "WHERE products.id = " . $_GET['id'];
  $id = $_GET['id'];

  if(!is_numeric($_GET['id'] )){
   throw new Exception('id needs to be a number');
  }
}

$query = "SELECT products.id, products.name, products.price,GROUP_CONCAT(images.image) as image , products.short_description 
FROM products JOIN images ON products.id = images.product_id " .$whereClause 
 ." GROUP BY products.id " ;

$result = mysqli_query($conn, $query);

if(!mysqli_num_rows($result)){
  throw new Exception('Invalid ID: '.$id);
}

if(!$result){
  throw new Exception(mysqli_connect_error());
} else if(!mysqli_num_rows($result) && !empty($GET['id'])){
  throw new Exception('Invalid ID: ' .$GET['id']);
}


$output = array();

while ($row = mysqli_fetch_assoc($result)) {
  $row['image'] = explode(",", $row['image']);
  $output[] = $row;
};
// echo('here'.json_encode($output));

if(!empty($id)){
  print(json_encode($output[0]));
}
else{
  print(json_encode($output));
}


?>
