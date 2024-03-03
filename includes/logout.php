<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'POST') {

    session_start();

    $status = 'offline';
    $user_id = $_SESSION['user_unique_id'];

    include_once __DIR__ . '/../function/autoload.php';

    $logout = new User_Controller;

    $logout->logout($status, $user_id);

  }