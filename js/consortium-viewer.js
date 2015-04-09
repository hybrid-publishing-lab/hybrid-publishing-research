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

    $scope.firstelement = function(title) {
        if ( _.size(title) > 2 ) {
            return title;
        } 
            return _.first(title);
    };
});

App.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
        input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
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
$( ".validation-show" ).click(function() {
    $( ".alert" ).slideToggle( "slow");
    $( this ).toggleClass( "slide_up" );
});

// Rainbow animation
(function animate() {
    var block = $('.animated-color');
    block.animate({
        backgroundColor: $.Color(block.css('backgroundColor')).hue('+=179')
    }, 3000, animate);
})();

/*
Date                DC.date
Publication type        DC.type
Author(s) or editor(s)        DC.contributor
*/