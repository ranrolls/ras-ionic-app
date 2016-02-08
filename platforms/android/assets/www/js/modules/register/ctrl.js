
(function () {
    'use strict';

    angular.module('root').controller('RegisterCtrl', ['toastr',
        '$state', '$http', '$ionicLoading',
        'GlobalUrl', 'GlobalVariables', 'User', RegisterCtrl]);

    function RegisterCtrl(toastr,
            $state, $http, $ionicLoading,
            GlobalUrl, GlobalVariables, User) {

        var vm = this;

        vm.u;
        vm.user;

        vm.register = function (form) {
            if (form.$valid) {
                $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )

                var params = {
                    action: 'userregistration',
                    name: vm.u.name,
                    username: vm.u.uname,
                    email: vm.u.email,
                    password: vm.u.password,
                    company: vm.u.cmp,
                    country: vm.u.country,
                    region: vm.u.region,
                };

                // add new field naming region for current industry

                User.register(params).then(
                        function (data) {
                            $ionicLoading.hide();
                            try {
                              navigator.notification.confirm(data.message, function () {
                              }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                            } catch (e) {
                                alert(data.message);
                            }
//                            if (data.message == 'Your Registration Was Completed Successfully.') {
//                                //                        toastr.success(data.message);
//                                try {
//                                  navigator.notification.confirm(GlobalVariables.accountCreateSuccess, function () {
//                                  }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
//                                } catch (e) {
//                                    alert(GlobalVariables.accountCreateSuccess);
//                                }
                                $state.go('home.login');
//                            } else {
////                        toastr.info('Wrong user details');
////                        console.log(data.message);
////                            toastr.info(data.message);
//                                try {
//                                    navigator.notification.confirm(GlobalVariables.emailAlreadyInUse, function () {
//                                    }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
//                                } catch (e) {
////                                toastr.error('config is = ' + config);
//                                    toastr.info(GlobalVariables.emailAlreadyInUse);
//                                }
//                                $state.go('home.login');
//                            }
                        },
                        function (data, status, headers, config) {
                            $ionicLoading.hide();
//                        toastr.error('config is = ' + config);
                            try {
                                navigator.notification.confirm(GlobalVariables.globalErrorMessage, function () {
                                }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                            } catch (e) {
                                toastr.info(GlobalVariables.globalErrorMessage);
                            }

                        });
//                toastr.info(vm.u);
            }else{
              try {
                  navigator.notification.confirm( GlobalVariables.globalEmailValidationError, function () {
                  }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
              } catch (e) {
//                                toastr.error('config is = ' + config);
                  toastr.error(GlobalVariables.globalEmailValidationError);
              }
            }
        }
    }
    ;

})();
