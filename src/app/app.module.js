import angular from 'angular';
import 'angular-ui-router';
import 'module/main/main.module.js';
import 'module/pin5/pin5.js';
import 'module/userDetails/userDetails.js';
import 'module/applicationForm/applicationForm.js';
import 'service/service.js';

angular.module('guardianAngel', [
    'ui.router', 'guardianAngel.main', 'guardianAngel.main.userDetails', 'guardianAngel.main.applicationForm',
    'main.ideal',
    'guardianAngelservice'
])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', { url: '/main', templateUrl: 'app/modules/main/main.module.html' })
            .state('main.userDetails', { url: '/userDetails', templateUrl: 'app/modules/userDetails/userDetails.html' })
            .state('main.applicationForm', { url: '/applicationForm', templateUrl: 'app/modules/applicationForm/applicationForm.html' })
            .state('main.pin5', { url: '/pin5', templateUrl: 'app/modules/pin5/pin5.html' })
    })
    .controller('guardianAngelController', guardianAngelController);
function guardianAngelController($rootScope, $scope, $state) {
    let self = this;
    $scope.stateObject = {};
    $rootScope.transitionTo = function(nextState, param) {
        if(param) {
            param.stateObject = $rootScope.stateObject;
        } else {
            param = {stateObject: $rootScope.stateObject};
        }
        $state.transitionTo(nextState, param);
    };
}

angular.bootstrap(document, ['guardianAngel']);