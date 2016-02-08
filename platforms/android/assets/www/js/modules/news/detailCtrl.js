(function () {

    'use strict';

    angular.module('root').controller('ndtCtrl', [
      '$ionicLoading', '$cordovaInAppBrowser', '$timeout', 'toastr', 'getData', ndtCtrl]);

    function ndtCtrl($ionicLoading, $cordovaInAppBrowser, $timeout, toastr, getData) {

        //$ionicLoading.show({template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '});
        var vm = this;
// console.log('in news detail ndtCtrl');
        vm.news = getData.result[0];

                vm.openBrowser = function(url){
                  console.log(url);
                }

        // $('.newsDetailBrowser').

$timeout(function(){

  angular.element('.newsDetailBrowser').on('click', function(e) {
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
      toastr.error('iframe');
    }
  });




},3000);
                // console.log(vm.news);

    };

})();
