(function() {

  'use strict';

  angular.module('root').controller('topicCtrl', [
    '$ionicLoading', 'toastr', '$state', '$scope', '$timeout',
    '$stateParams', '$rootScope', '$cordovaDialogs', 'Forum', 'User', 'fetchTopicList',
    topicCtrl
  ]);

  function topicCtrl(
    $ionicLoading, toastr, $state, $scope, $timeout,
    $stateParams, $rootScope, $cordovaDialogs, Forum, User, fetchTopicList) {

    var vm = this;
    vm.us = false; // user status
    vm.currentTopicCategoryId = 0;
    vm.error = false;
    vm.subCategoryList = [];

    vm.createNewTopic = function(form) {
      $ionicLoading.show({
          template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
        })
        // console.log('in create new topic');
      var user = User.getData();
      var cid = $stateParams.scid;
      var parameters = {
        id: cid,
        name: user.name,
        userid: user.id,
        subject: vm.subject,
        message: vm.message
      };
      Forum.fetchTopicCreate(parameters)
        .then(function(dt) {
          if (dt.status == 1) {
            vm.error = false;

            $state.go('home.foruml', {
              'catId': cid
            });

          } else {
            vm.error = true;
            $state.go('home.forumSubCat', {
              'sid': cid
            });
            try {
              navigator.notification.confirm(vm.noSubCategoryFoundError, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
            } catch (e) {
              //                                toastr.info(vm.noSubCategoryFoundError);
            }
          };
        }, function(dt) {
          try {
            navigator.notification.confirm(vm.noSubCategoryFoundError, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
          } catch (e) {
            //                            toastr.info(vm.noSubCategoryFoundError);
          }
        });
    };

    vm.accessDetail = function(category_id) {
      //console.log('incomming category_id ' + category_id);
      if (!vm.us) {
        User.setCid(category_id);
        User.setFromState('home.forumTopic');
        //User.setCtitle(category_title);
        $state.go('home.loginAccess');
      } else {
        var params = {
          'threadId': category_id
        };
        // console.log(params);
        $state.go('home.forumTopic', params);
      }
    }

    vm.us = (User.getLoginStatus() == 1) ? true : false;
    //        console.log(vm.user);

    $scope.$on('loginStatus', function(event, args) {
      //            console.log('in forumCtrl catched broadcast');
      var status = args.status;
      //            console.log(args);if
      if (status == 1 && !vm.us) {
        //                console.log('user login');
        vm.us = true;
      } else if (status == 0) {
        //                console.log('user logout');
        vm.us = false;
      };
      //            console.log(' vm. us change to = ' + vm.us);
    });

    var loadTopicList = function(force) {
      $ionicLoading.show({
        template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
      })
      if (force) {
        vm.subCategoryList = [];
        vm.currentTopicCategoryId = Forum.getCurrentTopicCategory();

        console.log('printing current topic cat id');
        console.log(vm.currentTopicCategoryId);

        var dta = Forum.fetchTopicList(vm.currentTopicCategoryId);
        // console.log(dta);
        dta.then(function(dt) {
          if (dt.status == 1) {
            // vm.currentTopicCategoryId = $stateParams.catId;
            Forum.setCurrentTopicCategory(vm.currentTopicCategoryId);

            vm.error = false;
            $.each(dt.result, function(i, v) {
              vm.subCategoryList.push(v);
            });
            $ionicLoading.hide();
            console.log(vm.subCategoryList);
          } else {
            $ionicLoading.hide();
            vm.error = true;
            try {
              $cordovaDialogs.alert('Data not available in selected category!', 'Info', 'Ok')
                .then(function() {
                  $state.go('home.discussion');
                });
            } catch (e) {
              alert('Data not available in selected category!');
              $state.go('home.discussion');
            }
          };
        });
      } else {
        var dt = fetchTopicList;

        // console.log('printing current topic cat id');
        // console.log(vm.currentTopicCategoryId);

        if (dt.status == 1) {

          Forum.setCurrentTopicCategory(vm.currentTopicCategoryId);

          vm.error = false;
          // vm.subCategoryList = [];
          //                    console.log(dt.result);
          vm.title = dt.category_name;
          $.each(dt.result, function(i, v) {
            vm.subCategoryList.push(v);
          });
          // console.log('success loadTopicList');
          //  console.log(vm.subCategoryList);
          $ionicLoading.hide();
        } else {
          $ionicLoading.hide();
          vm.error = true;
          // var sc = Forum.getCurrentTopicSubCategory();
          // console.log(sc);
          try {
            $cordovaDialogs.alert('Data not available in selected category!', 'Info', 'Ok')
              .then(function() {
                $state.go('home.forumCat');
                // $state.go('home.forumSubCat', {
                //     'sid': sc
                // });
              });
          } catch (e) {
            //                        toastr.info(vm.noSubCategoryFoundError);
            // console.log(Forum.getCurrentTopicSubCategory());
            toastr.info('Data not available in selected category!');
            $state.go('home.forumCat');
            // $state.go('home.forumSubCat', {
            //     'sid': sc
            // });
          }
          $ionicLoading.hide();
        };
      }
    };
    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        if (fromState.name == "home.forumTopicC") {
          $rootScope.$broadcast('hideBack');
          loadTopicList(true);
        }
        // else if (toState.name == "home.foruml" && vm.error == true){
        //   console.log('vm.error is set to true for this state');
        //   $state.go('home.forumCat');
        // }
      });
    var updateItems = function() {
      // console.log('updateItems func from topic Ctrl');
      vm.subCategoryList = [];
      loadTopicList(false);
    };
    if (typeof $stateParams.catId != "undefined") {
      vm.currentTopicCategoryId = $stateParams.catId;
      updateItems();
    }

    // $ionicLoading.hide();
  };
})();
