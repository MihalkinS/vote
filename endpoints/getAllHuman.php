<?php
include("connection.php");

  $users = $db->query("SELECT * FROM voteusers");
  $users = $users->fetchAll();
  echo json_encode(count($users));
 ?>
