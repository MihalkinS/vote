appVote.controller('resultsCtrl', ['$scope', '$location', 'authService', 'voteService', '$routeParams', function($scope, $location, authService, voteService, $routeParams){

$scope.mapID = $routeParams.mapID;

$scope.results2 = {};
$scope.results = {
  young: {
    count: 0,
    info: 0,
    place: 0,
    map: 0,
    print: 0,
    distance: 0,
    sealed: 0,
    start: 0,
    finish: 0,
    results: 0,
    center: 0,
    middle: 0
  },
  adults: {
    count: 0,
    info: 0,
    place: 0,
    map: 0,
    print: 0,
    distance: 0,
    sealed: 0,
    start: 0,
    finish: 0,
    results: 0,
    center: 0,
    middle: 0
  },
  old: {
    count: 0,
    info: 0,
    place: 0,
    map: 0,
    print: 0,
    distance: 0,
    sealed: 0,
    start: 0,
    finish: 0,
    results: 0,
    center: 0,
    middle: 0
  }
};

voteService.getMapInfo($scope.mapID).then(function(result){
    $scope.mapInfo = result;
});

voteService.getResultsByMap($scope.mapID).then(function(result){

      console.log(result);

    for (var group in result) {

      if(result[group]["count"] == 0) continue;

      var groupNumber;
      groupNumber = group[1] + group[2];


      if(groupNumber <= "20"){
        for (var property in result[group]) {
          $scope.results["young"][property] = $scope.results["young"][property] + parseFloat(result[group][property]);
        }
      };

      if(groupNumber === "21"){
        for (var property in result[group]) {
          $scope.results["adults"][property] = $scope.results["adults"][property] + parseFloat(result[group][property]);
        }
      };

      if(groupNumber >= "35"){
        for (var property in result[group]) {
          $scope.results["old"][property] = $scope.results["old"][property] + parseFloat(result[group][property]);
        }
      };

      groupNumber = '';

    };
  if($scope.results["young"]["count"] != 0) {
    $scope.results["young"]["middle"] = ( parseFloat($scope.results["young"]["info"])     / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["place"])    / parseFloat($scope.results["young"]["count"])+
                                          parseFloat($scope.results["young"]["map"])      / parseFloat($scope.results["young"]["count"])+
                                          parseFloat($scope.results["young"]["print"])    / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["distance"]) / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["sealed"])   / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["start"])    / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["finish"])   / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["results"])  / parseFloat($scope.results["young"]["count"]) +
                                          parseFloat($scope.results["young"]["center"])   / parseFloat($scope.results["young"]["count"]) )  / 10;
    };

if($scope.results["adults"]["count"] != 0) {
    $scope.results["adults"]["middle"] =  ( parseFloat($scope.results["adults"]["info"])  / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["place"])    / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["map"])      / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["print"])    / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["distance"]) / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["sealed"])   / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["start"])    / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["finish"])   / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["results"])  / parseFloat($scope.results["adults"]["count"]) +
                                         parseFloat($scope.results["adults"]["center"])   / parseFloat($scope.results["adults"]["count"]) )  / 10;
    };

if($scope.results["old"]["count"] != 0) {
    $scope.results["old"]["middle"] =   ( parseFloat($scope.results["old"]["info"])    / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["place"])    / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["map"])      / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["print"])    / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["distance"]) / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["sealed"])   / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["start"])    / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["finish"])   / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["results"])  / parseFloat($scope.results["old"]["count"]) +
                                         parseFloat($scope.results["old"]["center"])   / parseFloat($scope.results["old"]["count"]) )  / 10;
    };


    console.log("result");
    console.log($scope.results);
});

}]);
