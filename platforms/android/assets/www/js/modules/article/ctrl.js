(function () {

    'use strict';

    angular.module('root').controller('articleCtrl', ['$state', '$rootScope','$ionicModal',
        '$stateParams', '$ionicLoading', '$timeout', '$scope', '$document',
        'toastr', 'GlobalUrl', 'GlobalVariables', 'Articles', articleCtrl]);

    function articleCtrl($state, $rootScope, $ionicModal,
                         $stateParams, $ionicLoading, $timeout, $scope, $document,
                         toastr, GlobalUrl, GlobalVariables, Articles) {

        var vm = this, i = 1;
        vm.data = [];

        vm.fetchOperation = false;

        vm.paginationStatus = vm.yAxis = vm.xAxis = 0;
        vm.yStartAxis = vm.xEndAxis = 0;
        vm.yMoveAxis = vm.xEndAxis = 0;
        vm.yEndAxis = vm.xEndAxis = 0;

        vm.paginationMessage = "Pull to refresh";
        vm.paginationImage = "img/ras-app-image/pagination/pull.gif";
        vm.pullToRefresh = false;
        vm.releaseToRefresh = false;

//        $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
//        $ionicLoading.show({
//            duration: 5000
//        });


        vm.setData = function () {
            // console.log('in set data');
            $ionicLoading.hide();
//            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
            Articles.fetchData().then(function (dt) {
                // console.log(dt);
                if (dt.status == 1) {
                    // console.log(' Articles.getFetchNumber() is ', Articles.getFetchNumber());
                    if (Articles.getFetchNumber() == 1) {
                        vm.fetchOperation = true;
                        Articles.setFetchLimit(dt.num_pages);
                        // console.log('fetch limit set to : ', Articles.getFetchLimit());
                    }
                    Articles.incrementFetchNumber();
                    $.each(dt.result, function (i0, v0) {
                        vm.data.push(v0);
                        Articles.updateData(vm.data);
//                        console.log(vm.data);
                    });
//                    console.log('incomming data');
                    $timeout(
                        function () {
//                                toastr.success("4 - x");
                            $scope.$apply(function () {
                                vm.fetchOperation = true;
                                $ionicLoading.hide();
                                $scope.$broadcast('scroll.infiniteScrollComplete');
//                                vm.paginationStatus = 0;
//                                vm.paginationMessage = "Pull to refresh";
//                                vm.paginationImage = "img/ras-app-image/pagination/pull.gif";
//                                vm.paginationBox = false;
                            });
//                                    $('#paginationImage').css('display', 'block');
                        },
                        GlobalVariables.listRefreshTime,
                        true
                    );


                } else {
                    $scope.$apply(function () {
                        vm.fetchOperation = false;
//                        Articles.initialiseFetchNumber();
//                        vm.paginationStatus = 0;
//                        vm.paginationMessage = "Pull to refresh";
//                        vm.paginationImage = "img/ras-app-image/pagination/pull.gif";
//                        vm.paginationBox = false;
                    });
//                    $('#paginationImage').css('display', 'block');
//                    $('.paginationBox, ion-infinite-scroll').css('display', 'none');
//                    toastr.error('fetch operation false & fetch number 1');
//                    $ionicLoading.hide();
                }
                ;
//                $ionicLoading.hide();
            });
//            $ionicLoading.hide();
        };

        vm.loadMore = function () {
//            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
            //  console.log('getting more content');
            $ionicLoading.hide();
            if (vm.fetchOperation &&
                Articles.getFetchNumber() != Articles.getFetchLimit()
            ) {
//                $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )

                vm.fetchOperation = false;

//                vm.paginationBox = true;
//                vm.paginationStatus = 1;

                vm.setData();
            }
            ;

            if (Articles.getFetchNumber() == Articles.getFetchLimit()) {
                vm.fetchOperation = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                // console.log(vm.fetchOperation);
            }
            $ionicLoading.hide();
        };

//        vm.openbrowser = function(e){
//            //console.log(e);
//            //toastr.info('openbrowser');
//            //console.log(e);            console.log(e.target);
//            //var nt = e.target;
//try {
//    toastr.info(' e.target is ' + e.target);
//    var anchor = e.target.getAttribute('openbrowser').trim();
//    toastr.info(anchor);
//    console.log(anchor);
//
//    //if (!ionic.Platform.isAndroid() || !ionic.Platform.isIOS()) return;
//    if (!anchor) return;
//
//    //$ionicModal.fromTemplateUrl(anchor, {
//    //    scope: $scope,
//    //    animation: 'slide-in-up'
//    //}).then(function(modal) {
//    //    $scope.modal = modal;
//    //});
//    //
//    //$scope.modal.show();
//
//    //window.open(anchor,'_system');
//
//    //$scope.$apply(function () {
//    //    console.log('if set to true');
//    //    vm.if = true;
//    //    vm.ifUrl = anchor;
//    //});
//
//}catch(e){
//    toastr.error('iframe');
//}
//            //toastr.info('ifUrl set to ' + vm.ifUrl);
//
//            //console.log(e.target.nodeType);
//
////            var target = '_self';
////            //var target = '_blank';
////            // _blank is opening in outside browser
////            // _system is opening in outside browser
////            var options = {
////                location: 'no',
////                clearcache: 'yes',
////                toolbar: 'no'
////            };
//////var options = {
////            //    location: 'yes',
////            //    clearcache: 'yes',
////            //    toolbar: 'no'
////            //};
////toastr.info('sending anchor to inappbrowser');
//            //window.open(url, '_blank', 'location=no');
//            //window.open(anchor, target, 'location=no');
//            //try {
//            //    $cordovaInAppBrowser.open(anchor, target, options)
//            //        .then(function (event) {
//            //            // success
//            //            //toastr.success('success link open');
//            //        })
//            //        .catch(function (event) {
//            //            //toastr.error('error link open');
//            //            // error
//            //        });
//            //} catch (e) {
//            //    toastr.error('fail try');
//            //}
//            console.log('click');
//        }

        //$rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
        //    $cordovaInAppBrowser.insertCSS({
        //        code: 'body {padding-top: 100px !important; background-color:red;}'
        //    });
        //
        //    var com_ras_h1 = "<h1 class='com_ras_h1'>New Head</h1>";
        //    com_ras_h1 += "";
        //
        //    // insert Javascript via code / file
        //    $cordovaInAppBrowser.executeScript({
        //        //file: 'script.js'
        //        code: "angular.element('body').prepend(" + com_ras_h1 + ");"
        //    });
        //});

        //
        //$rootScope.$on("$cordovaInAppBrowser:loadstop", function(event, result) {
        //    toastr.info('executing from in app browser');
        //    // Clear out the name in localStorage for subsequent opens.
        //    cordovaInAppBrowser.executeScript({
        //        code: "toastr.info('execute script');"
        //    });
        //
        //    // Start an interval
        //    var loop = setInterval(function() {
        //        //
        //        // Execute JavaScript to check for the existence of a name in the
        //        // child browser's localStorage.
        //        cordovaInAppBrowser.executeScript({
        //                code: ""
        //            },
        //            function(values) {
        //                var name = values[0];
        //                console.log('entro aqui')
        //                // If a name was set, clear the interval and close the InAppBrowser.
        //                if (name) {
        //                    clearInterval(loop);
        //                    cordovaInAppBrowser.close();
        //                    //$("h1").html("Welcome " + name + "!");
        //                }
        //            }
        //        );
        //    });
        //});


        if (typeof $stateParams.id != "undefined") {
            Articles.getData($stateParams.id).then(function (dt) {
                if (dt.status == 1) {
                    vm.data = dt.result[0];
                    // $timeout(function(){
                    //     console.log(vm.data.introtext);
                    //     angular.element($document[0].querySelector('#articleIntroText')).innerHTML(vm.data.introtext);
                    // },5000);

                } else {
                    $state.go();
                }
                ;
//                $ionicLoading.hide();
            });
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
    ;   // controller ends here

})();
