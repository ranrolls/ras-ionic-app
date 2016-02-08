(function () {
    'use strict';

//    angular.module('root').controller('contactCtrl', ['$state', 'toastr', '$cordovaEmailComposer', contactCtrl]);
    angular.module('root').controller('contactCtrl', [
        '$scope', '$state',
        'CommonServices', 'toastr', 'GlobalVariables',
        contactCtrl]
            );

    function contactCtrl(
        $scope, $state,
        CommonServices, toastr, GlobalVariables
        ){

        var vm = this;
        vm.page = "contact us";
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//            console.log(toState.name);
            if (toState.name == 'home.contactUs') {
                vm.f = {};
            }
        });
        vm.formSubmit = function (form) {
            if (form.$valid) {
                CommonServices.pingMail(vm.f)
                    .then(
                        function (data) {
                            if (typeof data.result == "string") {
//                            toastr.success(data.result);
//console.log(typeof data.result);

try{
    navigator.notification.confirm(
        data.result,     //  message
        function(buttonIndex) {
//            alert('You selected button ' + buttonIndex);
        },               //  callback to invoke
        GlobalVariables.globalErrorHeading,       //  title
        GlobalVariables.globalErrorButtonTitle        //  button Name
    );
}catch(e){
    toastr.info(data.result);
}

                                // $state.go('home.root');
                            } else {
                                toastr.info('un identified data by source');
                            }
                            ;
                        }
                    );
            }
            ;
        };
    }
    ;

})();
