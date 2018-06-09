import angular from 'angular';

export default angular.module('guardianAngel.main.userDetails', [])
    .controller('userDetails', userDetails)

function userDetails($scope){
    var self = this;
    self.init = function () {
        console.log("Inside User Details");
    };
}