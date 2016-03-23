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

  $routeProvider.when('/',
  {
       templateUrl: 'app/views/main.html'
  });

  $routeProvider.otherwise({ redirectTo: '/404' });

});
