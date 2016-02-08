(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider

                .state('home.searchcat', {
                    url: "/searchcat",
                    templateUrl: "scripts/emailSignUp/email-signup.html"
                });
        });

})();