appVote.controller('mainCtrl', ['$scope', '$location', '$window', 'authService', 'voteService', function ($scope, $location, $window, authService, voteService) {

$scope.errorMessage = "";

$scope.auth = authService.auth;

$scope.votedCountMass = {};
$scope.allCountOfHumans = 0;

  voteService.getAllHumans().then(function(result){
    $scope.allCountOfHumans = result;
  });

  voteService.getVotedHumans().then(function(result){
    $scope.votedCountMass = result;
  });


$scope.reloadPage = function(){
  voteService.getVotedHumans().then(function(result){
    $scope.votedCountMass = result;
  });
}

  $scope.competitions = [];
  voteService.getCompetitions().then(function(result){
    $scope.competitions = result;
  });

  $scope.signOut = function(){
    authService.signOut();
    $location.path('/');
  };



}]);
