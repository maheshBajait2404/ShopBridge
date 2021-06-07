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

   