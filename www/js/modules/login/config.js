(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home.login', {
                    url: "/login",
                    templateUrl: "js/modules/login/view.html",
                    controller: "LoginCtrl as lc",
                    resolve:{
                        fromState : function(User){
                            // var fromState = User.getFromState();
                            // console.log('recalculate from state' , fromState);
                            // return fromState;
                            return User.getFromState();
                        },
                        menuLoginText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Login'
                            });
                        }
                    }
                })
                .state('home.loginSuccess', {
                    url: "/loginSuccess",
                    templateUrl: "js/modules/login/success.html"
                })
                .state('home.loginFail', {
                    url: "/loginFail",
                    templateUrl: "js/modules/login/fail.html"
                })
                .state('home.loginAccess', {
                    url: "/loginAccess",
                    templateUrl: "js/modules/login/access.html",
                    controller: "AccessCtrl as ac"

                });
        });

})();
