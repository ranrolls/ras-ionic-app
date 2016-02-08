(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('splash', {
                    url: "/splash",
                    templateUrl: "js/modules/splash/view.html",
                    controller: function ($state, GlobalVariables, $timeout) {
                        function timeFunc() {
                            $state.go('home.root');
                        }
                        $timeout(timeFunc, GlobalVariables.firstConfirmationCallPeriod);
                    },
                    controllerAs: 'c'
                });
        });

})();
