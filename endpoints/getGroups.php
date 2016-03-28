<?php
  include("connection.php");

  $groups = $db->query("SELECT * FROM votegroups");
  $groups = $groups->fetchAll();


  echo json_encode($groups);
 ?>
