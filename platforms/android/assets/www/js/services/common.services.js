(function() {
  "use strict";

  angular
    .module('common.services', ['ngResource', 'ngCordova', 'toastr']);

  angular.module('common.services').factory('CommonServices', [
    '$http', '$q', '$ionicLoading', '$state', '$cordovaNetwork',
    'GlobalUrl', 'GlobalVariables', 'toastr',
    CommonServices
  ]);

  function CommonServices(
    $http, $q, $ionicLoading, $state, $cordovaNetwork,
    GlobalUrl, GlobalVariables, toastr) {

    function pingMail(parameters) {

      if ($cordovaNetwork.isOffline()) {
        try {
          navigator.notification.confirm(
            GlobalVariables.globalNetworkContentMessage, //  message
            function(buttonIndex) {
              $state.go('home.root');
            }, //  callback to invoke
            GlobalVariables.globalErrorHeading, //  title
            GlobalVariables.globalErrorButtonTitle //  button Name
          );
        } catch (e) {
          toastr.info(GlobalVariables.globalNetworkContentMessage);
          $state.go('home.root');
        }
      }

      var def = $q.defer();
      $http.get(GlobalUrl.getUrl('contact-us'), {
        params: parameters
      }).success(function(data, status, headers, config) {
        def.resolve(data);
      }).error(function(data, status, headers, config) {
        def.reject("Failed to get data");
        try {
          navigator.notification.confirm(
            GlobalVariables.globalNetworkContentMessage, //  message
            function(buttonIndex) {
              //            alert('You selected button ' + buttonIndex);
            }, //  callback to invoke
            GlobalVariables.globalErrorHeading, //  title
            GlobalVariables.globalErrorButtonTitle //  button Name
          );
        } catch (e) {
          toastr.info(GlobalVariables.globalNetworkContentMessage);
        }
      });
      return def.promise;

    };

    function fetchPromise(url, parameters) {

      if (typeof parameters === "undefined") {
        parameters = {};
      }
      if (url.length > 1) {
        //                console.log(GlobalUrl.getUrl(url));
        //                console.log(parameters);
        var def1 = $q.defer();
        $http.get(GlobalUrl.getUrl(url), {
          params: parameters
        }).success(function(data, status, headers, config) {

            //console.log(JSON.stringify(config.params));
            //console.log(JSON.stringify(data));

          // console.log(config);
          def1.resolve(data);
        }).error(function(data, status, headers, config) {
          def1.reject("Failed to get data");
          try {
            navigator.notification.confirm(
              GlobalVariables.globalNetworkContentMessage, //  message
              function(buttonIndex) {
                //            alert('You selected button ' + buttonIndex);
              }, //  callback to invoke
              GlobalVariables.globalErrorHeading, //  title
              GlobalVariables.globalErrorButtonTitle //  button Name
            );
          } catch (e) {
            toastr.error(GlobalVariables.globalNetworkContentMessage);
          }
        });
        return def1.promise;

      } else {
        return false;
      }
    };

    return {
      pingMail: pingMail,
      fetchPromise: fetchPromise
    };
  };
}());
