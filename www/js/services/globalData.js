(function() {
  'use strict';

  angular.module('root').factory('GlobalData', ['GlobalUrl', '$http', '$q', '$ionicLoading', 'DSCacheFactory', GlobalData]);

  function GlobalData(GlobalUrl, $http, $q, $ionicLoading, DSCacheFactory) {


    //self.userDataCache = DSCacheFactory.get("userDataCache");
    //self.userDataCache.put("loginStatus", 0);

    self.loginStatus = 0;
    self.data;

    function getAbout() {
      var handler = $q.defer();
      $http.get(GlobalUrl.getUrl('about-us'), {
        params: {}
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        handler.resolve(data);
      }).error(function(data, status, headers, config) {
        handler.reject("Failed to get data");
      });
      return handler.promise;
    }

    function setData(un, p) {
      var def = $q.defer();
      $http.get(GlobalUrl.getUrl('login'), {
        params: {
          password: p,
          username: un
        }
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        self.data = data;
        def.resolve(data);
      }).error(function(data, status, headers, config) {
        def.reject("Failed to get data");
      });
      return def.promise;
    }

    function setLoginStatus(status) {
      self.loginStatus = status;
    }

    function getLoginStatus() {
      var status = self.loginStatus;
      return status;
    }

    function editData(parameters) {
      var def2 = $q.defer();
      //            console.log(parameters);
      $http.get(GlobalUrl.getUrl('edit_profile'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        //                console.log(data);
        def2.resolve(data);
      }).error(function(data, status, headers, config) {
        def2.reject('Failed to get data');
        console.log('failed to get data');
      });
      return def2.promise;
    }

    function updatedData(data) {
      self.data = data;
    }

    function register(parameters) {
      var def3 = $q.defer();
      //            console.log(parameters);
      $http.get(GlobalUrl.getUrl('registration'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        // console.log(data);
        def3.resolve(data);
      }).error(function(data, status, headers, config) {
        def3.reject('Failed to get data');
        console.log('failed to get data');
      });
      return def3.promise;
    }

    function forgotPaswordEmail(parameters) {
      var def4 = $q.defer();
      //            console.log(parameters);
      $http.get(GlobalUrl.getUrl('forgot_pasword_email'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        // console.log(data);
        def4.resolve(data);
      }).error(function(data, status, headers, config) {
        def4.reject('Failed to get data');
        console.log('failed to get data');
      });
      return def4.promise;
    }

    function forgotPaswordVerify(parameters) {
      var def5 = $q.defer();
      //            console.log(parameters);
      $http.get(GlobalUrl.getUrl('forgot_pasword_verify'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        // console.log(data);
        def5.resolve(data);
      }).error(function(data, status, headers, config) {
        def5.reject('Failed to get data');
        console.log('failed to get data');
      });
      return def5.promise;
    }

    function forgotPaswordReset(parameters) {
      var def6 = $q.defer();
      //            console.log(parameters);
      $http.get(GlobalUrl.getUrl('forgot_pasword_reset'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        // console.log(data);
        def6.resolve(data);
      }).error(function(data, status, headers, config) {
        def6.reject('Failed to get data');
        console.log('failed to get data');
      });
      return def6.promise;
    }

    return {
      getAbout: getAbout,
      setLoginStatus: setLoginStatus,
      setData: setData,
      getLoginStatus: getLoginStatus,
      editData: editData,
      updatedData: updatedData,
      register: register,
      forgotPaswordEmail: forgotPaswordEmail,
      forgotPaswordVerify: forgotPaswordVerify,
      forgotPaswordReset: forgotPaswordReset
    };
  };
})();
