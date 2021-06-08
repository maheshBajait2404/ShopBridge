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
        var mockData=[]
        mockData.push(data);
        return $http({
            'method': 'POST',
            'url':  "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists",
            '$mockData': mockData
        })
    }
    /*Update inventry data*/
     factory.updateInventryService = function(data){
        var mockData=[]
        mockData.push(data);
        return $http({
            'method': 'PUT',
            'url':  "https://60bf56c797295a0017c4271f.mockapi.io/api/shopbrige/inventryLists/"+data,
            '$mockData': mockData
        })
    }
    return factory;
});