<?php

require_once('./functions.php');

if (!INTERNAL){
    print("not allowing direct access");
    exit();
}

$data = file_get_contents('php://input');
$getBody = getBodyData($data);

$id = $getBody->id;

if(gettype($id) !== "integer"){
    throw new Exception('id should be a number');
} else if(intval($id) < 1){
    throw new Exception('id should be greater than 0');
}else {
    throw new Exception('id is required');
}


// if($getBody->id) {
//     $id =$getBody->id;

// echo("id");
// echo($id);
    
//     if(intval($id) < 1){
//         throw new Exception('id should be greater than 0');
//     }
//     if(gettype($id) !== "integer"){
//         throw new Exception('id should be a number');
//     }
// } else {
//     throw new Exception('id is required');
// }

if($getBody->count){
    $count =$getBody->count;
}

if(empty($_SESSION['cartId'])){
    $cartID = false;
}
else{
    $cartID = $_SESSION['cartId'];
}

$getProductPriceQuery = "SELECT products.price FROM products WHERE products.id = {$id}";
echo($getProductPriceQuery);
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

$transactionQuery = 'START TRANSACTION';
$result2 = mysqli_query($conn, $transactionQuery);
if(!$result2){
    throw new Exception('transactionQuery error: '. mysqli_error($conn));
}

if($cartID === false){
    $cartInsertQuery = "INSERT INTO cart SET cart.created = NOW()";
    echo('insertquery ' . $cartInsertQuery);
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
echo('cartid'. $cartID);
$count = 1;
$cartItemsInsertQuery = "INSERT INTO cartItems SET cartItems.count = {$count}, cartItems.productID = {$id},
cartItems.price = {$price}, cartItems.added = NOW(), cartItems.cartID = {$cartID} 
ON DUPLICATE KEY UPDATE cartItems.count = cartItems.count + {$count}";

echo($cartItemsInsertQuery);

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