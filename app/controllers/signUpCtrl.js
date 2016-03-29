appVote.controller('signUpCtrl', ['$scope', '$location', "$timeout", 'authService', function($scope, $location, $timeout, authService){

$scope.signUpData = {
   email: "",
   password: "",
   confirmPassword: "",
   lastName: "",
   firstName:"",
   dob: ""
};


$scope.regex = {
  email: /^[_A-z0-9]+(\.[_A-z0-9]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$/,
  password: "^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ]).*$",
  firstName: "[A-Za-zА-Яа-яЁё]+",
  lastName: "[A-Za-zА-Яа-яЁё]+",
  dob: "((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1])).((1[0-2])|(0[1-9])).((19[0-9][0-9])|(20[0-9][0-9]))"
}

$scope.noEqualsPasswordsError = false;
$scope.datasend = false;

$scope.redirectToMainPage = function() {
    $location.path("/");
};

$scope.register = function(signUpData, signUpForm){

    if(signUpData.password !== signUpData.confirmPassword) {
      $scope.noEqualsPasswordsError = true;
      return;
    }
    else {
      $scope.noEqualsPasswordsError = false;
    }

     signUpForm.email.$setValidity("emailexist", true);

     signUpForm.email.$touched = true;
     signUpForm.password.$touched = true;
     signUpForm.confirmPassword.$touched = true;
     signUpForm.firstName.$touched = true;
     signUpForm.lastName.$touched = true;
     signUpForm.dob.$touched = true;

      if(signUpForm.$valid) {
        $scope.datasend = true;
        authService.signUp(signUpData).then(function(result){

            if(result === "emailExist"){
              signUpForm.email.$setValidity("emailexist", false);
              $scope.datasend = false;
              return;
            };

            if(result === "userAdded") {
              signUpForm.email.$setValidity("emailexist", true);
              $location.path("/signIn");
            };

        }, function(error){
        alert("Произошла ошибка");
        $scope.datasend = false;
        });
    }

};

}]);
