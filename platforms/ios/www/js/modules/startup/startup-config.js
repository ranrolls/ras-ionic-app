(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('startup', {
                    abstract: true,
                    url: "/startup",
                    templateUrl: "js/modules/startup/startup.html"
                })
                .state('startup.cordova', {
                    url: "/cordova",
                    templateUrl: "js/modules/startup/startup-cordova.html"
                })
                .state('startup.productUpdate', {
                    url: "/productUpdate",
                    templateUrl: "js/modules/startup/startup-productUpdate.html"
                });
        });
})();