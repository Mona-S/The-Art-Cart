<?php

require_once('./functions.php');
require_once('./db_connection.php');

if(!INTERNAL){
    print("not allowing direct access");
    exit();
}

$getBody = getBodyData();
$id = intval($getBody["id"]);

echo($id);

// if(gettype($id) === "string"){ //use isnumeric//
//     throw new Exception('id should be a number');
// } 
// if(intval($id) <= 0){
//     throw new Exception('id should be greater than 0');
// } 


if(empty($_SESSION['cartId'])){
    $cartID = false;
}
else{
    $cartID = $_SESSION['cartId'];
}

$getProductPriceQuery = "SELECT products.price FROM products WHERE products.id = {$id}";

$result1 = mysqli_query($conn, $getProductPriceQuery);


if(!$result1) {
    throw new Exception(mysqli_error($conn));
}

$productData = [];

while ($row = mysqli_fetch_assoc($result1)) {
    $productData[] = $row;
    $price = $productData[0]['price'];
};

if($productData === []){
    throw new Exception('Not a valid product id:'. $id);
}

echo($id. $cartID);

$transactionQuery = 'START TRANSACTION';
$result2 = mysqli_query($conn, $transactionQuery);
if(!$result2){
    throw new Exception('transactionQuery error: '. mysqli_error($conn));
}

if($cartID === false){
    $cartInsertQuery = "INSERT INTO cart SET cart.created = NOW()";
    
    $result3 = mysqli_query($conn, $cartInsertQuery);
    if(!$result3){
        throw new Exception('cartInsertQuery error: '. mysqli_error($conn));
    }
    if(mysqli_affected_rows($conn) != 1){
        throw new Exception('only 1 row should be affected');
    }
    $cartID = mysqli_insert_id($conn);
    $_SESSION ['cartId'] = $cartID;
    
}

// $count = 1;
// $cartItemsInsertQuery = "INSERT INTO cartItems SET cartItems.count = {$count}, cartItems.productID = {$id},
// cartItems.price = {$price}, cartItems.added = NOW(), cartItems.cartID = {$cartID} 
// ON DUPLICATE KEY UPDATE cartItems.count = cartItems.count + {$count}";

$cartItemsInsertQuery = "INSERT INTO `cartItems` (`productID`, `count`, `price`, `added`, `cartID`)
VALUES ($id, '1', $price, NOW(), $cartID) 
ON DUPLICATE KEY UPDATE `count` = `count` + 1";


$result4 = mysqli_query($conn, $cartItemsInsertQuery);
if(!$result4){
    throw new Exception('cartItemsInsertQuery error: '. mysqli_error($conn));
}


if(mysqli_affected_rows($conn) < 1){
    $rollback = 'ROLLBACK';
    mysqli_query($conn, $rollback);
    throw new Exception('normal');
} else{
    $commit = 'COMMIT';
    mysqli_query($conn, $commit);
}



?>