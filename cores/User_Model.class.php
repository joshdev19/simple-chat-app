<?php

  class User_Model extends Database {

    protected function User_Register_Validate ($firstname, $lastname, $email, $password, $confirm_password) {

      if
      (
        empty($firstname) &&
        empty($lastname) &&
        empty($email) &&
        empty($password)
      ) 
      {
        
       echo 'Fields';

       exit();

      }
      else {

        if(empty($firstname)) {
          
          echo 'Firstname';

          exit();
        
        } else {

          if(preg_match_all('/\W|\d/', $firstname)) {
  
            echo 'FirstLetters'; 
            
          }

        }

        if(empty($lastname)) {
          
          echo 'Lastname';
        
        } else {

          if(preg_match_all('/\W|\d/', $lastname)) {
  
            echo 'LastLetters'; 
            
          }

        }
  
        if(empty($email)) {

          echo 'Email';

        }
        else {

          if(strlen($email) === 10) {

            echo 'E_Invalid';

          } else {

            define('email', $email, false);
  
            $ext = ['@gmail.com', '@yahoo.com'];
  
            function getExt ($ext) {
  
              if($ext === substr(email, -10)) {
  
                return $ext;
  
              }
  
            }
  
            $extResult = array_filter($ext, 'getExt');
  
            if(!$extResult) {
              
              echo 'E_Invalid';
  
            } else {
              
              $checkEmail = $this->connect()->prepare("SELECT users.email, users.password FROM users WHERE users.email = ?");
              $checkEmail->execute([$email]);
              $result = $checkEmail->fetch();
    
              if($result) {
    
                echo 'Taken';
                
              }
  
            }

          }

        }
  
        if(empty($password)) {

          echo 'Password';
          
        } else {

          if($password !== $confirm_password) {

            echo 'NotMatched';
            
          }

        }

      }

    }

    protected function User_Register ($firstname, $lastname, $email, $password, $status) {

      session_start();

      $user_id = uniqid('user_id');

      $passwordHash = password_hash($password, PASSWORD_DEFAULT);

      $register = $this->connect()->prepare("INSERT INTO users ( user_id, firstname, lastname, email, password, status ) VALUES (?, ?, ?, ?, ?, ? )");
      $register->execute([$user_id, $firstname, $lastname, $email, $passwordHash, $status]);

      $_SESSION['user_unique_id'] = $user_id;

      echo 'RegisteredSuccessfully';

      $register = null;

      exit();

    }

    protected function User_Logout ($status, $user_id) {
      
      $update = $this->connect()->prepare("UPDATE users SET users.status = ? WHERE users.user_id = ?");
      $update->execute([$status, $user_id]);
      session_unset();
      session_destroy();

      echo 'loggedOut';

      $update = null;

      exit();

    }

    protected function Insert_Message ($outer_message, $inner_message, $message) {

      $insert_message = $this->connect()->prepare("INSERT INTO messages (outer_message_id,	inner_message_id,	messages) VALUES (?, ?, ?)");
      $insert_message->execute([$outer_message, $inner_message, $message]);

      echo 'sent';

      $inner_message = null;

      exit();

    }

    // Views

    protected function User_Login ($email, $password, $status) {

      if
      (
        empty($email) &&
        empty($password)
      )
      {

        echo 'Fields';
        exit();

      }
      else {

        if(strlen($email) === 10) {

          echo 'E_Invalid';
          echo 'Password';

          exit();

        } else {

          $ext = ['@gmail.com', '@yahoo.com'];
  
          define('email', $email, false);
  
          function validateExt ($data) {
  
            if($data === substr(email, -10)) {
  
              return $data;
  
            }
  
          }
  
          $result = array_filter($ext, 'validateExt');
  
          if(!$result) {
  
            echo 'E_Invalid';
            echo 'Password';
            exit();
  
          } else {
  
            $checkEmail = $this->connect()->prepare("SELECT users.email, users.password FROM users WHERE users.email = ?");
            $checkEmail->execute([$email]);
            $dataEmail = $checkEmail->fetch();

            if(!$dataEmail) {

              echo 'notYetRegistered';
              echo 'Password';
              exit();

            }

            $passwordUnHash = password_verify($password, $dataEmail['password']);

            if(!$passwordUnHash) {

              echo 'Wrong';
              exit();

            }
  
            $check = $this->connect()->prepare("SELECT * FROM users WHERE users.email = ? AND users.password = ?");
            $check->execute([$email, $dataEmail['password']]);
            $data = $check->fetch();
    
            if(!$data) {
  
              echo 'Wrong';
              exit();

            }

            $update = $this->connect()->prepare("UPDATE users SET users.status = ? WHERE users.user_id = ?");
            $update->execute([$status, $data['user_id']]);

            session_start();      
            $_SESSION['user_unique_id'] = $data['user_id'];

            echo 'loggedIn';
      
            $check = null;
            exit();
  
          }

        }

      }

    }

    protected function Get_User ($user_id) {

      $check = $this->connect()->prepare("SELECT users.user_id, users.firstname, users.lastname, users.status FROM users WHERE users.user_id = ?");
      $check->execute([$user_id]);
      $data = $check->fetch();
      
      if(!$data) {
        echo 'Error!';
        exit();
      }

      return $data;

      $check = null;
      exit();

    }

    protected function Update_User_Status ($user_id) {

      $time = time() + 10;

      $update = $this->connect()->prepare("UPDATE users SET users.status = ? WHERE users.user_id = ?");
      $update->execute([$time, $user_id]);

      $update = null;

      exit();

    }

    protected function Check_User_Status ($user_id) {

      $time = time();

      $checkStatus = $this->connect()->prepare("SELECT users.status FROM users WHERE users.user_id = ?");
      $checkStatus->execute([$user_id]);
      $status = $checkStatus->fetch();

      if($status['status'] > $time) {
        $newStatus = 'active';
      } else {
        $newStatus = 'offline';
      }

      return $newStatus;

      $checkStatus = null;

      exit();

    }

    protected function Get_Users ($user_id) {

      $check = $this->connect()->prepare("SELECT users.user_id, users.firstname, users.lastname, users.status FROM users");
      $check->execute();
      $datas = $check->fetchAll();
      $output = '';

      if(!$datas) {
        echo 'Error!';
        exit();
      }

      foreach($datas as $data) {

        if($data['status'] > time()) {
          $color = 'green';
        }
        else {
          $color = 'gray';
        }

        if($data['user_id'] !== $user_id) {

          $output .= '<a href="chat.php?id='.$data['user_id'].'" class="user">
                    <img src="../assets/images/person.webp" alt="">
                    
                      <div class="text-wrapper">
                        <h3>'.$data['firstname'].' '.$data['lastname'].'</h3>
                      </div>
                    
                    <div class="indicator '.$color.'"></div>
                  </a>';

        }

      }

      echo $output;

      $check = null;
      exit();

    }

    protected function Get_Messages ($outer_id, $inner_id) {

      $getMessages = $this->connect()->prepare("SELECT * FROM messages WHERE messages.outer_message_id = ? AND messages.inner_message_id = ? OR messages.outer_message_id = ? AND messages.inner_message_id = ? ORDER BY messages.id ASC");
      $getMessages->execute([$outer_id, $inner_id, $inner_id, $outer_id]);
      $datas = $getMessages->fetchAll();
      $output = '';

      foreach($datas as $data) {


        if($data['outer_message_id'] === $outer_id) {

          $output = '<div class="chats inner-message" id="'.$data['id'].'">
                      <p>'.$data['messages'].'</p>
                    </div>';

        } else {

          $output = '<div class="chats outer-message" id="'.$data['id'].'">
                      <p>'.$data['messages'].'</p>
                    </div>';
        }

        echo $output;

      }

    }

  }