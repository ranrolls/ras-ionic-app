(function() {
  'use strict';

  angular.module('root').controller('passwordCtrl', [
    '$rootScope', '$ionicLoading', '$state', '$http',
    'User', 'GlobalUrl', 'GlobalVariables', 'toastr', 'DSCacheFactory', 'CommonServices',
    passwordCtrl
  ]);

  function passwordCtrl(
    $rootScope, $ionicLoading, $state, $http,
    User, GlobalUrl, GlobalVariables, toastr, DSCacheFactory, CommonServices
  ) {

    var vm = this;
    //        vm.email = 'ranjan.sharma@refine-interactive.com';
    //        vm.un = 'ranjan';

    vm.newPassword = function() {
      var rnd = new Date().getTime();
      if (vm.pc == vm.p) {

        vm.data = User.getData();
// console.log(vm.data);
        $ionicLoading.show();
        //                console.log(vm.data.id + vm.pc);

        var parameters = {
          userid : vm.data.id,
          newpassword: vm.pc,
          rnd: rnd
        };

        User.forgotPaswordReset(parameters).then(
          function(data) {
            $ionicLoading.hide();
            if (data.status == '1') {
              vm.data = {};
              User.updatedData(vm.data);
              $state.go('home.login');
            } else {
              User.setLoginStatus(0);
              try {
                navigator.notification.confirm(GlobalVariables.globalErrorMessage, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
              } catch (e) {
                toastr.info(GlobalVariables.globalErrorMessage);
                toastr.info('error message : ' + data.message);
              }

            }
          },
          function(data, status, headers, config) {

            $ionicLoading.hide();
            try {
              navigator.notification.confirm(GlobalVariables.globalErrorMessage, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
            } catch (e) {
              toastr.info(GlobalVariables.globalErrorMessage);
            }
          }
        );
      } else {
        try {
          navigator.notification.confirm(GlobalVariables.globalErrorMessage, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
        } catch (e) {
          toastr.info(GlobalVariables.globalErrorMessage);
          //                                toastr.info('Password do not match');
        }
      }
    };

    vm.verifyCode = function() {

      vm.data = {};

      vm.data.un = vm.un;
      User.updatedData(vm.data);

      var parameters = {
        username: vm.un,
        token: vm.t
      };

      User.forgotPaswordVerify(parameters).then(
        function(data) {
          $ionicLoading.hide();
          if (data.valid == '1') {
            vm.data.id = data.userid;
            vm.data.token = data.token;
            User.updatedData(vm.data);

            $state.go('home.changePass');
            //                    toastr.info(vm.data);
          } else {
            User.setLoginStatus(0);
            //                            toastr.info('error message : ' + data.message);
            try {
              navigator.notification.confirm(data.message, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
            } catch (e) {
              //                                toastr.info(data.message);
              toastr.info('code do not match');
            }
            //                            $state.go('home.login');
          }
        },
        function(data, status, headers, config) {
          $ionicLoading.hide();
          toastr.error('data is = ' + data);
          toastr.error('status is = ' + status);
          toastr.error('headers is = ' + headers);
          toastr.error('config is = ' + config);
        }
      );
    };

    vm.get = function(form) {
      if (form.$valid) {
        $ionicLoading.show();

        var parameters = {
          email: vm.email
        };

        User.forgotPaswordEmail(parameters).then(
          function(data) {
            $ionicLoading.hide();
            console.log(data);
            if (data.status == '1') {
              try {
                navigator.notification.confirm(data.message, function() {
                  $state.go('home.verifyCode');
                }, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
              } catch (e) {
                toastr.info(data.message);
                $state.go('home.verifyCode');
              }finally{

              }
              // $state.go('home.verifyCode');
              // toastr.info(vm.data);
            } else if (data.status == '0') {
              // User.setLoginStatus(0);
              try {
                navigator.notification.confirm(GlobalVariables.noUserForEmail, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
              } catch (e) {
                //                                toastr.info(data.message);
                toastr.info(GlobalVariables.noUserForEmail);
              }
            } else {
              // User.setLoginStatus(0);
              try {
                navigator.notification.confirm(data.message, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
              } catch (e) {
                toastr.info(data.message);
              }
            };
          },
          function(data, status, headers, config) {
            $ionicLoading.hide();
            // toastr.error('data is = ' + data);
            // toastr.error('status is = ' + status);
            // toastr.error('headers is = ' + headers);
            toastr.error('config is = ' + config);
          }
        );
      } else {
        //                console.log('form not valid');
        toastr.info('Form input is not valid');
      }
    };

    vm.getusername = function(form) {
      if (form.$valid) {
        $ionicLoading.show();

        var parameters = {
          mode: 'forgotusername',
          email: vm.email
        };
        //http://egghuntsg.com/webservice/forgotpassword.php?mode=forgotusername&email=vishal.k@refine-interactive.com
        CommonServices.fetchPromise('forgot_pasword_email', parameters).then(
          function(data) {
            $ionicLoading.hide();
            if (data.message == '1') {
              $state.go('home.login');
              //                    toastr.info(vm.data);
            } else if (data.message == '0') {
              User.setLoginStatus(0);
              try {
                navigator.notification.confirm(GlobalVariables.noUserForEmail, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
              } catch (e) {
                toastr.info(GlobalVariables.noUserForEmail);
                //                                toastr.info(data.message);
              }
            } else {
              User.setLoginStatus(0);
              try {
                navigator.notification.confirm(data.message, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
              } catch (e) {
                // toastr.info(GlobalVariables.noUserForEmail);
                toastr.info(data.message);
              }
            };
          },
          function(data, status, headers, config) {
            $ionicLoading.hide();
            toastr.error('config is = ' + config);
          }
        );
      } else {
        // console.log('form not valid');
        toastr.info('Form input is not valid');
      }
    };
  };
})();
