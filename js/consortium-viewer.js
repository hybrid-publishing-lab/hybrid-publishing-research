var App = angular.module('App', []);

App.controller('SpaceCtrl', function($scope, $http) {
    $http.get('list.json')
        .then(function(res){
            $scope.list = res.data;
        });
    
    $http.get('validation-status.json')
        .then(function(res){
            $scope.validationstatus = res.data;
        });

    $http.get('index.json')
        .then(function(res){
            /*{
                "docs/book_liberation_manifesto/Book_Liberation_Manifesto.html":false,
                "docs/empowering_publishers_to_innovate/Empowering_Publishers_to_Innovate.html":true
            }*/
            $scope.indexlist = res.data;

        });

    // Just display failed documents 
    $scope.filterValid = function(items) {
        var result = {};
        angular.forEach(items, function(value, key) {
            if (value === false) {
                key = key.replace(/^.*[\\\/]/, '');
                result[key] = value;
            }
        });
        return result;
    };    


});