<?php

  $method = $_SERVER['REQUEST_METHOD'];

  if($method === 'POST') {

    $firstname = strtolower($_POST['firstname']);
    $lastname = strtolower($_POST['lastname']);
    $email = strtolower($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['cpassword'];
    $status = time() + 10;

    include_once __DIR__ . '/../function/autoload.php';

    $register = new User_Controller;

    $register->register($firstname, $lastname, $email, $password, $status);

  }