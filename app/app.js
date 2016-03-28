'use strict';
var appVote = angular.module('appVote', ["ngRoute", "LocalStorageModule"]);
appVote.constant("Server", "http://localhost:8080");

appVote.config(function($routeProvider){

  $routeProvider.when('/signUp',
  {
       templateUrl: 'app/views/signUp.html',
       controller: 'signUpCtrl'
  });

  $routeProvider.when('/signIn',
  {
       templateUrl: 'app/views/signIn.html',
       controller: 'signInCtrl'
  });

  $routeProvider.when('/vote/:mapID/:userID',
  {
       templateUrl: 'app/views/vote.html',
       controller: 'voteCtrl',
       resolve: {

         load: function($q, $route, $location, voteService)
         {
               var defer = $q.defer();
               voteService.checkVote($route.current.params.userID, $route.current.params.mapID).then(function (result){
                 if(result != "voteExist") {
                   defer.resolve();
                 }
                 else {
                   $location.path("/vote/" + $route.current.params.mapID)
                   defer.reject("voteExist");
                 }
               });

               return defer.promise;

          }
       }
  });

  $routeProvider.when('/vote/:mapID',
  {
       templateUrl: 'app/views/results.html',
       controller: 'resultsCtrl'
  });

  $routeProvider.when('/',
  {
       templateUrl: 'app/views/main.html'
  });

  $routeProvider.otherwise({ redirectTo: '/404' });

});

appVote.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
