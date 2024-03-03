<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'POST') {

    $data = file_get_contents('php://input');
    $decoded = json_decode($data, true);

    include_once __DIR__ . '/../function/autoload.php';

    $checkUserStatus = new User_View;

    echo $checkUserStatus->checkUserStatus($decoded['id']);

  }