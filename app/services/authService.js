'use strict';
appVote.factory('authService', ['$http', '$q', 'localStorageService', 'Server', function($http, $q, localStorageService, Server){

  var authReturnedObject ={};

        var _auth = {
          isAuth: false,
          userName: '',
          userRole: 'anonym',
          id: ''
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authData');
            if (authData) {
              _auth.isAuth = true;
              _auth.userName = authData.userName;
              _auth.userRole = authData.role;
              _auth.id = authData.id;
            };

        };

        var _signOut = function () {

            localStorageService.remove('authData');

            _auth.isAuth = false;
            _auth.userName = "";
            _auth.userRole = 'anonym';
            _auth.id = '';

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

            var data = "username=" + loginData.userName + "&password=" + loginData.password + "&grant_type=password";

            var deferred = $q.defer();

            console.log(data)

            $http.post(serverURL + 'token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (response) {

                localStorageService.set('authData', { token: response.access_token, userName: response.userName, role: response.role, id: response.id });

                _auth.isAuth = true;
                _auth.userName = response.userName;
                _auth.userRole = response.role;
                _auth.id = response.id;

                console.log('------');
                console.log(response);
                console.log('------');

                deferred.resolve(response);

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

  return authReturnedObject;

}]);
