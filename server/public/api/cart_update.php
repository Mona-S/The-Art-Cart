<?php

require_once('./functions.php');
require_once('./db_connection.php');
set_exception_handler("error_handler");

if (!INTERNAL){
    print("not allowing direct access");
    exit();
}

$getBody = getBodyData();
$id = intval($getBody['id']);

$newCount = intval($getBody['newCount']);

if($id < 1){
    throw new Exception('id must be greater than 0');
}

if($newCount == 0){
    $query = "DELETE FROM cartItems WHERE productID = {$id}";

    } else {
        $query  = "UPDATE `cartItems` SET `cartItems`.`count` = {$newCount} 
        WHERE  `cartItems`.`productID` = {$id}";
            
    }
$result2 = mysqli_query($conn, $query);

if(!$result2){
    throw new Exception("query error: ". $result2);
}
    
$commit = 'COMMIT';
mysqli_query($conn, $commit);

?>