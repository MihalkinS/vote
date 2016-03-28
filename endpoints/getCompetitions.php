<?php
  include("connection.php");

    $competitions = $db->query("SELECT * FROM votecompetitions");
    $competitions = $competitions->fetchAll();
    echo json_encode($competitions);

 ?>
