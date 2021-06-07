'use strict';
angular.module('myApp')
    .controller('editInventryController', function ($scope,$http,$stateParams) {
        $scope.getInventry = function(){
            $http(
                {
                  method: 'GET', 
                  url: 'inventry.json'
                }).then(function(response) {
                  $scope.inventryData = response.data
                  angular.forEach(response.data,function(value,key){
                      if(value.Product_ID==$stateParams.id){
                        $scope.editInventry=value;
                      }
                  })
                });
          }
          $scope.getInventry();      
    });