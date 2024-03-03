<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'POST') {

    $email = $_POST['email'];
    $password = $_POST['password'];
    $status = time() + 10;

    include_once __DIR__ . '/../function/autoload.php';

    $login = new User_View;

    $login->login($email, $password, $status);

  }