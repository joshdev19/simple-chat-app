<?php

  include_once 'User_Model.class.php';

  class User_View extends User_Model {

    public function login ($email, $password, $status) {

      $this->User_Login($email, $password, $status);

    }

    public function getUser ($user_id) {

      return $this->Get_User($user_id);

    }

    public function getUsers ($user_id) {

      return $this->Get_Users($user_id);

    }

    
    public function checkUserStatus ($user_id) {

      return $this->Check_User_Status($user_id);

    }

    public function getMessages ($outer_id, $inner_id) {

      return $this->Get_Messages($outer_id, $inner_id);

    }

  }