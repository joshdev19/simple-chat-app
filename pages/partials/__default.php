<?php
  session_start();
  if(isset($_SESSION['user_unique_id'])) {
    header('location: index.php');
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <link rel="icon" type="image/x-icon" href="../assets/images/icon.webp">
  <link rel="stylesheet" href="../assets/css/style.css">
  <script src="../assets/javascript/default.js" defer></script>
</head>
<body>
 