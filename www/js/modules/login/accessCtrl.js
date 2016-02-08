(function () {

    'use strict';

    angular.module('root').controller('AccessCtrl', [
        '$cordovaDevice', '$ionicLoading', '$rootScope', '$timeout',
        '$state', '$stateParams', '$scope',
        'GlobalVariables', 'toastr', 'User', 'GlobalUrl', AccessCtrl]);

    function AccessCtrl(
            $cordovaDevice, $ionicLoading, $rootScope, $timeout,
            $state, $stateParams, $scope,
            GlobalVariables, toastr, User, GlobalUrl) {

        var vm = this; vm.message = "This area is for registered members only. Please register to login.";

        //vm.params = [];
        var fromState = User.getFromState();
        var category_id = '';

        //console.log($stateParams.fromState);
        //console.log(fromState);
//        console.log($stateParams);

        if(User.getLoginStatus() == 0){

            User.setLoginStatus(0);
            if (fromState == 'discussion') {
//                console.log('access ctrl fromState = discussion');
                User.setFromState(fromState);
                $rootScope.$broadcast('menutext', {
                    'text': 'Discussion Forum'
                });
                //vm.params =  {'fromState': fromState,'category_id': category_id};
            } else if(fromState == 'fb') {
//                console.log('access ctrl fromState = fb');
                User.setFromState(fromState);
                $rootScope.$broadcast('menutext', {
                    'text': 'F&B Startup Kit'
                });
                //vm.params = {'fromState': 'fb'};
            } else {
                //vm.params = {'fromState': ''};
            };
        }else{
            if (fromState == 'discussion') {
                $timeout(function () {
                    $state.go('home.discussion');
                }, GlobalVariables.loaderDefaultTime);

            } else if (fromState == 'fb') {
                $timeout(function () {
                    $state.go('home.fb');
                }, GlobalVariables.loaderDefaultTime);

            } else {
                //vm.params = '';
            }
        };
        vm.login = function(){
            $state.go('home.login');
        };


    }
})();
