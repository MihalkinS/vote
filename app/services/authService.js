'use strict';
appVote.factory('authService', ['$http', '$q', 'localStorageService', 'Server', function($http, $q, localStorageService, Server){

  var authReturnedObject ={};

        var _auth = {
          isAuth: false,
          email: '',
          id: ''
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authData');
            if (authData) {
              _auth.isAuth = true;
              _auth.email = authData.email;
              _auth.id = authData.id;
            };

        };

        var _signOut = function () {



            $http.post("/endpoints/signOut.php")
            .success(function (response) {
              localStorageService.remove('authData');
              _auth.isAuth = false;
              _auth.email = "";
              _auth.id = '';

            });

        };

        var _signUp = function (registration) {

            _signOut();

            var deferred = $q.defer();

            $http.post("/endpoints/signUp.php", registration)
            .success(function (response) {
                deferred.resolve(response);
            })
                .error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _signIn = function (loginData) {

            var deferred = $q.defer();

            $http.post('/endpoints/signIn.php', loginData)
                .success(function (response) {
                  if(response != "error" ){
                    localStorageService.set('authData', { token: response.token, email: response.email, id: response.id });
                    _auth.isAuth = true;
                    _auth.email = response.email;
                    _auth.id = response.id;
                    deferred.resolve(response);
                  };

                    deferred.reject(response);

                })
                .error(function (err, status) {

                _signOut();

                deferred.reject(err);
            });

            return deferred.promise;

        };

        authReturnedObject.auth = _auth;
        authReturnedObject.signIn = _signIn;
        authReturnedObject.signOut = _signOut;
        authReturnedObject.signUp = _signUp;
        authReturnedObject.fillAuthData = _fillAuthData;

  return authReturnedObject;

}]);
