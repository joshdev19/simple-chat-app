<?php

  class Database {

    protected function connect () {

      try {

        $username = 'root';
        $database = new PDO('mysql:host=localhost; dbname=chatapp', 'root', '123');
        return $database;

      } catch (PDOException $e) {
        
        print 'Error: ' . $e->getMessage();

      }

    }
    
  }