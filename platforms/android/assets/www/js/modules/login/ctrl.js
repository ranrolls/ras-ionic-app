(function() {

  'use strict';

  angular.module('root').controller('LoginCtrl', [
    '$cordovaDevice', '$ionicLoading', '$rootScope', '$state', '$stateParams', '$scope', '$cordovaNetwork',
    'GlobalVariables', 'toastr', 'User', 'GlobalUrl', 'fromState', LoginCtrl
  ]);

  function LoginCtrl(
    $cordovaDevice, $ionicLoading, $rootScope, $state, $stateParams, $scope, $cordovaNetwork,
    GlobalVariables, toastr, User, GlobalUrl, fromState) {

    var vm = this;
    vm.un = '';
    vm.p = '';
    var previousState;

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      previousState = fromState.name;
    });

    vm.login = function(form) {
      // console.log('login clicked');
      if (form.$valid) {
        // console.log('in form valid');


        // if(typeof device === 'undefined'){
        //   return false;
        // }

        if (typeof device !== 'undefined') {
          console.log('device catch');
          if ($cordovaNetwork.isOffline()) {
            // console.log('in net offline');
            try {
              navigator.notification.confirm(
                GlobalVariables.globalNetworkContentMessage, //  message
                function(buttonIndex) {
                  $state.go('home.root');
                  // console.log(GlobalVariables.globalNetworkContentMessage);
                }, //  callback to invoke
                GlobalVariables.globalErrorHeading, //  title
                GlobalVariables.globalErrorButtonTitle //  button Name
              );
            } catch (e) {
              console.log(GlobalVariables.globalNetworkContentMessage);
              toastr.info(GlobalVariables.globalNetworkContentMessage);
              $state.go('home.root');
            } finally {
              $state.go('home.root');
              return false;
            }

          }
        }
        try {
          var version = ($cordovaDevice.getVersion()) ? $cordovaDevice.getVersion() : "not found";
          var uuid = ($cordovaDevice.getUUID()) ? $cordovaDevice.getUUID() : "not found";
          var platform = ($cordovaDevice.getPlatform()) ? $cordovaDevice.getPlatform() : "not found";
          var model = ($cordovaDevice.getModel()) ? $cordovaDevice.getModel() : "not found";
        } catch (e) {
          var version = "not found";
          var uuid = "not found";
          var platform = "not found";
          var model = "not found";
        }
        // console.log(vm.un, vm.p, uuid, platform, model, version);
        $ionicLoading.show({
          template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
        })
        User.setData(vm.un, vm.p, uuid, platform, model, version)
          .then(
            function(data) {
              $ionicLoading.hide();
              //  console.log(data);
              if (data.id > 0) {

                if (data.block == 1) {
                  // console.log('user is blocked');
                  User.setLoginStatus(0);
                  try {
                    navigator.notification.confirm(GlobalVariables.userNotActivated, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                  } catch (e) {
                    toastr.info(GlobalVariables.userNotActivated);
                  }
                } else {
                  vm.un = '';
                  vm.p = '';
                  User.setLoginStatus(1);
                  fromState = User.getFromState();
                  if (fromState == 'home.forumTopic') {
                    var params = {
                      'threadId': User.getCid()
                    };
                    console.log(params);
                    $state.go(fromState, params);
                    $rootScope.$broadcast('menutext', {
                      'text': 'Discussion Forum'
                    });
                  } else if (fromState == 'fb') {
                    $state.go('home.fb');
                  } else if (fromState == 'ud') {
                    $state.go('home.userDetail');
                  } else {
                    $state.go('home.userDetail');
                    $rootScope.$broadcast('menutext', {
                      'text': 'userProfile'
                    });
                  }
                }
              } else {
                User.setLoginStatus(0);
                try {
                  navigator.notification.confirm(GlobalVariables.incorrectUserDetails, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                } catch (e) {
                  toastr.info(GlobalVariables.incorrectUserDetails);
                }
              }
            }
          );
      } else {
        try {
          navigator.notification.confirm(GlobalVariables.globalFormErrorMessage, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
        } catch (e) {
          toastr.info(GlobalVariables.globalFormErrorMessage);
        }
      }




    };
  }
})();
