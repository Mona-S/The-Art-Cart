<?php

use PHPMailer\PHPMailer\Exception;

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

if(!$cartID){
    $result = mysqli_query($conn, $cartInsert);
    if(mysqli_affected_rows($conn) != 1){
        throw new Exception('unable to retrieve cart');
    }
    $cartID = mysqli_insert_id($conn);
    $_SESSION ['cartId'] = $cartID;
}

$productData['productID'] = $id;
$productData['cartID'] = $cartID;

$cartItemsInsert = "INSERT INTO cartItems(productID, count, added, cartID)
VALUES (". $id .", 1, NOW(), ". $cartID . ") ON DUPLICATE KEY UPDATE 
count = count + 1";

$fullResult = mysqli_query($conn, $cartItemsInsert);
$count = 1;

if(mysqli_affected_rows($conn) < 1){
    mysqli_query($conn, "ROLLBACK");
    throw new Exception('Something went wrong');
}

$commit = mysqli_query($conn, "COMMIT");
print(json_encode($productData));











?>