(function () {

    'use strict';

    angular.module('root')
            .config(function ($stateProvider, $urlRouterProvider) {

                $stateProvider

                        .state('home.news', {
                            url: "/news",
                            templateUrl: "js/modules/news/view.html",
                            controller: "newsCtrl as nc",
                            resolve: {
                                menuText: function ($rootScope) {
                                    $rootScope.$broadcast('menutext', {
                                        'text': 'News'
                                    });
                                },
                                setData: setData
                            }
                        })
                        .state('home.newsd', {
                            url: "/newsd/:id",
                            templateUrl: "js/modules/news/detail.html",
                            controller: "ndtCtrl as ndc",
                            resolve: {
                              menuText: function ($rootScope) {
                                  $rootScope.$broadcast('menutext', {
                                      'text': 'News'
                                  });
                              },
                                getData: getData
                            }
                        });
            });

    function getData($stateParams, News) {
        //console.log('get data from config file');
        if (typeof $stateParams.id != "undefined") {
            return News.getData($stateParams.id);
        } else {
            return News.getData();
        }
    }

    function setData(News) {
        News.initialiseFetchNumber();
        return true;
        // return News.fetchData();
    }

})();
