(function() {

  'use strict';


  angular.module('root', [
      'ionic', 'ngCordova', 'common.services', 'angular-gestures', 'ngTouch',
      'angular-data.DSCacheFactory', 'ngAnimate', 'ionicLazyLoad',
      'toastr', 'ngSanitize'
    ])
    //        .run(function($cordovaSplashscreen) {
    //            //setTimeout(function() {
    //                $cordovaSplashscreen.hide();
    //            //}, 5000)
    //        })
    .run(function($ionicPlatform, $http, $state, toastr, DSCacheFactory) {


      //$cordovaSplashscreen.hide();
      $ionicPlatform.ready(function() {
        try {
          //StatusBar.hide();
          //navigator.splashscreen.show();
          screen.lockOrientation('portrait');
          //StatusBar.overlaysWebView(true);
          StatusBar.backgroundColorByHexString('#2a4c75');
          //$cordovaStatusbar.styleHex('#2a4c75');
          //StatusBar.styleDefault();
        } catch (e) {
          //toastr.error(e);
        }

        $ionicPlatform.registerBackButtonAction(function(event) {
          if (($state.$current.name == "home.root") ||
            ($state.$current.name == "home.userDetail") ||
              ($state.$current.name == "home.fb") ||
                ($state.$current.name == "home.forumTopic") ){
            // H/W BACK button is disabled for these states (these views)
            // Do not go to the previous state (or view) for these states.
            // Do nothing here to disable H/W back button.
          } else {
            // For all other states, the H/W BACK button is enabled
            navigator.app.backHistory();
          }
        }, 100);


        // $cordovaSplashscreen.hide();
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          cordova.plugins.Keyboard.disableScroll(true); // from new yo-ras
        }
        if (window.StatusBar) {
          StatusBar.overlaysWebView(true);
          StatusBar.style(1) //Light
          //StatusBar.styleDefault(); // from new yo-ras
        }

        DSCacheFactory("userDataCache", {
          storageMode: "localStorage",
          maxAge: 259200000,
          deleteOnExpire: "aggressive"
        });
        // 72 hrs.					// 1  min = 60000 ms
        // 1  hr = 3600000 ms		// 10 min = 600000 ms
        // 10 hr = 36000000 ms		// 30 min = 1800000 ms
        DSCacheFactory("replyListDataCache", {
          storageMode: "localStorage",
          maxAge: 5000, // age 5 sec
          deleteOnExpire: "aggressive"
        });
        DSCacheFactory("globalSettingCache", {
          storageMode: "localStorage"
        });

        DSCacheFactory('defaultCache', {
          maxAge: 900000, // Items added to this cache expire after 15 minutes.
          cacheFlushInterval: 3600000, // This cache will clear itself every hour.
          deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
        });

        $http.defaults.cache = DSCacheFactory.get('defaultCache');
      });

    })
    .config(['$httpProvider', function($httpProvider) {
      // enable http caching
      $httpProvider.defaults.cache = true;
    }])
    .config(function($stateProvider, $urlRouterProvider) {

        if(ionic.Platform.isAndroid() == true){

          $urlRouterProvider.otherwise('/home/root');

        }else{

          $urlRouterProvider.otherwise('/home/rootIos');

        }
      //  $urlRouterProvider.otherwise('/home/searchlist/11/15');
      //$urlRouterProvider.otherwise('/splash');
    })
    .config(function(toastrConfig) {
      angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true, //false,
        closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        extendedTimeOut: 10000,
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
        },
        maxOpened: 0,
        messageClass: 'toast-message',
        newestOnTop: true,
        onHidden: null,
        onShown: null,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        tapToDismiss: true,
        target: 'body',
        timeOut: 10000, //5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
      });
    })


  ;

  try {
    //StatusBar.hide();
    navigator.splashscreen.show();
    screen.lockOrientation('portrait');
    //StatusBar.overlaysWebView(true);
    //StatusBar.backgroundColorByHexString('#2a4c75');
    //$cordovaStatusbar.styleHex('#2a4c75');
    //StatusBar.styleDefault();

    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByHexString('#2a4c75');
    StatusBar.styleLightContent();

  } catch (e) {

  }

})();
