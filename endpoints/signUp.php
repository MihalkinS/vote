<?php

    include("connection.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;
    $lastName = $data->lastName;
    $firstName = $data->firstName;
    $dob = $data->dob;

    $checkEmail = $db->query("SELECT * FROM users WHERE email='$email'");
	  $checkEmail = $checkEmail->fetchAll();

	if (count($checkEmail) == 1) {
		echo "emailExist";
	}
  else {
    $q = "INSERT INTO users (email, password, firstName, lastName, dob, token) VALUES (:email, :password, :firstName, :lastName, :dob, :token)";
    $query = $db->prepare($q);
    $execute = $query->execute(array(
        ":email" => $email,
        ":password" => sha1($password),
        ":firstName" => $firstName,
        ":lastName" => $lastName,
        ":dob" => $dob,
        ":token" => "EMPTYTOKEN"
    ));
    echo "userAdded";
	}



    //echo json_encode($username);


 ?>
