<?php
require "./connect.php";

$arr = [];
$arr2 = [];
$arr3 = [];

$login = $_POST['login'];

$result = $mysqli->query("SELECT * FROM `users` WHERE `login`='$login'");

while ($row = mysqli_fetch_assoc($result)) {
  $id = $row['id'];
  if(isset($id)){
    $resultCoins = $mysqli->query("SELECT * FROM `coins` WHERE `user_id`='$id'");
    while ($coins = mysqli_fetch_assoc($resultCoins)) {
      array_push($arr2, $coins);
    }

    $resultOrders = $mysqli->query("SELECT * FROM `orders_users` WHERE `user_id`='$id'");
    while ($orders = mysqli_fetch_assoc($resultOrders)) {
      array_push($arr3, $orders);
    }
  }
  array_push($arr, $row);
  array_push($arr,$arr2);
  array_push($arr,$arr3);

}
echo json_encode($arr);




