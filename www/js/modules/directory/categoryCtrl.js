(function () {

    'use strict';

    angular.module('root').controller('categoryCtrl', [
        '$state','Directory','fetchCategoryData', categoryCtrl]);

    function categoryCtrl($state, Directory, fetchCategoryData) {

//        $ionicLoading.show({template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '});
        var vm = this;

        vm.categoryData = fetchCategoryData.result;

        vm.redirectSubCatId = function (subCatId, subCatName) {
          // console.log('icomming value to redirectSubCatId are ', subCatId, '  ', subCatName);
          Directory.setSubCatName(subCatName);
            $state.go('home.directoryl', {subCatId: subCatId});
        }



    }
    ;

})();
