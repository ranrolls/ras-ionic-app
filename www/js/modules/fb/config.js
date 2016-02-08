(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider

                .state('home.fb', {
                    url: "/fb",
                    templateUrl: "js/modules/fb/view.html",
                    controller: "fbCtrl as fb",
                    resolve:{
                        userRestrict:function(User, $state){
                            if(User.getLoginStatus() != 1){
                                //console.log('going to home login access');
                                User.setFromState('fb');
                                $state.go('home.loginAccess');
                            }
                        },
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'F&B Startup Kit'
                            });
                        }
                    }
                })
                .state('home.fbtest', {
                    url: "/fbtest",
                    templateUrl: "js/modules/fb/test.html",
                    controller: "fbtestCtrl as fbt",
                    resolve:{
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'F&B Startup Kit - tester'
                            });
                        }
                    }
                });
        });



})();
