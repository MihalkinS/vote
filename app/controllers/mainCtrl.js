appVote.controller('mainCtrl', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

$scope.errorMessage = "";

$scope.test = function(data){

    authService.signUp(data).then(function(result){

      console.log(result);

      if(result === "ERROR") {
        $scope.errorMessage = result;
      }
      else {
        $scope.errorMessage = "";
      };

    });

};

}]);
