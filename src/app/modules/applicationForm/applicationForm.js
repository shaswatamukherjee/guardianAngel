import angular from 'angular';

export default angular.module('guardianAngel.main.applicationForm', [])
    .controller('applicationForm', applicationForm)

function applicationForm($rootScope, commonService) {
    var self = this;
    self.init = function() {
        commonService.getCall();
        console.log("Inside applicationForm");
        self.initIndicator = true;
    };
    self.goNext = function(validation){
        console.log("validation : - "+ validation);
        if(validation != undefined && validation != 0){
            $rootScope.transitionTo('main.pin5');
        }
    };
}
