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

$('#empty-box-for-header1').addClass('hidden');
$('#empty-box-for-header2').addClass('hidden');
$('#empty-box-for-aside').addClass('hidden');
$('.arrow-top').addClass('hidden');
$('.arrow-top-return').addClass('hidden');

$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('fixed-top');
    $('#empty-box-for-header1').removeClass('hidden');
    $('#empty-box-for-header2').removeClass('hidden');
    $('.arrow-top').removeClass('hidden');
    $('.arrow-top-return').removeClass('hidden');
  } else {
    $('nav').removeClass('fixed-top');
    $('#empty-box-for-header1').addClass('hidden');
    $('#empty-box-for-header2').addClass('hidden');
    $('.arrow-top').addClass('hidden');
    $('.arrow-top-return').addClass('hidden');
  }
});

$(window).scroll(function() {
  if ($(document).scrollTop() > 150) {
    $('aside').addClass('TOC-fixed');
    $('#empty-box-for-aside').removeClass('hidden');
    $('.scroll-collapse-menu').removeClass('hidden');
    $('#toc-hidden').addClass('collapse');
    $('#toc-hidden').removeClass('uncollapsed');
  } else {
    $('aside').removeClass('TOC-fixed');
    $('#empty-box-for-aside').addClass('hidden');
    $('.scroll-collapse-menu').addClass('hidden');
    $('#toc-hidden').removeClass('collapse');
    $('#toc-hidden').addClass('uncollapsed');
  }
});

var images = ['HPC1.png', 'HPC2.png', 'HPC3.png', 'HPC4.png'];

$('#randomLogo').css({'background-image': 'url(../../static/' + images[Math.floor(Math.random() * images.length)] + ')'});


/*
// Rainbow animation
var animate = function() {
    var block = $('.animated-color');
    block.animate({backgroundColor: $.Color(block.css('backgroundColor')).hue('+=179')}, 3000, animate);
};

animate();
*/

/*
Date                DC.date
Publication type        DC.type
Author(s) or editor(s)        DC.contributor
*/