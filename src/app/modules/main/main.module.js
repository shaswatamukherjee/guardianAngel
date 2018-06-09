import angular from 'angular';

export default angular.module('guardianAngel.main', [])
    .controller('mainController', mainController)
    .name;

function mainController($rootScope, $scope) {
    var self = this;

    self.init = function(){
        $rootScope.transitionTo('main.applicationForm');
    };

    $scope.tabClicked = function (item) {
        $scope.selectedListItem = item;
        $scope.transitionTo('main.' + item);
    };
}