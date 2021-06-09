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