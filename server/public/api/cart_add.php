<?php

if (defined('INTERNAL')){
    exit("not about not allowing 1. direct access");
}

$id = getBodyData();

if( intval ($id) <= 0) {
    throw new Exception('incorrect product');
}