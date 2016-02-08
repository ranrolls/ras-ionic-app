(function () {

    'use strict';
    
    var stopTime;
    
    angular.module('root')
            .config(function ($stateProvider, $urlRouterProvider) {

                $stateProvider
                        .state('home.contactUs', {
                            url: "/contactUs",
                            templateUrl: "js/modules/contact-us/view.html",
                            controller: "contactCtrl as cc",
                            resolve: {
                                menuText: menuText
                            }
                        })
                        .state('home.contactSuccess', {
                            url: "/contactSuccess",
                            templateUrl: "js/modules/contact-us/success.html",
                            resolve: {
                                menuText: menuText
                            }
                        });
            });
            
    function menuText($rootScope){
//        console.log('contact us config file menu text func');
         $rootScope.$broadcast('menutext', { 
             'text' : 'Contact Us'
         });
    }
    
})();