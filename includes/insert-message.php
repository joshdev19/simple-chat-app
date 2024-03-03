<?php

$method = $_SERVER['REQUEST_METHOD'];

if($method === 'POST') {

  $outer_message = $_POST['outer_message'];
  $inner_message = $_POST['inner_message'];
  $message = $_POST['message'];

  include_once __DIR__ . '/../function/autoload.php';

  $insertMessage = new User_Controller;

  $insertMessage->insertMessage($outer_message, $inner_message, $message);

}