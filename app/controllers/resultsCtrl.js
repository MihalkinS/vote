appVote.controller('resultsCtrl', ['$scope', '$location', 'authService', 'voteService', '$routeParams', function($scope, $location, authService, voteService, $routeParams){

$scope.mapID = $routeParams.mapID;

$scope.results = {};

voteService.getMapInfo($scope.mapID).then(function(result){
    $scope.mapInfo = result;
});

voteService.getResultsByMap($scope.mapID).then(function(result){

    for (var r in result) {

      if(result[r].count !== "0"){
        $scope.results[result[r].name] = result[r];
      };

    };
    console.log($scope.results);
});

}]);
