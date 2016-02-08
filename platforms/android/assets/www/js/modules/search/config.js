(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home.searchcat', {
                    url: "/searchcat",
                    templateUrl: "js/modules/search/cat.html",
                    controller: "searchcatCtrl as sc",
                    resolve:{
                        categoryData : categoryData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Search'
                            });
                        }
                    }
                })
                .state('home.searchlist', {
                    url: "/searchlist/:id/:keyword/:title",
                    templateUrl: "js/modules/search/list.html",
                    controller: "searchlistCtrl as sl",
                    resolve:{
                        listData : listData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Search'
                            });
                        }
                    }
                })
                .state('home.searchitem', {
                    url: "/searchitem/:id",
                    templateUrl: "js/modules/search/item.html",
                    controller: "searchitemCtrl as dc",
                    resolve:{
                        itemData : itemData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Search'
                            });
                        }
                    }
                });
        });

        function itemData($stateParams,CommonServices){
          console.log($stateParams.id);
          var param = {
            'id' : $stateParams.id
          };
          // console.log(CommonServices.fetchPromise('search-item',param));
          return CommonServices.fetchPromise('search-item',param);
        }

      function listData($stateParams,CommonServices){
        // console.log($stateParams.id , $stateParams.keyword);
        var param = {
          'id' : $stateParams.id,
          'keywords' : $stateParams.keyword,
          'number' : 1
        };
        return CommonServices.fetchPromise('search-list',param);
      }

      function categoryData(CommonServices){
        var i, j, iCr, iCi; var returnObj = [];
        // return false;
        CommonServices.fetchPromise('search-category',{})
          .then(function(d){
              if(d.status == 1){
iCr = d.result.length;
try{
                for(i = 0; i < iCr; i++){
                  iCi = d.result[i].length;
                  for(j = 0; j < iCi; j++){
                      returnObj.push(d.result[i][j]);
                  }
                }
            }catch(e){
              console.log('incomming object parse error');
              return;
            }finally{
              return returnObj;
            }
          }else{
            return;
          }
            },function(d){

            });
            return returnObj;
      };

})();
