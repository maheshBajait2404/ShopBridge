'use strict';
angular.module('myApp')
    .controller('inventoryController', function ($scope,$http,$state) {
        $scope.getInventry = function(){
            $http(
                {
                  method: 'GET', 
                  url: 'inventry.json'
                }).then(function(response) {
                  $scope.inventryData = response.data
                });
          }
          $scope.getInventry();

        $scope.deleteInventry = function(value){
            const fs = require('fs');
            const fileName = './inventry.json';
            const file = require(fileName);
            file.key = value.Product_ID;
    
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(file));
            console.log('writing to ' + fileName);
            });
        }
        // add item to inventry list
        $scope.addInventryData = function(){
          $state.go('createInventry');
        }

        // View inventry function 
        $scope.viewInventryData = function(data){
          $state.go('viewInventry', {"id":data.Product_ID});
        }
        // edit inventry item
        $scope.editInventryData = function(data){
          $state.go('editInventry', {"id":data.Product_ID});
        }
    });