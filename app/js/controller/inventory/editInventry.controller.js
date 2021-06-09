'use strict';
angular.module('myApp')
    .controller('editInventryController', function ($scope,$http,$stateParams,$rootScope,inventryService,$state) {
       /*get inventry details*/
        $scope.getInventry = function(){
          $rootScope.showLoader=true;
           inventryService.getInventryDetailsService($stateParams.id)
                  .then(function (response) {
                       $scope.editInventry = response.data
                       $rootScope.showLoader=false;
                     },function (error) {
                    $rootScope.showLoader=false;
               });
           }
          $scope.getInventry();
               
          /*update inventry data*/
           $scope.updateInventry=function(data){
            $rootScope.showLoader=true;
             inventryService.updateInventryService($stateParams.id,data)
              .then(function (response) {
                 $scope.inventryData = response.data
                     $.growl.notice({ title: "Success", message:'Data Updated Successfully'}); 
                     $rootScope.showLoader=false;
                      $state.go('inventory');
                 },function (error) {
                  $rootScope.showLoader=false;
               });
        }
    });