var App = angular.module('App', [

    ]);

App.controller('SpaceCtrl', function($scope, $http) {

    $http.get('index.json')
        .success(function(data, status, headers, config) {
          $scope.indexlist = data;
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

    $scope.stripdist = function(path) {
        path = path.replace(/(dist\/)+/, '');
        return path;
    };

});


$( ".contact" ).click(function() {
    $( "#footer_slide" ).slideToggle( "slow");
    $('html, body').animate({
        scrollTop: $("#footer_slide").offset().top + $('window').height()
    }, 2000);
    $( this ).toggleClass( "slide_up" );
});
$( ".more" ).click(function() {
    $( "#header_slide" ).slideToggle( "slow");
    $( this ).toggleClass( "slide_up" );
});
