(function () {

    'use strict';

    angular.module('root').controller('catCtrl', [
        '$ionicLoading', '$scope', '$state', '$rootScope',
        '$stateParams', '$timeout', '$cordovaDialogs',
        'toastr', 'GlobalUrl', 'GlobalVariables', 'Forum', 'fetchCategoryData', catCtrl]);

    function catCtrl(
        $ionicLoading, $scope, $state, $rootScope,
        $stateParams, $timeout, $cordovaDialogs,
        toastr, GlobalUrl, GlobalVariables, Forum, fetchCategoryData
    ) {

        var vm = this;
        vm.us = false;  // user status

        vm.noSubCategoryFoundError = 'No subCategories found in this category';
        vm.categoryData = [];
        vm.subCategoryList = [];

        vm.error = true;
        vm.comments = false;

        $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )


        if (fetchCategoryData.status == 1) {
            vm.error = false;
            $.each(fetchCategoryData.result, function (i, v) {
                vm.categoryData.push(v);
            });
            //console.log(vm.categoryData);
        } else {
            vm.error = true;
            try {
                navigator.notification.confirm(vm.noSubCategoryFoundError, function () {
                }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
            } catch (e) {
                toastr.info(vm.noSubCategoryFoundError);
            }
        };

        vm.browse = function(url){
            //console.log(url);
            $rootScope.$broadcast('exLink', {
             'url': url
           });
        }

        $ionicLoading.hide();

    };

})();
