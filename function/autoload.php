<?php

  spl_autoload_register('autoLoader');

  function autoLoader ($className) {

    // Find a way to understand this


    $path = '../cores/';
    $ext = '.class.php';

    $fullPath = $path . $className . $ext;

    require_once $fullPath;

  }