<?php

$method = $_SERVER['REQUEST_METHOD'];

if($method === 'POST') {

  session_start();

  $outer_id =  $_SESSION['user_unique_id'];
  $inner_id = $_SESSION['get_id'];

  include_once __DIR__ . '/../function/autoload.php';

  $getMessages = new User_View;

  $getMessages->getMessages($outer_id, $inner_id);

}