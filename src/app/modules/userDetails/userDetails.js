import angular from 'angular';

export default angular.module('guardianAngel.main.userDetails', [])
    .controller('userDetails', userDetails)

function userDetails($scope, commonService){
    var self = this;
    self.init = function () {
        self.createUser();
        //self.createMessage();
    };
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    self.createUser = function(){
        var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        var requestData = {
            data: {
                contactNumber: "+31684399478",
                customerId: guid,
                customerLocation: "12587808",
                customerName: "Bryan Adams",
                email: "bryan.adams@gmail.com"
            }
        }
      commonService.createUser(requestData);
    };

    self.createMessage = function(){
        var createData = {
            messages: [
                {
                    content: "Greetings from KPN again!",
                    mobile_number: "+31686028059"
                }
            ],
            sender: "Demo App"
        };
        commonService.createSMS(createData);
    };
}