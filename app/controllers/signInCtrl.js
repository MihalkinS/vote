appVote.controller('signInCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService){

  $scope.signInData = {
     email: "",
     password: ""
  };

  $scope.regex = {
    email: /^[_A-z0-9]+(\.[_A-z0-9]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$/,
    password: "^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ]).*$"
  };


  $scope.signIn = function(signInData, signInForm){

          authService.signIn(signInData).then(function(result){

              if(result === "error"){
                signInForm.email.$setValidity("error", false);
                return;
              };

                signInForm.email.$setValidity("error", true);
                $location.path("/");


          }, function(error){
            alert("Произошла ошибка =(");
          });


  };


}]);
