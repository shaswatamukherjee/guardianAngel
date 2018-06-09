import angular from 'angular';

export default angular.module('pin5',[])
    .controller('paymentController',paymentController);
    function paymentController($rootScope, $scope, $http) {
        var self = this;
        self.init =  function(){
            console.log("Inside Logging Page");
        }
        $rootScope.stylesheets = ["styles/css/core.min.css","styles/css/icons.min.css"];
        self.stateObject = $rootScope.stateObject || {};
        console.log('as'+self.stateObject.origin);
        var map = {enrolment: ['iDEAL - Bevestiging','Bevestiging met identificatiecode',false,true],tikkie:['iDEAL - Betalen','Betalen met identificatiecode',true,false]};
        var initialConfigParams = ['headingTitle','subTitle','showPanelBody','isReadOnly'];
        self.userInput = {};
        for(var i = 0; i < map[self.stateObject.origin].length; i++) {
            self[initialConfigParams[i]] = map[self.stateObject.origin][i];
        }
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
            $rootScope.stateObject.accountNumber = self.userInput.accountNumber;
            if(self.stateObject.origin === 'enrolment') {
                //It should call the API to complete the enrolment process
                $http.put('http://vatsla-test.apigee.net/enrollcharitycustomer/enroll?apikey=aqEu4ZlkdGaHQpi0YjNAmwKy4KDjvE26&cause='+ self.stateObject.enrolmentData.cause +'&plan=' + self.stateObject.enrolmentData.plan + '&contribution='+ self.stateObject.enrolmentData.contribution +'&period='+ self.stateObject.enrolmentData.period +'&bban=' + $rootScope.stateObject.accountNumber)
                    .then(function (response) {
                        if(angular.isDefined(response) && angular.isDefined(response.data) && response.data.enrolled) {
                            $rootScope.go('finishenrolment');
                        }
                    },function (response) {
                        alert('Error: ',response);
                    });
            } else {
                //It should go to the confirmation page
                $rootScope.go('confirmtikkie');
            }
        };
    };