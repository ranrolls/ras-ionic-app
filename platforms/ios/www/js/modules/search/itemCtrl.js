(function () {
    'use strict';

    angular.module('root').controller('searchitemCtrl', ['itemData', searchitemCtrl]);

    function searchitemCtrl(itemData) {
      var vm = this; vm.data = [];



      if(itemData.status == 1){
        // console.log('status positive');
        vm.data = itemData.result[0];
      }else{
      //
      }

      console.log(vm.data);

    }
    ;

})();
