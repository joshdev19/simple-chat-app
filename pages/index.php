<?php 
  include_once 'partials/__header.php';
  include_once '../function/autoload.php';
  $user = new User_View;
?>

<div class="contents-wrapper">
  <div class="user-wrapper">

    <div class="header">
      <img src="../assets/images/person.webp" alt="">
      <div class="content">
        <h3><?php echo $user->getUser($_SESSION['user_unique_id'])['firstname'] . ' ' . $user->getUser($_SESSION['user_unique_id'])['lastname'] ?></h3>
        <small style="text-align:center; display: block; margin-top: 5px;">active</small>
      </div>
      <button type="button" class="logoutButton"></button>
    </div>

    <div class="contacts-wrapper"></div>

  </div>
</div>

</body>
</html>