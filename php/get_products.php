<?php
require "./connect.php";

$arr = [];

$result = $mysqli->query("SELECT * FROM `products` ");

while ($orders = mysqli_fetch_assoc($result)) {
  array_push($arr, $orders);
}

echo json_encode($arr);
