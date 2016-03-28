<?php

  include("connection.php");

  $data = json_decode(file_get_contents("php://input"));

  $checkVoteExist = $db->query("SELECT * FROM votevote WHERE userID='$data->userID' AND mapID='$data->mapID'");
  $checkVoteExist = $checkVoteExist->fetchAll();

  if(count($checkVoteExist) == 1){
    echo "voteExist";
  }
  else {
    echo "empty";
  }

 ?>
