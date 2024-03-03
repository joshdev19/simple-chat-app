<?php
  
  include_once 'partials/__header.php';
  
  if(!isset($_GET['id'])) {
    header('location: index.php');
    exit();
  }

  include_once '../function/autoload.php';

  $getUser = new User_View;
  $_SESSION['get_id'] = $_GET['id'];

?>

<div class="contents-wrapper">
  <div class="user-wrapper chat-wrapper">

    <div class="header">
      <img src="../assets/images/person.webp" alt="">
      
      <div class="content">
        <h3><?php echo $getUser->getUser($_GET['id'])['firstname']  . ' ' . $getUser->getUser($_GET['id'])['lastname'] ?></h3>
        <input type="hidden" class="input_status" value="<?php echo $_GET['id']; ?>">
        <small style="text-align:center; display: block; margin-top: 5px;" class="status"></small>
      </div>
      <button type="button" class="back"></button>
    </div>

    <div class="contacts-wrapper messages-wrapper"></div>

    <div class="send-wrapper">
      <form>

        <input type="hidden" name="outer_message" value="<?php echo $_SESSION['user_unique_id'] ?>">
        <input type="hidden" name="inner_message" value="<?php echo $_GET['id']?>">
        <textarea name="message"></textarea>
        <button type="button" class="sendButton"></button>

      </form>
    </div>

  </div>
</div>

</body>
</html>