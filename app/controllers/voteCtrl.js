appVote.controller('voteCtrl', ['$scope', '$location', 'authService', 'voteService', '$routeParams', function($scope, $location, authService, voteService, $routeParams){

  $scope.$on("$routeChangeError", function(evt,current,previous,rejection){
    if(rejection === "voteExist"){
      $location.path("/vote/" + $scope.mapID);
    };
  });


$scope.userID = $routeParams.userID;
$scope.mapID = $routeParams.mapID;

  voteService.getMapInfo($scope.mapID).then(function(result){
      $scope.mapInfo = result;
  });

$scope.voteData = {
    groupID: '',
    info: "1",
    place: "1",
    map: "1",
    print: "1",
    sealed: "0",
    distance: "1",
    start: "1",
    finish: "1",
    results: "1",
    center: "1",
    userID: $scope.userID,
    mapID: $scope.mapID

};

voteService.getGroups().then(function(result) {
  console.log(result);
    $scope.groups = result;
  });

$scope.datasend = false;

$scope.vote = function(voteData, voteForm){

    if(voteForm.$valid) {
          $scope.datasend = true;
            voteService.vote(voteData).then(function(result){
              $location.path("/vote/" + $scope.mapID);
            }, function(error){
              $scope.datasend = false;
            });
    };
};

}]);
