import angular from 'angular';
export default angular.module('main.ideal', [])
    .controller('paymentController',paymentController);

function paymentController($rootScope, $scope, $http) {
    $rootScope.stylesheets = ["styles/css/core.min.css","styles/css/icons.min.css"];
    var self = this;
    self.stateObject = $rootScope.stateObject || {};
    self.userInput = {};
    var resetPinState = -1;
    self.boxes = [{
        state: false
    }, {
        state: false
    }, {
        state: false
    }, {
        state: false
    }, {
        state: false
    }];
    self.scopeModelWatch = function(newValue, oldValue) {
        var pinLength = $scope.ngModel ? $scope.ngModel.length : 0;
        if (pinLength > 0) {
            self.pinStateDefault = false;
        } else if (pinLength === 0 && oldValue !== '') {
            self.pinStateDefault = true;
        }
        var ticked = pinLength;
        self.pinstate = pinLength - 1;
        resetPinState = self.pinstate;
        for (var i = 0; i < self.boxes.length; i++) {
            self.boxes[i].state = (i < ticked) ? true : false;
        }
    };
    // watch for any changes on the model; then update the state boxes accordingly
    $scope.$watch(function() {return $scope.ngModel;}, self.scopeModelWatch);

    self.addDefaultClass = function() {
        if ($scope.ngModel === '') {
            // pinStateDefault is used to show cursor for the first time and when no data
            self.pinStateDefault = true;
        } else {
            // This condition is used to reset the position of the cursor
            self.pinstate = resetPinState;
        }
        self.pinDefault = true;
        // To put the focus specifically on the pin5 field.
        // $element[0].querySelectorAll('input')[0].focus();
    };

    // This function is used to set boolean value to remove styling on blur.
    self.removeDefaultClass = function() {
        self.pinStateDefault = false;
        self.pinstate = -1;
        self.pinDefault = false;
    };

    self.submitAndMoveToNextPageOnSucess = function (form) {
        $rootScope.transitionTo('main.userDetails');
    };
}