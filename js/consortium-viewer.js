var App = angular.module('App', [
    'ngRoute'
    ]);

App.controller('SpaceCtrl', function($scope, $http) {

    $http.get('index.json')
        .then(function(res){
            $scope.indexlist = res.data;
        });
    
    $http.get('gitinfo.json')
        .then(function(res){
            $scope.gitinfo = res.data;
        });

    // Just display failed documents 
    /*$scope.filterValid = function(items) {
        var result = {};
        angular.forEach(items, function(value, key) {
            if (value === false) {
                key = key.replace(/^.*[\\\/]/, '');
                result[key] = value;
            }
        });
        return result;
    };*/



});

App.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/w3c-validation/:filename', {
    templateUrl: 'template_w3c.html',
    controller: 'BookController',
    resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    }
  });
});