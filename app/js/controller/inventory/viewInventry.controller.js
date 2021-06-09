'use strict';
angular.module('myApp')
    .controller('viewInventoryController', function ($scope,$rootScope,$http,$stateParams,inventryService) {
        /*get the detail of inventry item*/
        $scope.getInventryDetails = function(){
          $rootScope.showLoader=true;
             inventryService.getInventryDetailsService($stateParams.id)
                  .then(function (response) {
                    $rootScope.showLoader=false;
                        $scope.inventryData = response.data
                     },function (error) {
                       $rootScope.showLoader=false;
                   });
          }
          $scope.getInventryDetails();     
    });