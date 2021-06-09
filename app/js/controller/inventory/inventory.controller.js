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