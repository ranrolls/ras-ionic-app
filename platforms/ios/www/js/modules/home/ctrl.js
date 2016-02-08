(function() {
  'use strict';

  angular.module('root').controller('HomeCtrl', [
    '$state', '$scope', '$rootScope', '$timeout',
    '$ionicSideMenuDelegate', '$ionicHistory', '$document', '$cordovaNetwork',
    '$cordovaInAppBrowser', '$cordovaDevice', '$http', '$ionicModal', '$ionicLoading',
    'toastr', 'GlobalVariables', 'User', HomeCtrl
  ]);

  function HomeCtrl($state, $scope, $rootScope, $timeout, $ionicSideMenuDelegate, $ionicHistory, $document, $cordovaNetwork,
    $cordovaInAppBrowser, $cordovaDevice, $http, $ionicModal, $ionicLoading, toastr, GlobalVariables, User) {

    var vm = this;
    var push;
    vm.iframe = false;
    vm.ifUrl = '';
    vm.titleShow = true;
    vm.pushRid;

    // var push;
    $scope.sid = "234467693216";
    vm.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    vm.root = true;
    vm.back = false;
    vm.tut = true;
    vm.loginStatus = 'Login';
    vm.userUrl = "#/home/login";

    vm.currentState, vm.oldState;

    vm.myGoBack = function() {

      if (vm.oldState == 'home.fb' && User.getLoginStatus() != 1) {
        javascript: history.go(-2);
      } else {
        javascript: history.go(-1);
      }

    };
    var sc = 1;
    $scope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        vm.oldState = $state.current.name;
        sc = 1;
        if (vm.oldState == 'home.root'  && (typeof device !== 'undefined')) {
          if ($cordovaNetwork.isOffline() && sc == 1) {
            event.preventDefault();
            console.log('in net offline');
            sc = 2;
            try {
              navigator.notification.confirm(
                GlobalVariables.globalNetworkContentMessage, //  message
                function(buttonIndex) {
                  $state.go('home.root');
                  $ionicLoading.hide();
                  console.log(GlobalVariables.globalNetworkContentMessage);
                }, //  callback to invoke
                GlobalVariables.globalErrorHeading, //  title
                GlobalVariables.globalErrorButtonTitle //  button Name
              );
            } catch (e) {
              console.log(GlobalVariables.globalNetworkContentMessage);
              toastr.info(GlobalVariables.globalNetworkContentMessage);
              $state.go('home.root');
            } finally {
              $rootScope.$broadcast('menutext', {
                'text': 'root'
              });
              $state.go('home.root');
              $ionicLoading.hide();
            }
          }

        } else {
          sc = 1;
        }

        if (toState.name == 'home.fb' && User.getLoginStatus() != 1 && $cordovaNetwork.isOnline()) {
          toastr.info('fb is set now!');
          User.setFromState('fb');
          // toState.name = 'home.loginAccess';
          $state.go('home.login');
        }

        //console.log(toState.name);
        //if (toState.name == 'home.userDetail'){
        //  vm.back = false;
        //}

        $ionicLoading.show({
          template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
        })
      });

    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
      // var onlineState = networkState;
      User.setFromState('ud');
    });
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
      event.preventDefault();
      if ($cordovaNetwork.isOffline() && sc == 1) {
        event.preventDefault();
        console.log('in net offline');
        sc = 2;
        try {
          navigator.notification.confirm(
            GlobalVariables.globalNetworkContentMessage, //  message
            function(buttonIndex) {
              $state.go('home.root');
              $ionicLoading.hide();
              console.log(GlobalVariables.globalNetworkContentMessage);
            }, //  callback to invoke
            GlobalVariables.globalErrorHeading, //  title
            GlobalVariables.globalErrorButtonTitle //  button Name
          );
        } catch (e) {
          console.log(GlobalVariables.globalNetworkContentMessage);
          toastr.info(GlobalVariables.globalNetworkContentMessage);
          $state.go('home.root');
        } finally {
          $rootScope.$broadcast('menutext', {
            'text': 'root'
          });
          User.setFromState('ud');
          $state.go('home.root');
          $ionicLoading.hide();
        }
      }

    });

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

      vm.currentState = $state.current.name;

      // back button for login page fix starts

      //console.log('vm.currentState = ' + vm.currentState);
      //if(vm.currentState === 'home.userDetail'){
      //  vm.back = false;
      //}

      // back button for login page fix ends here


      $timeout(function() {
        $ionicLoading.hide()
      }, GlobalVariables.stateChangeLoaderTime);

      if ($ionicHistory.nextViewOptions() == null) {
        if (!vm.root & !vm.back) {
          vm.back = true;
          if (vm.title == 'User Profile' || vm.title == 'Login') {
            vm.back = false;
          }
        }
        if (vm.root || vm.title === 'Restricted Area') {
          vm.back = false;
        }
      } else {
        vm.back = false;
        var cu = $state.current.name.substr($state.current.name.length - 1);
        //                console.log('cu = ' + cu);
        if (cu != 'd' && cu != 't') {
          vm.back = true;
        }
      }
      //console.log(toState.name, fromState.name);
      if (toState.name == 'home.forumTopic' && fromState.name == 'home.login' && User.getLoginStatus() == 1) {
        vm.loginStatus = 'My Profile';
        vm.userUrl = '#/home/userDetail';
        vm.back = false;
      }
      if (toState.name == 'home.fb' && fromState.name == 'home.login' && User.getLoginStatus() == 1) {
        vm.loginStatus = 'My Profile';
        vm.userUrl = '#/home/userDetail';
        vm.back = false;
      }


      if (toState.name === 'home.userDetail' && toState.name === 'home.loginAccess') {
        //console.log('vm.back set to False');
        vm.back = false;
      };

      // back button for login page fix starts
      //console.log(toState.name);
      if(vm.currentState === 'home.userDetail'){
        vm.back = false;
      }
      // back button for login page fix ends here

    });

    $scope.$on('menutext', function(event, args) {

      vm.title = '';
      vm.root = true;
      var head = args.text;
      //            console.log(args);

      if (head == 'root') {
        vm.title = '';
        vm.root = true;
        //                console.log('on root');
      } else if (head != 'root') {
        vm.root = false;
        vm.title = head;
      };

      if (head == 'userProfile') {
        //                $scope.$apply(function () {
        vm.title = 'My Account';
        vm.loginStatus = 'My Profile';
        vm.userUrl = '#/home/userDetail';
        vm.back = false;
        //                });
        //                console.log('vm.back changed to false from head == userprofile');
      };

      if (head == 'ra') {
        vm.title = 'Discussion Forum';
        vm.back = false;
        //                console.log('vm.back set to false home ctrl line 111');
      };

      if (head == 'Login') {
        //                $scope.$apply(function () {
        vm.title = 'Login';
        vm.loginStatus = 'Login';
        vm.userUrl = '#/home/login';
        vm.back = false;
        //                });
      };
    });

    $scope.$on('hideBack', function(event, args) {
      $scope.$apply(function() {
        //                vm.back = false;
      });

    });

    vm.restrict = function(key) {
      var go = false;
      go = (User.getLoginStatus() == 1) ? true : false;
      // console.log(go);

      if (go) {
        switch (key) {
          case 'fb':
            $state.go('home.fb');
            break;
          default:
            break;
        }
      } else {
        switch (key) {
          case 'fb':
            User.setFromState('fb');
            break;
          default:
            break;
        }
        $state.go('home.loginAccess');
      }


    };


    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {
      $ionicLoading.hide();
    });

    vm.toggleIframe = function() {
      //console.log(vm.oldState);
      //console.log(vm.currentState);
      vm.iframe = (vm.iframe) ? false : true;
      vm.titleShow = true;
    }

    $scope.$on('exLink', function(event, args) {

      $ionicLoading.show();
      var target = '_self';
      var options = {
        location: 'yes',
        clearcache: 'yes',
        closebuttoncaption: 'Close',
        toolbar: 'yes'
      };
      // console.log('sending anchor to inappbrowser');
      try {
        target = (ionic.Platform.isIOS()) ? '_blank' : '_self';
        options.location = (ionic.Platform.isIOS()) ? 'no' : 'yes';
        options.toolbar = (ionic.Platform.isIOS()) ? 'yes' : 'no';
        event.preventDefault();
        $cordovaInAppBrowser.open(args.url, target, options)
          .then(function(event) {
            $ionicLoading.hide();
          })
          .catch(function(event) {
            $ionicLoading.hide();
          });
      } catch (e) {
        toastr.error('fail try');
      }
      // }
    });

    function newDevicePush(rid) {

      var model = $cordovaDevice.getModel();
      var platform = $cordovaDevice.getPlatform();
      var uuid = $cordovaDevice.getUUID();
      var version = $cordovaDevice.getVersion();

      var par = {
        deviceid: uuid,
        devicetoken: rid,
        deviceplatform: platform,
        devicemodel: model,
        deviceversion: version
      };

      User.registerNewDevice(par);

    }

    $timeout(function() {

      if(typeof device === 'undefined'){
        return false;
      }


      try {
        if (PushNotification && (device.platform == 'android' || device.platform == 'Android')) {

          push = PushNotification.init({
            "android": {
              "senderID": $scope.sid
            }
          });

          push.on('registration', function(data) {
            User.checkPush().then(function(dt) {
              // toastr.info(dt);
              if (dt.status == 1) {
                // toastr.info('device already available' + ' from home ctrl');
                // return false;
              } else if (dt.status == 0) {
                newDevicePush(data.registrationId);
                // toastr.info('new device from ctrl' + ' from home ctrl');
              }
            })
          });
          push.on('notification', function(data) {
            var msg = data.message;
            var title = data.title;


            cordova.plugins.notification.local.schedule({
              id: 9999,
              title: title,
              text: msg
            });

          });
          push.on('error', function(e) {
            toastr.error('e.message = ');
            toastr.error(e.message);
          });
        }
      } catch (err) {
        var txt = "Error = " + err.message;
        toastr.error('error 1');
        toastr.error(txt);
        $ionicLoading.hide();
      }
    }, 2000);

    if(ionic.Platform.isAndroid() == true){

      vm.homeUrl = '/home/root';

    }else{

      vm.homeUrl = '/home/rootIos';

    }

    $ionicSideMenuDelegate.canDragContent(false);

  };
})();
