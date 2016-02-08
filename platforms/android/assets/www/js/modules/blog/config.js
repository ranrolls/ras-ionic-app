(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home.blog', {
                    url: "/blog",
                    templateUrl: "js/modules/blog/category.html",
                    controller: "blogCtrl as dc",
                    resolve:{ 
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', { 
                                'text' : 'Blog'
                            });
                        },
                        fetchCategoryData : fetchCategoryData

                    }
                })
                .state('home.blogl', {
                    url: "/blogl/:catId",
                    templateUrl: "js/modules/blog/view.html",
                    controller: "blogCtrl as bc",
                    resolve:{ 
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', { 
                                'text' : 'Blog'
                            });
                        },
                        fetchCategoryList:fetchCategoryList
                    }
                })
                .state('home.blogd', {
                    url: "/blogd/:id",
                    templateUrl: "js/modules/blog/detail.html",
                    controller: "blogCtrl as bc",
                    resolve:{ 
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', { 
                                'text' : 'Blog Details'
                            });
                        },
                        fetchCategoryListItem:fetchCategoryListItem
                    }
                });
        });
    
    function fetchCategoryData(Blog){
        return Blog.fetchCategoryData();
    }
    
    function fetchCategoryList($stateParams, Blog){
        
        if(typeof $stateParams.catId != "undefined"){
            return Blog.fetchCategoryList($stateParams.catId);
        }
        
    }
    
    function fetchCategoryListItem($stateParams, Blog){
        if(typeof $stateParams.id != "undefined"){
            return Blog.fetchCategoryListItem($stateParams.id);
        }
    }
})();