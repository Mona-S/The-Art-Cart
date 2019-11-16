<?php

require_once('./functions.php');
require_once('./db_connection.php');

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

$query = "SELECT a.count, a.price, b.name, b.short_description, c.image 
FROM cartItems a, products b, images c 
WHERE a.productID = b.id AND b.id = c.product_id AND a.cartID = $cartId";

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
?>