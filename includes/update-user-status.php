<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'GET') {

    session_start();

    $user_id = $_SESSION['user_unique_id'];

    include_once __DIR__ . '/../function/autoload.php';

    $updateUserStatus = new User_Controller;

    $updateUserStatus->updateUserStatus($user_id);

  }