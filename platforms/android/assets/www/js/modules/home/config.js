(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    abstract: true,
                    url: "/home",
                    templateUrl: "js/modules/home/view.html",
                    controller: "HomeCtrl",
                    controllerAs: "lc"
                })
                .state('home.root', {
                    url: "/root",
                    templateUrl: "js/modules/home/root.html",
                    controller: "rootCtrl as rc",
                    resolve:{
                        menuText : function($rootScope, $ionicLoading) {
                          $ionicLoading.show();
                            $rootScope.$broadcast('menutext', {
                                'text' : 'root'
                            });
                        }
                    }
                })
                .state('home.aboutUsOld', {
                      url: "/about-us-old",
                      templateUrl: "js/modules/home/about-us.html",
                      controller: "aboutCtrl as ac",
                      resolve:{
                          //getAbout: getAbout,
                          menuText : function($rootScope) {
                              $rootScope.$broadcast('menutext', {
                                  'text' : 'About'
                              });
                          }
                      }
                  })
                ;
        });
})();
