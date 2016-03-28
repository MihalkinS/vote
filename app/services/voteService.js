'use strict';
appVote.factory('voteService', ['$http', '$q', 'localStorageService', 'Server', function($http, $q, localStorageService, Server){

  var voteReturnedObject = {};

  var _getCompetitions = function () {

      var deferred = $q.defer();

      $http.get("/endpoints/getCompetitions.php")
      .success(function (response) {
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };

  var _getResultsByMap = function (mapID) {

    var deferred = $q.defer();

    $http.post("/endpoints/results.php", mapID)
    .success(function (response) {
        deferred.resolve(response);
        console.log("____________");
        console.log(response);
    })
        .error(function (err, status) {
        deferred.reject(err);
    });

    return deferred.promise;

  };

  var _vote = function (voteData) {

      var deferred = $q.defer();

      var authData = localStorageService.get('authData');
      voteData.token = authData.token;

      $http.post("/endpoints/vote.php", voteData)
      .success(function (response) {
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };

  var _checkVote = function (userID, mapID) {

      var deferred = $q.defer();

      var data = {
        userID: userID,
        mapID: mapID
      };

      $http.post("/endpoints/checkVoteExist.php", data)
      .success(function (response) {
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };

  var _getAllHumans = function () {

      var deferred = $q.defer();

      $http.get("/endpoints/getAllHuman.php")
      .success(function (response) {
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };

  var _getVotedHumans = function () {

      var deferred = $q.defer();

      $http.get("/endpoints/getVotedHumans.php")
      .success(function (response) {
        console.log(response);
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };

  var _getGroups = function () {

      var deferred = $q.defer();

      $http.get("/endpoints/getGroups.php")
      .success(function (response) {
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };

  var _getMapInfo = function (mapID) {

      var deferred = $q.defer();

      $http.post("/endpoints/getMapInfo.php", mapID)
      .success(function (response) {
          console.log("---------------");
          console.log(response);
          deferred.resolve(response);
      })
          .error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;

  };


  voteReturnedObject.getCompetitions = _getCompetitions;
  voteReturnedObject.getResultsByMap = _getResultsByMap;
  voteReturnedObject.vote = _vote;
  voteReturnedObject.checkVote = _checkVote;
  voteReturnedObject.getAllHumans = _getAllHumans;
  voteReturnedObject.getVotedHumans = _getVotedHumans;
  voteReturnedObject.getGroups = _getGroups;
  voteReturnedObject.getMapInfo = _getMapInfo;

  return voteReturnedObject;

}]);
