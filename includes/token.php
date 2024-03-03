<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'POST') {

    $token = $_POST['token'];

    include_once __DIR__ . '/../function/autoload.php';

    $token_login = new User_Controller;

    $token_login->token_login($token);
    
  } else {

    $data = [
      'message' => $method . 'Method Not Allowed'
    ];
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode($data);

  }