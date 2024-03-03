<?php

  include_once 'User_Model.class.php';

  class User_Controller extends User_Model {

    public function registerValidate ($firstname, $lastname, $email, $password, $confirm_password) {

      $this->User_Register_Validate($firstname, $lastname, $email, $password, $confirm_password);

    }

    public function register ($firstname, $lastname, $email, $password, $status) {

      $this->User_Register($firstname, $lastname, $email, $password, $status);

    }
    
    public function logout ($status, $user_id) {

      $this->User_Logout($status, $user_id);

    }

    public function updateUserStatus ($user_id) {

      $this->Update_User_Status($user_id);

    }

    public function insertMessage ($outer_message, $inner_message, $message) {

      $this->Insert_Message($outer_message, $inner_message, $message);

    }

  }