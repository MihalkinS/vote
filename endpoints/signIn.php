<?php
include("connection.php");
$data = json_decode(file_get_contents("php://input"));

class User
{
  public $id, $email, $token;
}

$password = sha1($data->password);
$email = $data->email;

$userInfo = $db->query("SELECT id, email FROM voteusers WHERE email='$email' AND password='$password'");
$userInfo = $userInfo->fetchAll();

$token;

    if (count($userInfo) == 1){
        //This means that the user is logged in and let's givem a token :D :D :D
        $token = $email . " | " . uniqid() . uniqid() . uniqid();

        $q = "UPDATE voteusers SET token=:token WHERE email=:email AND password=:password";
        $query = $db->prepare($q);
        $execute = $query->execute(array(
        ":token" => $token,
        ":email" => $email,
        ":password" => $password
        ));



        $user = new User();
        $user->email = $userInfo[0]['email'];
        $user->id = $userInfo[0]['id'];
        $user->token = $token;

        echo json_encode($user);
    }
    else {
        echo "error";
    }

 ?>
