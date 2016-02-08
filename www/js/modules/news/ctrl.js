(function () {
    'use strict';

    angular.module('root').controller('newsCtrl', [
        '$state','$stateParams','toastr','$ionicLoading','$scope','$timeout',
        'GlobalVariables', 'News',
        newsCtrl
    ]);

    function newsCtrl(
            $state, $stateParams, toastr, $ionicLoading, $scope, $timeout,
            GlobalVariables, News
            ) {
        var vm = this;
        vm.news = [];

        vm.fetchOperation = false;
        vm.showFetcher = false;

        vm.paginationStatus = vm.yAxis = vm.xAxis = 0;
        vm.yStartAxis = vm.xEndAxis = 0;
        vm.yMoveAxis = vm.xEndAxis = 0;
        vm.yEndAxis = vm.xEndAxis = 0;

        vm.paginationMessage = "Pull to refresh";
        vm.paginationImage = "img/ras-app-image/pagination/pull.gif";
        vm.pullToRefresh = false;
        vm.releaseToRefresh = false;

        vm.setData = function () {
//            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
            // console.log('in set data');
            vm.showFetcher = true;
            $ionicLoading.hide();
            News.fetchData().then(function (dt) {
                if (dt.status == 1) {
                  // console.log(dt);
                  // console.log(News.getFetchNumber());
                    if (News.getFetchNumber() == 1) {
                      vm.showFetcher = true;
                        News.setFetchLimit(dt.num_pages);
                        News.setPacketSize(dt.result.length);
                    }
                    News.incrementFetchNumber();
                    $.each(dt.result, function (i0, v0) {
                        vm.news.push(v0);
                        News.updateData(vm.news);
                    });
                    $timeout(
                            function () {
                                $scope.$apply(function () {
                                    vm.fetchOperation = true;
                                    vm.showFetcher = true;
                                    $ionicLoading.hide();
                                });
                            },
                            GlobalVariables.listRefreshTime,
                            true
                            );
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.$apply(function () {
                        vm.fetchOperation = false;
                        vm.showFetcher = false;
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');

                    $ionicLoading.hide();
                    vm.showFetcher = false;
//                    console.log(vm.showFetcher);
                }
                ;
                $ionicLoading.hide();
            },function(){
              $scope.$apply(function () {
                  vm.fetchOperation = false;
                  vm.showFetcher = false;
              });
              $scope.$broadcast('scroll.infiniteScrollComplete');

              $ionicLoading.hide();
              vm.showFetcher = false;
            });
        };


        vm.loadMore = function () {
          // console.log('in loadMore');
//            console.log('getting more content');
            $ionicLoading.hide();
            if (vm.fetchOperation &&
                    News.getFetchNumber() != News.getFetchLimit()) {
                vm.fetchOperation = false;
                vm.setData();
            }
            ;
            // console.log('news.getFetchNumber = ', News.getFetchNumber() , ' news.getFetchLimit = ' , News.getFetchLimit());
            if (News.getFetchNumber() == News.getFetchLimit()) {

                vm.showFetcher = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                // toastr.error('fetchLimit reached');
//                console.log(vm.showFetcher);
            }
            $ionicLoading.hide();
        };
//        var ele = angular.element(document.querySelector('#contentDiv'));
        if (typeof $stateParams.id != "undefined") {
//            console.log($stateParams.id);
//            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
            News.getData($stateParams.id).then(function (dt) {

                if (dt.status == 1) {
                    vm.news = dt.result[0];
                } else {
                }
                ;
                $ionicLoading.hide();
            });
//            vm.news = News.getData($stateParams.id);
        } else {
            vm.setData();
        }
        ;

        $timeout(
                function () {
                    vm.fetchOperation = true;
                },
                GlobalVariables.listRefreshTime,
                false
                );
    }
    ;

})();
