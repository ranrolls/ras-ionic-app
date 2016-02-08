(function () {

    'use strict';

    angular.module('root').controller('replyCtrl', [
        '$ionicLoading', '$scope', '$state', '$rootScope',
        '$stateParams', '$timeout', '$cordovaDialogs',
        'toastr', 'GlobalUrl', 'GlobalVariables', 'Forum', 'User', replyCtrl]);

    function replyCtrl(
        $ionicLoading, $scope, $state, $rootScope,
         $stateParams, $timeout, $cordovaDialogs,
        toastr, GlobalUrl, GlobalVariables, Forum, User) {

        var vm = this;
        vm.us = false; // user status

        vm.noSubCategoryFoundError = 'No subCategories found in this category';
        vm.categoryData = [];
        vm.title;
        vm.subCategoryList = [];

        vm.currentTopicCategoryId;
        vm.fetchedSubCategoryId;
        vm.fetchedSubCategoryTitle;
        vm.error = true;
        vm.comments = false;

        $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
// console.log('back in replyCtrl.js');

        var updateItems = function () {;
            // console.log('updateItems func from reply Ctrl');
            if (typeof $stateParams.threadId != "undefined" && User.getLoginStatus() != 1) {
                //$state.go('home.loginAccess', {
                //    'fromState': 'discussion',
                //    'threadId': $stateParams.threadId,
                //    'category_title': $stateParams.category_title
                //});
                $state.go('home.loginAccess');
            } else if (typeof $stateParams.threadId != "undefined") {
                vm.subCategoryList = [];
                //            vm.title = $stateParams.category_title;
                vm.us = true;
               console.log('threadId found = ' + $stateParams.threadId);
                //            console.log('category_title found = ' + $stateParams.category_title);
                vm.loadReplyList($stateParams.threadId);
            };
        }

        if(typeof $stateParams.subject != 'undefined'){
            vm.subject = $stateParams.subject;
        }

        vm.addNewItem = function (cat_id) {
            // console.log('incomming thread id is ' + cat_id);
            //    vm.subCategoryList = [];
            var dta = Forum.fetchTopicItems(cat_id);
            //
            dta.then(function (dt) {
//                console.log(dt);
                if (dt.status == 1) {
                    vm.subCategoryList = dt.result;
                    $state.go('home.forumTopic', {
                        'threadId': cat_id
                    });
                    $ionicLoading.hide();
                    //
                } else {
                    $ionicLoading.hide();
                    vm.error = true;

                };
            });
        }

        vm.loadReplyList = function (cat_id) {
             console.log('load reply list from forum ctrl');
            var dta = Forum.fetchTopicItems(cat_id);
            //            vm.subCategoryList = [];
            dta.then(function (dt) {
               console.log(dt);
                if (dt.status == 1) {
                    vm.title = dt.category_name;
                    vm.fetchedSubCategoryId = $stateParams.threadId;
                    Forum.setCurrentTopicSubCategory($stateParams.threadId);
                    vm.error = false;
                    vm.subCategoryList = [];
                    try {
                        $.each(dt.result, function (i, v) {
                            vm.subCategoryList.push(v);
                        });
                    } catch (e) {
                    }
                } else {
                    vm.title = 'Discussion Forum';
                    $ionicLoading.hide();
                    vm.error = true;
                };
            });
        };

        vm.us = (User.getLoginStatus() == 1) ? true : false;
        //        console.log(vm.user);

        $scope.$on('loginStatus', function (event, args) {
            //            console.log('in forumCtrl catched broadcast');
            var status = args.status;
            //            console.log(args);if
            if (status == 1 && !vm.us) {
                //                console.log('user login');
                vm.us = true;
            } else if (status == 0) {
                //                console.log('user logout');
                vm.us = false;
            };
            //            console.log(' vm. us change to = ' + vm.us);
        });

        vm.replyTopic = function (form) {
            // console.log('in replyTOpic ');
            $ionicLoading.show({
                template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
            })

            var user = User.getData();

            var rnDate = new Date().getTime();
            //forum_category_reply_topic.php?id=13&threadid=32&name=rasuser&userid=327&subject=Topics1&message=test
            var parameters = {
                id: Forum.getCurrentTopicCategory(),
                threadid: Forum.getCurrentTopicSubCategory(),
                name: user.name,
                userid: user.id,
                subject: vm.subject,
                message: vm.message,
                rnd : rnDate
            };

 console.log(parameters);

            Forum.fetchReplyTopic(parameters)
                .then(function (dt) {
                    if (dt.status == 1) {
                      console.log(dt);
                        vm.error = false;
                        // console.log('forum reply success');
                        vm.addNewItem(parameters.threadid);

                    } else {
                        //                        vm.error = true;
                        console.log('forum reply error');
                        try {
                            navigator.notification.confirm(vm.noSubCategoryFoundError, function () {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                        } catch (e) {
                            //                                toastr.info(vm.noSubCategoryFoundError);
                        }


                    };
                }, function (dt) {
                    try {
                        navigator.notification.confirm(vm.noSubCategoryFoundError, function () {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                    } catch (e) {}
                });
            $state.go('home.forumTopic', {
                'threadId': Forum.getCurrentTopicSubCategory()
            });
        };

        $ionicLoading.show({
            template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
        });

        $scope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
            //console.log(fromState.name, toState.name);
                if(fromState.name == "home.forumTopicR"){
                    $rootScope.$broadcast('hideBack');
                    updateItems();
                }
            });

        updateItems();

                // $ionicLoading.hide();
    };

})();
