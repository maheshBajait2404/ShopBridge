'use strict';
angular.module('myApp')
    .controller('mainCtrl', function ($scope,$filter,$interval) {
        $scope.CurrentDateTime= $filter('date')(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        var tick = function() {
            $scope.clock = Date.now();
          }
          tick();
          $interval(tick, 1000);
       
    });