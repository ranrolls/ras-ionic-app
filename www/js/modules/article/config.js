(function () {

    'use strict';

    angular.module('root')
      .config(function ($stateProvider, $urlRouterProvider) {
          $stateProvider
                  .state('home.article', {
                      url: "/article",
                      templateUrl: "js/modules/article/view.html",
                      controller: "articleCtrl as ac",
                      resolve: {
                          menuArticleText: function ($rootScope) {
                              $rootScope.$broadcast('menutext', {
                                  'text': 'Articles'
                              });
                          },
                          setData: setData
                      }
                  })
                  .state('home.articled', {
                      url: "/articled/:id",
                      templateUrl: "js/modules/article/detail.html",
                      controller: "adCtrl as adc",
                      resolve: {
                        menuArticleText: function ($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text': 'Articles'
                            });
                        },
                          getData: getData
                      }
                  });
      });

    function getData($stateParams, Articles) {
        if (typeof $stateParams.id != "undefined") {
            return Articles.getData($stateParams.id);
        } else {
            return Articles.getData();
        }
    }

    function setData(Articles) {
        Articles.initialiseFetchNumber();
        // return Articles.fetchData();
        return true;
    }

})();
