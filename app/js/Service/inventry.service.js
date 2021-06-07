'use strict';

angular.module('myApp')
.factory('inventryService', function($http,qbheadersService,$stateParams){
    var factory = {};

    factory.createInventryService = function(data){
        return $http({
            'method': 'POST',
            'headers': qbheadersService.qbApiHeadersAfterLogin(),
            'url': Project.qbUserApiUrl + "selectcertificatetemplateforcourse",
            'data': data
        })
    
    return factory;
});