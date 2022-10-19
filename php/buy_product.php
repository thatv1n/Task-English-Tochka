<?php
require "./connect.php";

$id_user = $_POST['id_user'];
$id_product = $_POST['id_product'];
$price =  '-' . $_POST['price'];

$arrCoins = [];

if(isset($id_user) && isset($id_product)){
  $result = $mysqli->query("INSERT INTO `orders_users` (`product_id`, `user_id`) VALUES ($id_product, $id_user)");
  $result = $mysqli->query("INSERT INTO `coins` (`id`, `user_id`, `price`, `action`) VALUES (NULL, $id_user, $price, 'buy')");
  if($result){
    echo true;
  }

}


