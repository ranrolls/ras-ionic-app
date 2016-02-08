(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider

                .state('home.directory', {
                    url: "/directory",
                    templateUrl: "js/modules/directory/category.html",
                    controller: "categoryCtrl as cc",
                    resolve:{
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Directory'
                            });
                        },
                        fetchCategoryData:fetchCategoryData
                    }
                })
                .state('home.directoryl', {
                    url: "/directoryl/:subCatId",
                    templateUrl: "js/modules/directory/subcat.html",
                    controller: "subcatCtrl as sc",
                    resolve:{
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Directory'
                            });
                        },
                        subCatName          : subCatName,
                        fetchSubCategoryList: fetchSubCategoryList
                    }
                })
                .state('home.directoryd', {
                    url: "/directoryd/:id",
                    templateUrl: "js/modules/directory/detail.html",
                    controller: "detailCtrl as dc",
                    resolve:{
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Directory'
                            });
                        },
                        fetchSubCategoryListItem:fetchSubCategoryListItem
                    }
                });
        });

    function fetchSubCategoryListItem($stateParams, Directory){
        return Directory.fetchSubCategoryListItem($stateParams.id);
    }

    function subCatName(Directory){
      return Directory.getSubCatName();
    }


    function fetchSubCategoryList($stateParams, Directory){
        if(typeof $stateParams.subCatId != "undefined"){
//            console.log($stateParams.subCatId);
            return Directory.fetchSubCategoryList($stateParams.subCatId);
        }else{
            return Directory.fetchSubCategoryList();
        }
    }

    function fetchCategoryData(Directory){
        return Directory.fetchCategoryData();
    }
})();
