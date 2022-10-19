<?php
require "./connect.php";

$id_user = $_POST['id_user'];
$id_product = $_POST['id_product'];
$price =  '-' . $_POST['price'];
$rand = 'buy' . random_int(1, 9999);

$arrCoins = [];

if(isset($id_user) && isset($id_product)){
  $result = $mysqli->query("INSERT INTO `orders_users` (`product_id`, `user_id`) VALUES ($id_product, $id_user)");
  $result1 = $mysqli->query("INSERT INTO `coins` (`id`, `user_id`, `price`, `action`) VALUES (NULL, '$id_user', '$price','$rand')");
  if($result1 && $result){
    echo true;
  }

}


