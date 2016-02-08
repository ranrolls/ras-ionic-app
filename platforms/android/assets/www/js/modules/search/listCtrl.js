(function () {
    'use strict';

    angular.module('root').controller('searchlistCtrl', ['$state' ,'$stateParams' ,'listData', searchlistCtrl]);

    function searchlistCtrl($state, $stateParams ,listData) {
        var vm = this; vm.error = false;
        if(listData.result.length > 0){
          vm.listData = listData.result;
        }else{
          vm.error = true;
        }

        // console.log(vm.listData);
        //
        // console.log($stateParams);
//
        vm.item = function(id,title){
          // console.log('keyword is = ' + $stateParams.keyword);
          // console.log('id is = ' + id);
          // console.log('title is = ' + $stateParams.title.toLowerCase());
var module = $stateParams.title.toLowerCase();

var params = {
  'id' : id
}

          switch (module) {
            case 'articles':
              $state.go('home.articled', params);
              break;

            case 'news' :
              $state.go('home.newsd', params);
              break;

            case 'directory' :
              $state.go('home.directoryd', params);
              break;

            default: break;

          }
        }


    }
    ;

})();
