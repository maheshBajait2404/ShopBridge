'use strict';
angular.module('myApp')
    .controller('editInventryController', function ($scope,$http,$stateParams,$rootScope,inventryService,$state) {
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

           $scope.updateInventry=function(data){
            $rootScope.showLoader=true;
             inventryService.updateInventryService(data)
              .then(function (response) {
                 console.log(response)
                    $scope.inventryData = response.data
                     $.growl.notice({ title: "Success", message:'Data Updated Successfully'}); 
                     $rootScope.showLoader=false;
                      $state.go('inventory');
                 },function (error) {
                  $rootScope.showLoader=false;
               });
        }
    });