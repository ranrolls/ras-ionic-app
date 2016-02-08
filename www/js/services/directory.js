(function() {
  'use strict';

  angular.module('root').factory('Directory', ['$http', '$q', 'GlobalUrl', '$ionicLoading', Directory]);

  function Directory($http, $q, GlobalUrl, $ionicLoading) {

    self.categoryData;
    self.subCatName;
    self.categoryFilterField = 'id';
    self.firstFetch = true;

    function setSubCatName(name) {
      self.subCatName = name;
    }

    function getSubCatName() {
      return self.subCatName;
    }

    function fetchSubCategoryListItem(listingId) {
      var def4 = $q.defer();

      var parameters = {
        'listing_id': listingId
      };

      $http.get(GlobalUrl.getUrl('directory-sub-category-list-item'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def4.resolve(data);
        //                console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
        //                console.log(data);
      }).error(function(data, status, headers, config) {
        def4.reject("Failed to get data");
        //                console.log('failed to get data in fetch sub category data');
        //                console.log(headers);
      });

      return def4.promise;
    }

    function fetchSubCategoryList(subCatId) {
      var def3 = $q.defer();

      var parameters = {
        'subid': subCatId
      };

      $http.get(GlobalUrl.getUrl('directory-sub-category-list'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def3.resolve(data);
        //                console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
        //                console.log(data);
      }).error(function(data, status, headers, config) {
        def3.reject("Failed to get data");
        //                console.log('failed to get data in fetch sub category data');
        //                console.log(headers);
      });

      return def3.promise;
    }


    function fetchCategoryData(force) {
      var def = $q.defer();
      if (force || self.firstFetch) {
        $http.get(GlobalUrl.getUrl('directory-category-list'), {
          params: {}
        }).success(function(data, status, headers, config) {

          console.log(JSON.stringify(config.params));
          console.log(JSON.stringify(data));

          self.firstFetch = false;
          self.categoryData = data;
          def.resolve(data);
        }).error(function(data, status, headers, config) {
          def.reject("Failed to get data");
        });
        return def.promise;
      } else {
        //                console.log(self.categoryData);
        return self.categoryData;
      }

    }

    function getCategoryData(id) {
      if (typeof id == "undefined") {
        return self.categoryData;
      } else {
        var r;
        //                console.log('incomming id is = ' + id);
        var d = self.categoryData;

        //                console.log(d);

        $.each(d, function(i1, v1) {
          $.each(v1, function(i2, v2) {
            if (i2 == self.categoryFilterField && v2 == id) {
              r = v1;
            }
          });
        });
        //                console.log('result from news service = ' + r);
        return r;
      }
    }

    function setCategoryData(data) {
      if (typeof data == "undefined") {
        self.categoryData = {
          "status": "1",
          "result": [{
            "id": "2",
            "title": "Category Test1",
            "parent_id": "1",
            "level": "1"
          }, {
            "id": "3",
            "title": "Category2",
            "parent_id": "1",
            "level": "1"
          }, {
            "id": "4",
            "title": "Category3",
            "parent_id": "1",
            "level": "1"
          }, {
            "id": "5",
            "title": "Category4",
            "parent_id": "1",
            "level": "1"
          }, {
            "id": "6",
            "title": "Category5",
            "parent_id": "1",
            "level": "1"
          }, {
            "id": "7",
            "title": "Category6",
            "parent_id": "1",
            "level": "1"
          }]
        };
      } else {
        self.categoryData = data;
      }

    }

    self.sampleSubCategories = [{
      "subid": "16",
      "title": "Sub Category4",
      "introtext": "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has&nbsp;",
      "params": null,
      "fulltext": "",
      "created": null,
      "intro_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "detail_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "urls": null,
      "urla": null,
      "urlatext": null,
      "urlb": null,
      "urlbtext": null,
      "urlc": null,
      "urlctext": null,
      "attribs": null
    }, {
      "subid": "17",
      "title": "Sub Category5",
      "introtext": "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has&nbsp;",
      "params": null,
      "fulltext": "",
      "created": null,
      "intro_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "detail_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "urls": null,
      "urla": null,
      "urlatext": null,
      "urlb": null,
      "urlbtext": null,
      "urlc": null,
      "urlctext": null,
      "attribs": null
    }, {
      "subid": "18",
      "title": "Sub Category7",
      "introtext": "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has&nbsp;",
      "params": null,
      "fulltext": "",
      "created": null,
      "intro_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "detail_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "urls": null,
      "urla": null,
      "urlatext": null,
      "urlb": null,
      "urlbtext": null,
      "urlc": null,
      "urlctext": null,
      "attribs": null
    }, {
      "subid": "8",
      "title": "Sub Category1",
      "introtext": "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has&nbsp;",
      "params": null,
      "fulltext": "",
      "created": null,
      "intro_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "detail_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "urls": null,
      "urla": null,
      "urlatext": null,
      "urlb": null,
      "urlbtext": null,
      "urlc": null,
      "urlctext": null,
      "attribs": null
    }, {
      "subid": "9",
      "title": "Sub Category2",
      "introtext": "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has&nbsp;",
      "params": null,
      "fulltext": "",
      "created": null,
      "intro_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "detail_image": "http:\/\/ras.refine-dev.com\/media\/com_judirectory\/images\/category\/detail\/",
      "urls": null,
      "urla": null,
      "urlatext": null,
      "urlb": null,
      "urlbtext": null,
      "urlc": null,
      "urlctext": null,
      "attribs": null
    }];

    return {
      sampleSubCategories: sampleSubCategories,
      fetchSubCategoryListItem: fetchSubCategoryListItem,
      fetchSubCategoryList: fetchSubCategoryList,
      fetchCategoryData: fetchCategoryData,
      setCategoryData: setCategoryData,
      getCategoryData: getCategoryData,
      setSubCatName: setSubCatName,
      getSubCatName: getSubCatName
    };
  };
})();
