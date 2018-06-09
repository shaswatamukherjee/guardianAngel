import angular from 'angular';
import 'angular-ui-router';
import 'module/main/main.module.js';
import 'module/pin5/pin5.js';
import 'module/userDetails/userDetails.js';
import 'module/applicationForm/applicationForm.js';
import 'service/service.js';
import 'service/spinner.js';
import 'angular-busy';
import messages from './messages.js';
import 'jquery';

angular.module('guardianAngel', [
    'ui.router',
    'cgBusy',
    'guardianAngel.main',
    'guardianAngel.main.userDetails',
    'guardianAngel.main.applicationForm',
    'pin5',
    'service.spinner',
    'guardianAngelservice'
])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/modules/main/main.module.html',
                params: {stateObject: {}}
            })
            .state('main.userDetails', {
                url: '/userDetails',
                templateUrl: 'app/modules/userDetails/userDetails.html',
                params: {stateObject: {}}
            })
            .state('main.applicationForm', {
                url: '/applicationForm',
                templateUrl: 'app/modules/applicationForm/applicationForm.html',
                params: {stateObject: {}}
            })
            .state('pin5', {
                url: '/pin5',
                templateUrl: 'app/modules/pin5/pin5.html',
                params: {stateObject: {}}
            })
    })
    .controller('guardianAngelController', guardianAngelController)
function guardianAngelController($rootScope, $scope, $state) {
    let self = this;
    self.showError = false;
    self.showSuccess = false;
    self.activateMessages = true;
    $rootScope.messages = messages;
    $scope.stateObject = {};
    $rootScope.transitionTo = function(nextState, param) {
        if(param) {
            param.stateObject = $rootScope.stateObject;
        } else {
            param = {stateObject: $rootScope.stateObject};
        }
        $state.transitionTo(nextState, param);
    };
    $rootScope.reportError = function (err) {
        let error = [];
        if(err.data !== null && angular.isDefined(err.data.output) && angular.isDefined(err.data.output.message)) {
            error.push($rootScope.messages[err.data.output.message.messageCode]);
        } else {
            error.push('Service Unreachable');
        }
        self.showError = true;
        self.errorMessage = error.join('\n');
    };
    $rootScope.resetError = function () {
        self.showError = false;
    };
    $rootScope.reportSuccess = function (msg) {
        self.showSuccess = true;
        self.successMessage = msg;
    };
    $rootScope.hideSuccess = function () {
        self.showSuccess = false;
    };
}

angular.bootstrap(document, ['guardianAngel']);