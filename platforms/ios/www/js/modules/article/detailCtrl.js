(function () {

    'use strict';

    angular.module('root').controller('adCtrl', [
      '$ionicLoading', '$cordovaInAppBrowser', '$timeout', 'toastr', 'getData', adCtrl]);

    function adCtrl($ionicLoading, $cordovaInAppBrowser, $timeout, toastr, getData) {

        var vm = this;
        vm.data = getData.result[0];

$timeout(function(){

  angular.element('.articleDetailBrowser').on('click', function(e) {
    try {
  // console.log('click catch');
var url = this.getAttribute("openbrowser");
  $ionicLoading.show();
  var target = '_self';
  var options = {
      location: 'yes',
      clearcache: 'yes',
      closebuttoncaption : 'Close',
      toolbar: 'yes'
  };
  // console.log('sending anchor to inappbrowser');
  try {
    target = (ionic.Platform.isIOS()) ? '_blank' : '_self';
    options.location = (ionic.Platform.isIOS()) ? 'no' : 'yes';
    options.toolbar = (ionic.Platform.isIOS()) ? 'yes' : 'no';
    // event.preventDefault();
      $cordovaInAppBrowser.open(url, target, options)
          .then(function (event) {
              $ionicLoading.hide();
              // toastr.success(event);
              // toastr.success('success from cordovaInAppBrowser');
          })
          .catch(function (event) {
              $ionicLoading.hide();
              // toastr.error(event);
              toastr.error('error from cordovaInAppBrowser');
          });

      // window.open(encodeURI($attrs.openbrowser), '_self');
  } catch (e) {
    // toastr.error(e);
      toastr.error('fail initiating cordovaInAppBrowser try');
  }
      // $rootScope.$broadcast('exLink', {
      //   'url': e.target.getAttribute('openbrowser')
      // });
    } catch (e) {
      // toastr.error('iframe');
    }
  });




},3000);
                // console.log(vm.news);

    };

})();
