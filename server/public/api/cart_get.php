<?php

require_once('./functions.php');

if (!INTERNAL){
    print("not allowing direct access");
    exit();
}

if(empty($_SESSION['cartId'])) {
    print_r(getBodyData([]));
    exit();
} else{
    $cartId = intval($_SESSION['cartId']);
}

$query = "SELECT a.count, a.price, b.name, b.short_description, c.image FROM cartItems a, products b, images c 
WHERE a.productID = b.id AND b.id = c.product_id AND a.cartID = $cartId";

$result = mysqli_query($conn, $query);
$output = [];

while($row = mysqli_fetch_assoc($result)) {
    $output[] = $row;

}

if($output === []){
    print("[]");
    exit();

} else{
    print(json_encode($output));
}
?>