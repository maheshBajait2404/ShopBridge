'use strict';
angular.module('myApp')
    .controller('createInventryController', function ($scope,inventryService) {
        $scope.addItemToInventry=function(data){
            console.log(data)
        }
    });