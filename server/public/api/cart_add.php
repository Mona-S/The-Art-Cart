<?php
require_once('./functions.php');

if (!defined('INTERNAL')){
    exit("not about not allowing 1. direct access");
}

$getBody = getBodyData();
$getBody = json_decode($getBody);

if(!$getBody-> productID) {
    throw new Exception('Invalid id');
}

$id = $getBody-> productID;
if(empty($_SESSION['cartId'])){
    $cartID = false;
}
else{
    $cartID = $_SESSION['cartId'];
}

$getProductPriceQuery = "SELECT * FROM cartItems
JOIN cart ON cart.cartID = cartIems.cartID";



?>