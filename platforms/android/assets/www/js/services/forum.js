(function() {
  'use strict';

  angular.module('root').factory('Forum', ['$http', '$q',
    'GlobalUrl', '$ionicLoading', 'toastr',
    Forum
  ]);

  function Forum($http, $q, GlobalUrl, $ionicLoading, toastr) {

    self.data;
    self.categoryData;
    self.firstCategoryFetch = true;
    self.filterField = 'cid';
    self.currentTopicCategoryId;
    self.currentTopicSubCategory = 1;
    self.currentTopic;

    function setCurrentTopicCategory(value) {
      self.currentTopicCategoryId = value;
    }

    function getCurrentTopicCategory() {
      return self.currentTopicCategoryId;
    }

    function setCurrentTopicSubCategory(value) {
      self.currentTopicSubCategory = value;
    }

    function getCurrentTopicSubCategory() {
      return self.currentTopicSubCategory;
    }

    function setCurrentTopic(value) {
      self.currentTopic = value;
    }

    function getCurrentTopic() {
      return self.currentTopic;
    }
    //
    function fetchReplyTopic(parameters) {
      var def1 = $q.defer(),
        cacheKey = 'replyList';
      $http.get(GlobalUrl.getUrl('forum-topic-reply'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def1.resolve(data);
      }).error(function(data, status, headers, config) {
        def1.reject("Failed to get data");
      });
      return def1.promise;
    }

    function fetchTopicItems(category_id) {

      //console.log('incomming cat Id is = ' + category_id);
      var def8 = $q.defer();

      var parameters = {
        'threadId': category_id,
        'rnd': new Date().getTime()
      };

      $http.get(GlobalUrl.getUrl('forum-topic-items'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def8.resolve(data);
        //                console.log('incommming subCatId id in fetchSubCatData is = ' + category_id);
        //                console.log(data);
      }).error(function(data, status, headers, config) {
        def8.reject("Failed to get data");
        //console.log('failed to get data in fetch sub category data');
        //                console.log(headers);
      });

      return def8.promise;
    }
    //
    function fetchTopicList(subCatId) {

      // console.log('incomming cat Id is = ' + subCatId);

      var def7 = $q.defer();

      var parameters = {
        'forumId': subCatId,
        'rnd': new Date().getTime()
      };

      $http.get(GlobalUrl.getUrl('forum-topic-list'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def7.resolve(data);
        //console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
        //console.log(data);
      }).error(function(data, status, headers, config) {
        def7.reject("Failed to get data");
        //console.log('failed to get data in fetch sub category data');
        //                console.log(headers);
      });

      return def7.promise;
    }
    //
    function fetchTopicCreate(parameters) {

      //            console.log('incomming cat Id is = ' + subCatId);
      var def1 = $q.defer();

      //            var parameters = { 'forumId': subCatId };

      $http.get(GlobalUrl.getUrl('forum-topic-create'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def1.resolve(data);
        //                console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
        //                console.log(data);
      }).error(function(data, status, headers, config) {
        def1.reject("Failed to get data");
        //                console.log('failed to get data in fetch sub category data');
        //                console.log(headers);
      });

      return def1.promise;
    }
    //
    function fetchCategoryData() {

      var def = $q.defer();
      $http.get(GlobalUrl.getUrl('forum-category'), {
        params: {}
      }).success(function(data, status, headers, config) {


        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        self.firstFetch = false;
        self.categoryData = data;
        def.resolve(data);
      }).error(function(data, status, headers, config) {
        toastr.error('no data from network for ' + headers);
        def.reject("Failed to get data");
      });
      return def.promise;
    }

    function fetchSubCatList(id) {
      // console.log('incomming id is : ' + id);
      var def5 = $q.defer();
      self.currentTopicSubCategory = id;

      var parameters = {
        'id': id,
        'rnd': new Date().getTime()
      };

      $http.get(GlobalUrl.getUrl('forum-subcat'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        self.firstFetch = false;
        self.categoryData = data;
        def5.resolve(data);
      }).error(function(data, status, headers, config) {
        toastr.error('no data from network for ' + headers);
        def5.reject("Failed to get data");
      });
      //console.log(def5.promise);
      return def5.promise;
    }
    //
    return {
      setCurrentTopicCategory: setCurrentTopicCategory,
      getCurrentTopicCategory: getCurrentTopicCategory,
      setCurrentTopicSubCategory: setCurrentTopicSubCategory,
      getCurrentTopicSubCategory: getCurrentTopicSubCategory,
      setCurrentTopic: setCurrentTopic,
      getCurrentTopic: getCurrentTopic,
      fetchReplyTopic: fetchReplyTopic,
      fetchTopicItems: fetchTopicItems,
      fetchTopicList: fetchTopicList,
      fetchTopicCreate: fetchTopicCreate,
      fetchSubCatList: fetchSubCatList,
      fetchCategoryData: fetchCategoryData
    };

  };
})();
