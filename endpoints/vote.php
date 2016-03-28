<?php
  include("connection.php");

  $data = json_decode(file_get_contents("php://input"));

  $token = $data->token;

  $checkAuth = $db->query("SELECT id FROM voteusers WHERE token='$token'");
	$checkAuth = $checkAuth->fetchAll();

	if (count($checkAuth) == 1){

      $qVote = "INSERT INTO votevote (info, place, map, print, sealed, distance, start, finish, results, center, userID, mapID, groupID) VALUES (:info, :place, :map, :print, :sealed, :distance, :start, :finish, :results, :center, :userID, :mapID, :groupID)";
      $query = $db->prepare($qVote);
      $execute = $query->execute(array(
          ":info" => $data->info,
          ":place" => $data->place,
          ":map" => $data->map,
          ":print" => $data->print,
          ":sealed" => $data->sealed,
          ":distance" => $data->distance,
          ":start" => $data->start,
          ":finish" => $data->finish,
          ":results" => $data->results,
          ":center" => $data->center,
          ":mapID" => $data->mapID,
          ":userID" => $data->userID,
          ":groupID" => $data->groupID
      ));

      echo "voted";
/*    $qUserCompetitionGroup = "INSERT INTO usercompetitiongroup (competitionsid, votegroupsid, voteusersid) VALUES (:competitionsid, :votegroupsid, :voteusersid)";
    $query = $db->prepare($qUserCompetitionGroup);
    $execute = $query->execute(array(
        ":competitionsid" => $data->mapID,
        ":votegroupsid" => $data->groupID,
        ":voteusersid" => $data->userID,
        ":print" => $data->print
    ));
*/
	} else {
		echo "unauthorized";
	}

 ?>
