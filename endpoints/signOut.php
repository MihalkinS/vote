<?php

  include('connection.php');

  $data = json_decode(file_get_contents("php://input"));
  $token = $data->token;
  $db->query("UPDATE voteusers SET token='EMPTYTOKEN' WHERE token=$token");

  echo "success";

 ?>
