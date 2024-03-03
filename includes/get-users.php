<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'POST') {

    session_start();

    $user_id = $_SESSION['user_unique_id'];

    include_once __DIR__ . '/../function/autoload.php';

    $getUsers = new User_View;

    $getUsers->getUsers($user_id);

  }