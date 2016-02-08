(function () {
    'use strict';

    angular.module('root').controller('newCtrl', [ '$state', '$scope', 'newD', newCtrl ]);

    function newCtrl($state,$scope,newD) {

// console.log(newD);
      $scope.html = newD.introtext;

      var vm = this;

      vm.data = {}, vm.img = '', vm.introtext = '';

      vm.data = newD;
        // console.log('new');
        // console.log(newD.introtext);
        // $scope.html = newD.introtext;


    }
    ;
// console.log('func');
})();
