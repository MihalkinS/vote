<?php
  include("connection.php");

  $mapID = json_decode(file_get_contents("php://input"));

  $mapInfo = $db->query("SELECT * FROM votecompetitions WHERE id ='$mapID'");
  $mapInfo = $mapInfo->fetchAll();


  echo json_encode($mapInfo[0]);
 ?>
