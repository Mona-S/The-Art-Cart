<?php
require_once('./functions.php');

if (!defined('INTERNAL')){
    exit("not about not allowing 1. direct access");
}

$getBody = json_decode(getBodyData());

if(!$getBody->productID) {
    throw new Exception('Invalid id');
}

$id = $getBody->productID;
if(empty($_SESSION['cartId'])){
    $cartID = false;
}
else{
    $cartID = $_SESSION['cartId'];
}

$getProductPriceQuery = "SELECT * FROM cartItems
JOIN cart ON cart.id = cartItems.cartID
RIGHT JOIN products ON products.id = cartItems.productID
WHERE products.id = {$id}";

$result = mysqli_query($conn, $getProductPriceQuery);

if(!$result) {
    throw new Exception(mysqli_error($conn));
}

$output = array();

while ($row = mysqli_fetch_assoc($result)) {
    $id = $row['id'];
    $output[] = $row;
};

$productData = $output;

$transactionQuery = mysqli_query($conn, "START TRANSACTION");
$cartInsert = "INSERT INTO cart SET created = NOW()";








?>