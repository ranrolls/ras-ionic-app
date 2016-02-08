(function () {
    'use strict';

    angular.module('root').controller('searchcatCtrl', ['$state','categoryData', searchcatCtrl]);

    function searchcatCtrl($state, categoryData) {
        var vm = this;
        vm.catList = categoryData;
        vm.result = false;
        vm.keyword = "";

        // console.log(vm.catList);
        // console.log(categoryData);

        vm.updateCatList = function () {
            // console.log('keywork changed to ' + vm.keyword);
            vm.result = false;
            if(vm.keyword == "") return;
            vm.result = true;


        };

        // console.log(vm.catList);

        vm.redirectItem = function (id, title) {
          // console.log('incomming selected cat id is ' , id);
          var param = {
            'id' : id,
            'keyword' : vm.keyword,
            'title' : title
          };

          $state.go('home.searchlist',param);

        }


    }
    ;

})();
