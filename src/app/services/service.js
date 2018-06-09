import angular from 'angular';

export default angular.module('guardianAngelservice', [])
    .service('commonService', commonService);

function commonService($http) {
    var self = this;

    self.getCall = function (param){
        console.log("Inside get Call");
        $http({
            method: 'GET',
            url: '/someUrl',
            param: param
        }).then(function successCallback(response) {

        }, function errorCallback(response) {

        });
    };

    self.createCall = function (requestData){
        $http({
            method: 'POST',
            url: '/someUrl',
            data: requestData
        }).then(function successCallback(response) {

        }, function errorCallback(response) {

        });
    };

    self.updateCall = function (param,requestData){
        $http({
            method: 'PUT',
            url: '/someUrl'
        }).then(function successCallback(response) {

        }, function errorCallback(response) {

        });
    };
}