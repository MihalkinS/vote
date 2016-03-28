<?php
  include("connection.php");

  $mapID = json_decode(file_get_contents("php://input"));

  $groups = $db->query("SELECT * FROM votegroups");
  $groups = $groups->fetchAll();

  foreach ($groups as $group) {
    
    $groupID = $group['id'];
    $vote= $db->query("SELECT COUNT(id), SUM(info), SUM(place), SUM(map), SUM(print), SUM(sealed), SUM(distance), SUM(start), SUM(finish), SUM(results), SUM(center) FROM votevote WHERE mapID='$mapID' AND groupID='$groupID'");
    $vote = $vote->fetchAll();
    $results[$group['name']]['name'] = $group['name'];
    $results[$group['name']]['count'] = $vote[0][0];
    $results[$group['name']]['info'] = $vote[0][1];
    $results[$group['name']]['place'] = $vote[0][2];
    $results[$group['name']]['map'] = $vote[0][3];
    $results[$group['name']]['print'] = $vote[0][4];
    $results[$group['name']]['sealed'] = $vote[0][5];
    $results[$group['name']]['distance'] = $vote[0][6];
    $results[$group['name']]['start'] = $vote[0][7];
    $results[$group['name']]['finish'] = $vote[0][8];
    $results[$group['name']]['results'] = $vote[0][9];
    $results[$group['name']]['center'] = $vote[0][10];

  }

  echo json_encode($results);

 ?>
