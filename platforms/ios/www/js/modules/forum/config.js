(function() {

  'use strict';

  angular.module('root')
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home.forumCat', {
          url: "/forumCat",
          templateUrl: "js/modules/forum/category.html",
          controller: "catCtrl as cc",
          resolve: {
            fetchCategoryData: fetchCategoryData,
            menuText: function($rootScope) {
              $rootScope.$broadcast('menutext', {
                'text': 'Discussion Forum'
              });
            }
          }
        })
        .state('home.forumSubCat', {
          url: "/forumSubCat/:sid",
          templateUrl: "js/modules/forum/subcat.html",
          controller: function($scope, $state, GlobalVariables, toastr, fetchSubCategoryData, Forum) {
            //console.log(fetchSubCategoryData);
            $scope.title, $scope.error = false;

            $scope.noSubCategoryFoundError = 'No subCategories found in this category';
            $scope.categoryData = [];

            $scope.accessTopicList = function(id){
              Forum.fetchTopicList(id).then(function(dt) {
                // console.log(dt);
                if (dt.status == 0) {

                  try {
                    $cordovaDialogs.alert('Data not available in selected category!', 'Info', 'Ok')
                      .then(function() {
                        // $state.go('home.forumCat');
                      });
                  } catch (e) {
                    alert('Data not available in selected category!');
                    // $state.go('home.forumCat');
                  }
                }else if(dt.status == 1){
                  $state.go('home.foruml', {
                    'catId': id
                  });
                }
              }, function(dt) {
              })
            }

            if (fetchSubCategoryData.status == '1') {
              $scope.title = fetchSubCategoryData.category_name;
              $.each(fetchSubCategoryData.result, function(i, v) {
                $scope.categoryData.push(v);
              });
            } else {
              $scope.error = true;
              try {
                navigator.notification.confirm($scope.noSubCategoryFoundError, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
              } catch (e) {
                toastr.info($scope.noSubCategoryFoundError);
              }
            }
          },
          resolve: {
            fetchSubCategoryData: fetchSubCategoryData,
            menuText: function($rootScope) {
              $rootScope.$broadcast('menutext', {
                'text': 'Discussion Forum'
              });
            }
          }
        })
        .state('home.foruml', {
          url: "/foruml/:catId",
          templateUrl: "js/modules/forum/topicList.html",
          controller: "topicCtrl as tc",
          resolve: {
            fetchTopicList: fetchTopicList,
            menuText: function($rootScope) {
                $rootScope.$broadcast('menutext', {
                  'text': 'Discussion Forum'
                });
              }
              // getLoginStatus: getLoginStatus
          }
        })
        .state('home.forumTopicC', {
          url: "/forumTopicC/:scid",
          templateUrl: "js/modules/forum/newTopic.html",
          controller: "topicCtrl as tc",
          resolve: {
            fetchTopicList: fetchTopicList,
            menuText: function($rootScope) {
              $rootScope.$broadcast('menutext', {
                'text': 'Discussion Forum'
              });
            }
          }
        })
        .state('home.forumTopic', {
          url: "/forumTopic/:threadId",
          templateUrl: "js/modules/forum/replyList.html",
          controller: "replyCtrl as rc",
          resolve: {
            menuText: function($rootScope) {
              $rootScope.$broadcast('menutext', {
                'text': 'Discussion Forum'
              });
            }
          }
        })
        .state('home.forumTopicR', {
          url: "/forumTopicR/:subject",
          templateUrl: "js/modules/forum/newReply.html",
          controller: "replyCtrl as rc",
          resolve: {
            menuText: function($rootScope) {
              $rootScope.$broadcast('menutext', {
                'text': 'Discussion Forum'
              });
            }
          }
        });
    });

  function fetchCategoryData(Forum) {
    return Forum.fetchCategoryData();
  }

  function fetchSubCategoryData($stateParams, Forum) {
    if (typeof $stateParams.sid != "undefined") {
      return Forum.fetchSubCatList($stateParams.sid);
    }
  }


  function fetchTopicList($stateParams, $cordovaDialogs, $state, Forum) {
    if (typeof $stateParams.catId != "undefined") {
      return Forum.fetchTopicList($stateParams.catId);

    }
  }


})();
