<?php

require_once('./functions.php');
require_once('./db_connection.php');
set_exception_handler("error_handler");

if (!INTERNAL){
    print("not allowing direct access");
    exit();
}

$getBody = getBodyData();

$query = "DELETE FROM cartItems";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception("query error: ". $result);
}

$commit = 'COMMIT';
mysqli_query($conn, $commit);

?>