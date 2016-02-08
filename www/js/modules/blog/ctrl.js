(function () {

    'use strict';

    angular.module('root').controller('blogCtrl', ['GlobalUrl', 'GlobalVariables',
        '$ionicLoading', 'toastr', '$scope', '$state', '$stateParams', '$timeout',
        'Blog', blogCtrl]);

    function blogCtrl(GlobalUrl, GlobalVariables,
            $ionicLoading, toastr, $scope, $state, $stateParams, $timeout, Blog) {

        var vm = this;
        $ionicLoading.show();

//        console.log('blog ctrl start');

        vm.noSubCategoryFoundError = 'No subCategories found in this category';
        vm.categoryData = [];
        vm.fetchedSubCategoryData = ['j', 'k'];
        vm.subCategoryList = [];
        vm.currentItem = [];
        vm.commentsData = [];

        vm.error = true;
        vm.comments = false;


        vm.addComment = function (form, cid) {
//            console.log('adding comment');

            $ionicLoading.show();
            var dtta = Blog.addComment(cid, vm.add.userName, vm.add.commentEmail, vm.add.commentText);
            dtta.then(function (drt) {
//                console.log(drt);
                if (drt.status == 1) {
                    $.each(drt.result, function (i, v) {
                        try {
                            navigator.notification.confirm(v, function () {
                            }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                        } catch (e) {
                            toastr.info(v);
                        }
                    });
                } else {
                    try {
                        navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                        }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                    } catch (e) {
                        toastr.info(vm.noSubCategoryFoundError + 1);
                    }
                }
                ;
            });

            $timeout(function () {
                $ionicLoading.hide();
            }, GlobalVariables.stateChangeLoaderTime);
        };


        vm.fetchCategoryListItemComments = function (cid) {
//            console.log('clicked fetchCategoryListItemComments');
//            console.log('incomming to redirect sub cat id is = ' + cid);
            $ionicLoading.show();
            var dta = Blog.fetchCategoryListItemComments(cid);
            dta.then(function (dt) {

//                console.log(dt);                
                if (dt.status == 1) {
                    vm.comments = true;
                    vm.commentsData = [];
                    $.each(dt.result, function (i, v) {
                        //                    v.items = Directory.sampleSubCategories;
                        vm.commentsData.push(v);
                    });
//                    console.log('vm.data value is = ', vm.commentsData);
                } else {
                    vm.comments = false;
                    try {
                        navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                        }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                    } catch (e) {
                        toastr.info(vm.noSubCategoryFoundError + 1);
                    }
                }
                ;
            });

            $timeout(function () {
                $ionicLoading.hide();
            }, GlobalVariables.stateChangeLoaderTime);

        }

        if (typeof $stateParams.id != "undefined") {
            var dta = Blog.fetchCategoryListItem($stateParams.id);
            dta.then(function (dt) {
//                console.log(dt);                
                if (dt.status == 1) {
                    vm.error = false;
                    vm.currentItem = [];
                    $.each(dt.result, function (i, v) {
                        //                    v.items = Directory.sampleSubCategories;
                        vm.currentItem = v;
                    });
//                    console.log('vm.data value is = ', vm.currentItem);
                    if (vm.currentItem.length < 1) {
                        try {
                            navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                            }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                        } catch (e) {
                            toastr.info(vm.noSubCategoryFoundError + 2);
                        }
                    }
                } else {
                    try {
                        navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                        }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                    } catch (e) {
                        toastr.info(vm.noSubCategoryFoundError + 1);
                    }
                };
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, GlobalVariables.listRefreshTime);
        }
        else if (typeof $stateParams.catId != "undefined") {
            var dta = Blog.fetchCategoryList($stateParams.catId);
            
            dta.then(function (dt) {
                $ionicLoading.hide();
//                console.log(dt);                
                if (dt.status == 1) {
                    vm.error = false;
                    vm.subCategoryList = [];
                    $.each(dt.result, function (i, v) {
                        //                    v.items = Directory.sampleSubCategories;
                        vm.subCategoryList.push(v);
                    });
//                        console.log('vm.data value is = ', vm.subCategoryList);
                    if (vm.subCategoryList.length < 1) {
                        try {
                            navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                            }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                        } catch (e) {
                            toastr.info(vm.noSubCategoryFoundError + 2);
                        }
                    }
                } else {
                    try {
                        navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                        }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                    } catch (e) {
                        toastr.info(vm.noSubCategoryFoundError + 1);
                    }

                }
                ;
            });

        }
        else {
            // if no id found
            // 
            var dt = Blog.fetchCategoryData();

            if (dt.status == 1) {
                vm.error = false;
                $.each(dt.result, function (i, v) {
//                    v.items = Directory.sampleSubCategories;
                    vm.categoryData.push(v);
                });
//                console.log('vm.data value is = ', vm.categoryData);
            } else {
                vm.error = true;
                try {
                    navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                    }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                } catch (e) {
                    toastr.info(vm.noSubCategoryFoundError);
                }
            }
            ;
            $ionicLoading.hide();
//            console.log(vm.categoryData);
        }

    }
    ;

})();