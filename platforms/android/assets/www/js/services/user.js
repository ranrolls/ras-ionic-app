(function() {

  'use strict';

  angular.module('root').factory('User', [
    'GlobalUrl', '$http', '$q', '$rootScope', '$state',
    '$ionicLoading', '$cordovaDevice', 'toastr', User
  ]);

  function User(
    GlobalUrl, $http, $q, $rootScope, $state,
    $ionicLoading, $cordovaDevice, toastr
  ) {

    self.loginStatus = 0;
    self.data = {};
    self.fromState;
    self.cid;
    self.ctitle;
    var rnd;

    function updateNotificationRead() {

    }

    function registerNewDevice(par) {
      $http.get(GlobalUrl.getUrl('push-step-one'), {
        params: par
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        // toastr.success('value send to serve');
      }).error(function(data, status, headers, config) {
        $state.go('home.root');
        // taostr.error('unable to send values');
      });
    }

    function checkPush() {

      var platform = $cordovaDevice.getPlatform();
      var uuid = $cordovaDevice.getUUID();

      var def21 = $q.defer();
      rnd = new Date().getTime();
      $http.get(GlobalUrl.getUrl('push-step-one'), {
        params: {
          deviceid: uuid,
          devicetoken: 126,
          deviceplatform: platform,
          rnd: rnd
        }
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        def21.resolve(data);
      }).error(function(data, status, headers, config) {
        def21.reject("Failed to get data");
        $state.go('home.root');
      });
      return def21.promise;
    }

    function setCtitle(title) {
      self.ctitle = title;
      return true;
    }

    function getCtitle() {
      return self.ctitle;
    }

    function setFromState(state) {
      self.fromState = state;
    }

    function getFromState() {
      if (self.fromState == "") {
        self.fromState = "ud"
      };
      return self.fromState;
    }

    function setCid(id) {
      self.cid = id;
      return true;
    }

    function getCid() {
      return self.cid;
    }

    function getData() {
      return self.data;
    }

    function setData(un, p, devicetoken, deviceplatform, devicemodel, deviceversion) {
      var def = $q.defer();
      rnd = new Date().getTime();
      $http.get(GlobalUrl.getUrl('login'), {
        params: {
          password: p,
          username: un,
          devicetoken: devicetoken,
          deviceplatform: deviceplatform,
          devicemodel: devicemodel,
          deviceversion: deviceversion,
          rnd: rnd
        }
      }).success(function(data, status, headers, config) {


        // console.log(JSON.stringify(config.params));
        // console.log(JSON.stringify(data));

        self.data = data.result;
        // console.log(data.result);
        setLoginStatus(1);
        def.resolve(self.data);
      }).error(function(data, status, headers, config) {
        def.reject("Failed to get data");
        $state.go('home.root');
      });
      return def.promise;
    }

    function setLoginStatus(status) {
      self.loginStatus = status;
      //            console.log('set login status' + status);
      $rootScope.$broadcast('loginStatus', {
        'status': status
      });
    }

    function getLoginStatus() {
      var status = self.loginStatus;
      if (status == 0 || status == 1) {
        return status;
      } else {
        User.setLoginStatus(0);
        $state.go('home.login');
      }
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
        $state.go('home.root');
        //                console.log('failed to get data');
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

        //                console.log(data);
        def3.resolve(data);
      }).error(function(data, status, headers, config) {
        def3.reject('Failed to get data');
        $state.go('home.root');
        //                console.log('failed to get data');
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
        //                console.log(data);
        def4.resolve(data);
      }).error(function(data, status, headers, config) {
        def4.reject('Failed to get data');
        $state.go('home.root');
        //                console.log('failed to get data');
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
        //                console.log(data);
        def5.resolve(data);
      }).error(function(data, status, headers, config) {
        def5.reject('Failed to get data');
        //                console.log('failed to get data');
      });
      return def5.promise;
    }

    function forgotPaswordReset(parameters) {
      var def6 = $q.defer();
                //  console.log(parameters);
      $http.get(GlobalUrl.getUrl('forgot_pasword_reset'), {
        params: parameters
      }).success(function(data, status, headers, config) {

        // console.log(JSON.stringify(config.params));
        // console.log(JSON.stringify(data));
        //                console.log(data);
        def6.resolve(data);
      }).error(function(data, status, headers, config) {
        def6.reject('Failed to get data');
        //                console.log('failed to get data');
      });
      return def6.promise;
    }

    function getImage(uid) {
      var def7 = $q.defer();
      //            console.log(parameters);
      $http.get(GlobalUrl.getUrl('user-image'), {
        params: {
          userid: uid
        }
      }).success(function(data, status, headers, config) {
        //                console.log(data);
        def7.resolve(data);
      }).error(function(data, status, headers, config) {
        def7.reject('Failed to get data');
        //                console.log('failed to get data');
      });
      return def7.promise;
    }

    // function updateNotificationRead(){
    //   var def61 = $q.defer();
    //   //            console.log(parameters);
    //   $http.get(GlobalUrl.getUrl('forgot_pasword_reset'), {
    //     params: parameters
    //   }).success(function(data, status, headers, config) {
    //     //                console.log(data);
    //     def61.resolve(data);
    //   }).error(function(data, status, headers, config) {
    //     def61.reject('Failed to get data');
    //     //                console.log('failed to get data');
    //   });
    //   return def61.promise;
    // }


    return {
      registerNewDevice: registerNewDevice,
      checkPush: checkPush,
      getCtitle: getCtitle,
      setCtitle: setCtitle,
      getImage: getImage,
      getCid: getCid,
      setCid: setCid,
      setFromState: setFromState,
      getFromState: getFromState,
      setLoginStatus: setLoginStatus,
      setData: setData,
      getLoginStatus: getLoginStatus,
      getData: getData,
      editData: editData,
      updatedData: updatedData,
      register: register,
      forgotPaswordEmail: forgotPaswordEmail,
      forgotPaswordVerify: forgotPaswordVerify,
      forgotPaswordReset: forgotPaswordReset
    };
  };
})();
