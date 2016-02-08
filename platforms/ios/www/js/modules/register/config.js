(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home.register', {
                    url: "/register",
                    templateUrl: "js/modules/register/view.html",
                    controller: "RegisterCtrl as rc",
                    resolve: {
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Login '
                            });
                        }
                    }
                })
                .state('home.registerSuccess', {
                    url: "/registerSuccess",
                    templateUrl: "js/modules/register/success.html"
                })
                ;
        });
})();
