<?php

require_once('./functions.php');
require_once('./db_connection.php');
set_exception_handler("error_handler");

if (!INTERNAL){
    print("not allowing direct access");
    exit();
}

if(empty($_SESSION['cartId'])) {
    print(json_encode([]));
    exit();
} else{
    $cartId = intval($_SESSION['cartId']);
}

$query = "SELECT a.productID, a.count, a.price, b.name, b.short_description, c.image 
FROM cartItems a, products b, images c 
WHERE a.productID = b.id AND b.id = c.product_id AND a.cartID = $cartId";

// $query = "SELECT cartItems.count, products.id, products.name, products.price, products.image, products.shortDescription FROM `cartItems`
//           JOIN `products` ON cartItems.productID = products.id";


$result = mysqli_query($conn, $query);
$productData = [];

while($row = mysqli_fetch_assoc($result)) {
    $productData[] = $row;

}

if($productData === []){
    print("[]");
    exit();

} else{
    print(json_encode($productData));
}

$commit = 'COMMIT';
mysqli_query($conn, $commit);

?>