(function () {

    'use strict';

    angular.module('root').controller('subcatCtrl', [
        'fetchSubCategoryList','subCatName', subcatCtrl]);

    function subcatCtrl(fetchSubCategoryList,subCatName) {

//        $ionicLoading.show({template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '});
        var vm = this;
        // console.log(subCatName);
vm.title = subCatName;

        vm.subCategoryList = fetchSubCategoryList.result;
// console.log(vm.subCategoryList);


    }
    ;

})();
