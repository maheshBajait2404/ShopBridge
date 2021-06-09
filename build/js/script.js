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
.factory('inventryService', function($http){
    var factory = {};
    /*Load the inventry data */
    factory.getInventryDataService = function(){
        return $http({
            'method': 'get',
            'url': "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists"
        })
    }
    /*get inventry details*/
    factory.getInventryDetailsService = function(data){
        return $http({
            'method': 'get',
            'url': "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists/"+data
        })
    }

    /*Delete inventry item*/
    
     factory.deleteInventryService = function(data){
        return $http({
            'method': 'DELETE',
            'url': "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists/"+data
        })
    }
    /*Create inventry services*/
    factory.createInventryService = function(data){
        var mockData={
            'name': data.name,
            'description': data.description,
            'price':data.price,
            'count':data.count,
            'Department':data.Department,
            'Color':data.Color
        }
        return $http({
            'method': 'POST',
            "auth": "51349d7defd9351ac",
            "Content-Type": "application/json" ,
            'url':  "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists",
            'data': mockData
        })
    }
    /*Update inventry data*/
     factory.updateInventryService = function(id,data){
        var mockData={
            'name': data.name,
            'description': data.description,
            'price':data.price,
            'count':data.count,
            'Department':data.Department,
            'Color':data.Color
        }
        return $http({
            'method': 'PUT',
            "auth": "51349d7defd9351ac",
             "Content-Type": "application/json" ,
            'url':  "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists/"+id,
            'data':mockData
              //+"/"+ mockData
        })
    }
    return factory;
});
"use strict";
angular.module('myApp')
    .directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

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
    .controller('createInventryController', function ($scope,$rootScope,inventryService,$state) {
        
        /*insert inventry data to filed*/
        $scope.addItemToInventry=function(data){
          $scope.isSubmit=true;
          if ($scope.form['frmAddInventry'].$valid) {
            $scope.isSubmit=false;
              $rootScope.showLoader=true;
            inventryService.createInventryService(data)
              .then(function (response) {
                    $.growl.notice({ title: "Success", message:'Data created Successfully'}); 
                     $rootScope.showLoader=false;

                      $state.go('inventory');
                    
                 },function (error) {
                    $rootScope.showLoader=false;
               });
          }
        }
    });
    
  
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
'use strict';
angular.module('myApp')
   .controller('inventoryController', function($scope, $rootScope ,$http, $state, inventryService) {
    
      /* get the inventry item list*/
      $scope.getInventryData = function() {
         $rootScope.showLoader=true;
         inventryService.getInventryDataService()
            .then(function(response) {
             $scope.inventryData = response.data
                $rootScope.showLoader=false;
            }, function(error) {
                $rootScope.showLoader=false;
            });
      }
      $scope.getInventryData();
      /*delete inventry item*/
      $scope.deleteInventry = function(value) {
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: true
        },
        function(){
          $rootScope.showLoader=true;
        inventryService.deleteInventryService(value.id).then(function(response){
            $scope.getInventryData();
            $.growl.notice({ title: "Success", message:'Data deleted Successfully'});   
            $rootScope.showLoader=false;
          },function (error) {
        });
        });
       }
      
      // add item to inventry list
      $scope.addInventryData = function() {
         $state.go('createInventry');
      }

      // View inventry function 
      $scope.viewInventryData = function(data) {
         $state.go('viewInventry', {
            "id": data.id
         });
      }
      // edit inventry item
      $scope.editInventryData = function(data) {
         $state.go('editInventry', {
            "id": data.id
         });
      }
   });
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