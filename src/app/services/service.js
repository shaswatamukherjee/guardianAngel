import angular from 'angular';

export default angular.module('guardianAngelservice', [])
    .service('commonService', commonService);

function commonService($http) {
    var self = this;

    self.createUser = function(requestData){
        $http({
            method: 'POST',
            url: 'https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/addcustomer',
            data: requestData
        }).then(function (response) {
            console.log(response);
        }, function (response) {

        });
    };

    self.createSMS = function(requestData){
        console.log(requestData);
        $http({
            url: 'https://api-prd.kpn.com/messaging/sms-kpn/v1/send',
            method: 'POST',
            data: requestData,
            headers: {'Control-cache':'no cache','Authorization':'BearerToken eK2gZ3DoecjFRjToQh1t7nDjmUm4'}
        }).then(function (response) {
              console.log(response);
        }, function (response) {

        });
    };
}