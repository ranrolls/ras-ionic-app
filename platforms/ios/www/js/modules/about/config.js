(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider) {

            $stateProvider
                .state('home.aboutUs', {
                    url: "/about-us",
                    templateUrl: "js/modules/about/view.html",
                    controller: "newCtrl as ac",
                    resolve:{
                        newD : newD,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'About'
                            });
                        }
                    }
                });
        });
          function newD(CommonServices){
            // return CommonServices.fetchPromise('about-us');
            return CommonServices.fetchPromise('about-us-content');

            // return true;
          }
})();
