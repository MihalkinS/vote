<?php
  include("connection.php");

  $votes = $db->query("SELECT * FROM votevote");
  $votes = $votes->fetchAll();

  $competitions = $db->query("SELECT id FROM votecompetitions");
  $competitions = $competitions->fetchAll();

  $results;

  foreach ($competitions as $competiton) {
    $competitonID = $competiton['id'];
    $votedCount = $db->query("SELECT COUNT(*) FROM votevote WHERE mapID='$competitonID'");
    $votedCount = $votedCount->fetchAll();

    $results[$competitonID] = $votedCount[0][0];
    //$results[$competitonID]['id'] = $competitonID;
    //$results[$competitonID]['count'] = $votedCount[0][0];
  };

  echo json_encode($results);

 ?>
