(function () {

    'use strict';

    angular.module('root').controller('detailCtrl', [
        'fetchSubCategoryListItem', detailCtrl]);

    function detailCtrl(fetchSubCategoryListItem) {

//        $ionicLoading.show({template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '});
        var vm = this;

        vm.currentItem = fetchSubCategoryListItem.result[0];

        //console.log(vm.currentItem);

    };

})();