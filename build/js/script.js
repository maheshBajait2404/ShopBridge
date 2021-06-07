'use strict';
var app = angular.module('myApp',
[
  'ui.router', 
  'ui.bootstrap'
])
  .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  // Landing page for the Inventry list
 .state('inventory', {
      url: '/',
      templateUrl: 'template/inventory/inventory.html',
      controller: 'inventoryController',
      controllerAs: 'inventory'
    })

    // Create inventry route
    .state('createInventry', {
      url: '/createInventry',
      templateUrl: 'template/inventory/createInventry.html',
      controller: 'createInventryController',
      controllerAs: 'createInventry'
    })

    //view inventry route
    .state('viewInventry', {
      url: '/viewInventry/{id}',
      templateUrl: 'template/inventory/viewInventory.html',
      controller: 'viewInventoryController',
      controllerAs: 'viewInventry'
    })

    // Edit inventry route
    .state('editInventry', {
      url: '/editInventry/{id}',
      templateUrl: 'template/inventory/editInventry.html',
      controller: 'editInventryController',
      controllerAs: 'editInventry'
    });
    
    $urlRouterProvider.otherwise('/');

   }

   
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
'use strict';
angular.module('myApp')
    .controller('createInventryController', function ($scope) {
        $scope.addItemToInventry=function(data){
            console.log(data)
        }
    });
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
'use strict';
angular.module('myApp')
    .controller('viewInventoryController', function ($scope,$http,$stateParams) {
        $scope.getInventry = function(){
            $http(
                {
                  method: 'GET', 
                  url: 'inventry.json'
                }).then(function(response) {
                  $scope.inventryData = response.data
                  angular.forEach(response.data,function(value,key){
                      if(value.Product_ID==$stateParams.id){
                        $scope.inventryData=value;
                      }
                  })
                });
          }
          $scope.getInventry();     
    });