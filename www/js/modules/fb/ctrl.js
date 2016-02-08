(function() {
  'use strict';

  angular.module('root').controller('fbCtrl', ['$http', '$q', '$scope',
    '$ionicLoading', '$state', '$cordovaFile', '$cordovaDevice',
    '$cordovaDialogs', '$cordovaFileTransfer',
    '$cordovaImagePicker', '$cordovaFileOpener2', '$timeout', '$interval',
    'GlobalUrl', 'toastr', 'User', fbCtrl
  ]);

  function fbCtrl($http, $q, $scope,
    $ionicLoading, $state, $cordovaFile, $cordovaDevice,
    $cordovaDialogs, $cordovaFileTransfer,
    $cordovaImagePicker, $cordovaFileOpener2, $timeout, $interval,
    GlobalUrl, toastr, User) {

    var vm = this,
      successAlert = 'File downloaded successfully';
    vm.data = [];
    vm.us = false; // user status
    vm.i;
    vm.downloadProgress = 0;
    vm.imageURL;
    vm.operation = true;
    vm.testValue = '';
    vm.full_title;
    vm.introtext;
    vm.images;
    vm.title;
    vm.server = GlobalUrl.getUrl('upload');

    var fetchOperation = true;
    var fetchNumber = 1,
      i = 1;

    $ionicLoading.show({
      template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
    })

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

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'home.fb' && !vm.us) {

        // $timeout(function(){
        $state.go('home.loginAccess', {
          'fromState': 'ud'
        });
        // }, 2000);

      };

    });

    vm.fetchData = function(number) {
      var def = $q.defer();
      $http.get(GlobalUrl.getUrl('f-b'), {
        params: {
          'number': number
        }
      }).success(function(data, status, headers, config) {

        console.log(JSON.stringify(config.params));
        console.log(JSON.stringify(data));

        //  console.log('dt value is = ', data);
        def.resolve(data);
      }).error(function(data, status, headers, config) {
        def.reject("Failed to get data");
      });
      return def.promise;
    };

    vm.fetchData(fetchNumber)
      .then(
        function(dt) {
          $ionicLoading.hide();
          if (dt.status == 1) {
            // console.log(dt);
            fetchNumber++;
            vm.full_title = dt.full_title;
            //  console.log(dt.introtext);
            vm.introtext = dt.introtext;
            //  console.log(vm.introtext);
            vm.images = dt.images;
            vm.title = dt.title;
            $('.fb div.row.fb-kit > div:nth-child(2)').css('visibility', 'hidden');
            $timeout(function() {
              var mt = $('.fb div.row.fb-kit > div:first-child').css('height');



              mt = parseInt(mt);
              mt += 20;
              mt += 'px';
              // console.log(mt);
              $('.fb div.row.fb-kit > div:nth-child(2)').css('margin-top', mt);
              $('.fb div.row.fb-kit > div:nth-child(2)').css('visibility', 'visible');
            }, 2000);

            $.each(dt.result, function(i0, v0) {
              vm.data.push(v0);
            });
            //                        console.log('vm.data value is = ', vm.data);
            if (dt.result.length < 9) {
              fetchOperation = false;
              fetchNumber = 1;
            }

          } else {
            toastr.error('dt.status is not 1');
            fetchOperation = false;
            fetchNumber = 1;
          }
        },
        function() {
          $ionicLoading.hide();
          toastr.error('no data');
          fetchOperation = false;
        }
      );

    vm.iosDown = function(uri) {
      // toastr.info('incomming uri to ios down is = ' + uri);
      var targetPath = cordova.file.documentsDirectory + "testImage.png";
      var trustHosts = true;
      var opt = {};
      var progress;

      targetPath = cordova.file.documentsDirectory + uri.substring(uri.lastIndexOf('/') + 1);
      //targetPath = uri.substring(uri.lastIndexOf('/') + 1);
      $cordovaFileTransfer.download(uri, targetPath, opt, trustHosts)
        .then(function(result) {
          //vm.out = 'success ';
          // toastr.success('success');

          $cordovaFileOpener2.open(
            targetPath,
            'application/pdf'
          ).then(function() {
            // toastr.success('file opened success');
            $ionicLoading.hide();
          }, function(err) {
            toastr.error('error file opening');
            // toastr.error(err);
            $ionicLoading.hide();
            // An error occurred. Show a message to the user
          });
          // Success!
        }, function(err) {
          toastr.error('No file found');
          // toastr.error(err);
          $ionicLoading.hide();

        }, function(progress) {

          //toastr.info('info');
          //$ionicLoading.hide();
          $timeout(function() {
            //$scope.downloadProgress = (progress.loaded / progress.total) * 100;
            // var prog = (progress.loaded / progress.total) * 100;
            // toastr.info(prog);
          }, 5000)
        });
    }

    vm.openImage = function(uri) {

      //            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
      //            $interval(fn, delay, [count], [invokeApply], [Pass]);
      var counter = 0;
      $interval(function() {

        if (counter == 0) {
          $ionicLoading.show({
            template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
          })
        }

        if (counter == 1) {
          if (ionic.Platform.isIOS()) {
            vm.iosDown(uri);
          } else {
            vm.downNative(uri);
          }

          //                    vm.downNativeMixCordova(uri);
          //                    vm.downCordova(uri);
        }

        if (counter == 2) {
          counter = 0;
        }

        counter++;

      }, 300, 3);

    };

    vm.downNative = function(uri) {

      //            var targetFileName = cordova.file.dataDirectory + uri.substring(uri.lastIndexOf('/') + 1);
      var targetFileName = 'Download/' + uri.substring(uri.lastIndexOf('/') + 1); //success on android
      //            var targetFileName = 'documents/temp.jpg';  //success on android
      //            toastr.info('Given target file path is = ' + targetFileName);

      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

      window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        function(fileSystem) {
          var ft = new FileTransfer();
          targetFileName = fileSystem.root.toURL() + targetFileName;
          ft.download(
            uri,
            targetFileName,
            function(e) {
              //                        toastr.success("Success" + JSON.stringify(e));
              //                        toastr.success('File Path is = ' + targetFileName);
              //                                    $cordovaDialogs.alert('Saved file path is = ' + targetFileName, 'File downloaded', 'Ok')
              $cordovaDialogs.alert(successAlert, 'File downloaded', 'Ok')
                .then(function() {
                  $ionicLoading.hide();
                  //vm.testValue = targetFileName;
                  // callback success
                });
            },
            function(er) {
              $cordovaDialogs.alert('File not downloaded', 'File directory not found!', 'Ok')
                .then(function() {
                  //toastr.error('Given target file path in fail = ' + targetFileName);
                  //                                                vm.testValue = 'fail';
                  $ionicLoading.hide();
                  // callback success
                });
              //                        toastr.error("ERROR "+JSON.stringify(er)); }
            });
        },
        function() {
          toastr.error("failed to get filesystem");
        }
      );

    };

    vm.downNativeMixCordova = function(uri) {

      var targetFileName = cordova.file.dataDirectory + uri.substring(uri.lastIndexOf('/') + 1);
      toastr.info('Given target file path is = ' + targetFileName);

      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
      window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        function(fileSystem) {
          var ft = new FileTransfer();
          var trustHosts = true
          var options = {};
          $cordovaFileTransfer.download(uri, targetFileName, options, trustHosts)
            .then(function(result) {
              // Success!
              $cordovaDialogs.alert('Saved file path is = ' + targetFileName, 'File downloaded', 'Ok')
                .then(function() {
                  // callback success
                });
            }, function(err) {
              // Error
              $cordovaDialogs.alert('File not downloaded', 'File directory not found!', 'Ok')
                .then(function() {

                  // callback success
                });
            }, function(progress) {
              $timeout(function() {
                vm.downloadProgress = (progress.loaded / progress.total) * 100;
              }, 100);
            });
        },
        function() {
          toastr.error("failed to get filesystem");
        }
      );


    };

    vm.downCordova = function(uri) {
      document.addEventListener('deviceready', function() {

        var url = uri;
        var targetFileName = cordova.file.dataDirectory + uri.substring(uri.lastIndexOf('/') + 1);

        //                toastr.info('input url to file transfer = ' + url);
        //                toastr.info('Given target file path is = ' + targetFileName);

        var targetPath = targetFileName;
        var trustHosts = true
        var options = {};

        $scope.$apply(function() {
          vm.downloadProgress = 40;
          //                                vm.downloadProgress = progress.loaded / progress.total;
        });

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function(result) {
            // Success!
            //                            $cordovaDialogs.alert('Saved file path is = ' + targetFileName, 'File downloaded', 'Ok')
            $cordovaDialogs.alert(successAlert, 'File downloaded', 'Ok')
              .then(function() {
                //                                    $scope.$apply(function(){
                //                                        vm.testValue = targetFileName;
                //                                    });
                $ionicLoading.hide();
              });
          }, function(err) {
            // Error
            $cordovaDialogs.alert('File not downloaded', 'File directory not found!', 'Ok')
              .then(function() {

                // callback success
              });
            $ionicLoading.hide();
          }, function(progress) {
            //                        alert(progress.loaded);
            //                        alert(progress.total);
            //                            $timeout(function () {
            //                                $scope.$apply(function () {
            //                                    vm.downloadProgress = (progress.loaded / progress.total) * 100;
            ////                                vm.downloadProgress = progress.loaded / progress.total;
            //                                });
            //                            }, 100);
          });

      }, false);

    };

  };

})();
