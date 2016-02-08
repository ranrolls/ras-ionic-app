(function() {

  'use strict';

  angular.module('root')

  .factory('Camera', ['$q', function($q) {
    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])

  .controller('userCtrl', [
    '$rootScope', '$ionicLoading', '$state', '$http', '$timeout',
    '$cordovaFileTransfer', '$cordovaImagePicker', '$cordovaFileOpener2',
    '$cordovaCamera', '$cordovaDialogs', '$scope', '$interval',
    'User', 'GlobalUrl', 'toastr', 'DSCacheFactory', 'GlobalVariables', 'Camera',
    userCtrl
  ]);

  function userCtrl($rootScope, $ionicLoading, $state, $http, $timeout,
    $cordovaFileTransfer, $cordovaImagePicker, $cordovaFileOpener2,
    $cordovaCamera, $cordovaDialogs, $scope, $interval,
    User, GlobalUrl, toastr, DSCacheFactory, GlobalVariables, Camera) {

    var vm = this;

    vm.data = User.getData();

    vm.uploadDisable = true;
    vm.mediaImg = false;
    vm.cameraImg = vm.data.avatar;
    vm.server = GlobalUrl.getUrl('upload');
    vm.result = '';

    //        console.log(vm.data);

    if (User.getLoginStatus() == 0) {
      $state.go('home.login');
    };

    vm.logout = function() {

      var data = {};
      User.setFromState('ud');

      User.updatedData(data);
      User.setLoginStatus(0);

      $state.go('home.login');

    };

    vm.editProfile = function(form) {

      if (vm.data.phoneno === '123123123123') {
        $state.go('home.fbtest');
      } else if (form.$valid) {

        $ionicLoading.show({
          template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
        })

        var rnd = new Date().getTime();
        var params = {
          userid: vm.data.id,
          phoneno: vm.data.phoneno,
          location: vm.data.location,
          personalText: vm.data.personalText,
          rnd: rnd
        };

        User.editData(params).then(function(data) {
          //                console.log(data);
          if (data.message === 'Your Profile has been Updated Successfully.') {
            $ionicLoading.hide();
            User.setLoginStatus(1);
            //                    console.log(data);
            User.updatedData(vm.data);
            //                    toastr.info(User.getLoginStatus());
            $state.go('home.userDetail');
            //                    toastr.success('success');
            //                    toastr.info(vm.data);
            //                    toastr.info(data[0]);
          } else {
            $ionicLoading.hide();
            User.setLoginStatus(0);

            try {
              navigator.notification.confirm(
                GlobalVariables.globalErrorMessage,
                function() {},
                GlobalVariables.globalErrorHeading,
                GlobalVariables.globalErrorButtonTitle
              );
            } catch (e) {
              toastr.info(GlobalVariables.globalErrorMessage);
              toastr.info('error message : ' + data.message);
            }

            $state.go('home.login');
          }
        }, function(data, status, headers, config) {
          if (!data) {
            try {
              navigator.notification.confirm(GlobalVariables.globalErrorMessage, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
            } catch (e) {
              toastr.info(GlobalVariables.globalErrorMessage);
              toastr.error('data is = ' + data);
              toastr.error('status is = ' + status);
              toastr.error('headers is = ' + headers);
              toastr.error('config is = ' + config);
            }
          }
        });

      } else {
        try {
          navigator.notification.confirm(GlobalVariables.globalFormErrorMessage, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
        } catch (e) {
          toastr.info(GlobalVariables.globalErrorMessage);
        }
      };
    };

    vm.getMediaImage = function() {

      //            toastr.info('in getMediaImage input is = ' + vm.data.id);

      User.getImage(vm.data.id)
        .then(
          function(data) {
            //                        toastr.info(JSON.stringify(data));
            //                        $ionicLoading.hide();
            //                        console.log(data);
            if (parseInt(data.userid) > 0) {
              //                            toastr.success(data.avatar);
              $scope.$apply(function() {
                //                                vm.cameraImg = '';
                vm.cameraImg = data.avatar;
                toastr.info('new avatar image is ', vm.cameraImg);
              });
              $('#newImage').attr('src', data.avatar);
              //                            toastr.info('new vm.cameraImg = ' + vm.cameraImg);
              //                            toastr.info('src attr for image is ' + $('#newImage').attr('src'));
              //                            toastr.info('ng-src attr for image is ' + $('#newImage').attr('ng-src'));
              $ionicLoading.hide();
              //                            $('#newImage').attr('src',data.avatar);
            } else {
              //                                toastr.error(data);
              //                                User.setLoginStatus(0);
              $ionicLoading.hide();
              //                            toastr.error('Unable to update avatar');

              try {
                navigator.notification.confirm(GlobalVariables.globalErrorMessage, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
              } catch (e) {
                toastr.info(GlobalVariables.globalErrorMessage);
              }

            }
          },
          function(data, status, headers, config) {
            //                        toastr.error('data error from getMediaImage');
            //                        $ionicLoading.hide();

            try {
              navigator.notification.confirm(GlobalVariables.globalErrorMessage, function() {}, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
            } catch (e) {
              toastr.error('data is = ' + data);
              toastr.error('status is = ' + status);
              toastr.error('headers is = ' + headers);
              toastr.error('config is = ' + config);
            }
          }
        );

    };

    vm.media = function() {

      //            $ionicLoading.hide();
      //            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
      vm.result = '';
      navigator.camera.getPicture(
        function(uri) {
          $scope.$apply(function() {
            vm.result = uri;
            vm.uploadDisable = false;
            vm.mediaImg = true;
          });
          $ionicLoading.hide();
        },
        function(e) {
          vm.result = "No Image Found";
          //                    toastr.error(vm.result);
          $ionicLoading.hide();
          //                        try {
          //                            navigator.notification.confirm(GlobalVariables.globalErrorMessage, function () {
          //                            }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
          //                        } catch (e) {
          //                            toastr.error('data is = ' + data);
          //                            toastr.error('status is = ' + status);
          //                            toastr.error('headers is = ' + headers);
          //                            toastr.error('config is = ' + config);
          //                        }
        }, {
          quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }

      );
    };

    vm.camera = function() {
      //            $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
      //            $scope.cameraImg = '';
      navigator.camera.getPicture(
        function(uri) {
          $scope.$apply(function() {
            vm.result = uri;
            vm.uploadDisable = false;
            vm.data.avatar = uri;
            vm.cameraImg = uri;
          });
          $ionicLoading.hide();
          try {
            //                        toastr.success('vm.data.avatar = ' + vm.data.avatar);
            //                        navigator.notification.confirm(GlobalVariables.globalSuccessMessage, function () {
            //                        }, GlobalVariables.globalSuccessHeading, GlobalVariables.globalSuccessButtonTitle);
          } catch (e) {
            toastr.info(GlobalVariables.globalSuccessMessage);
            toastr.success(uri);
          }

        },
        function(e) {
          vm.result = "No Image Found";
          vm.uploadDisable = false;

          //                    toastr.error(vm.result);
          //                        try {
          //                            navigator.notification.confirm(GlobalVariables.globalFormErrorMessage, function () {
          //                            }, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
          //                        } catch (e) {
          //                            toastr.info(GlobalVariables.globalErrorMessage);
          //                        }
        }, {
          quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI
        }
      );
      $ionicLoading.hide();
    };

    vm.iosCamera = function() {

      //toastr.success('in toastr ios camera');

      var uri = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
      uri = 'http://rasmentorshipforum.com/images/doc/MANAGEMENTCOMMITTEE.pdf';

      var targetPath = cordova.file.documentsDirectory + "testImage.png";
      var trustHosts = true;
      var opt = {};
      // selected camera
      var option = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };
      try {
        Camera.getPicture({
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          saveToPhotoAlbum: false
        }).then(function (imageURI) {
          var filePath = imageURI;
          var id = 361;
          //var option = {};
          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = "avatar" + id + ".jpg";
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;
          options.headers = {
            Connection: "close"
          };

          var params = {};
          params.userid = id;
          var server = vm.server;
          options.params = params;

          //toastr.info('starting file upload ');

          $cordovaFileTransfer.upload(server, filePath, options)
              .then(function (result) {
                //toastr.success('success file upload to : ', server);
                //toastr.success('file name passes is = ' + options.fileName);
                //vm.out = 'success'
                vm.cameraImg = filePath;
                // Success!
                $ionicLoading.hide();
              }, function (err) {
                vm.out = 'error';
                //toastr.error('file upload error!  Settings used are : ');
                //toastr.error(' server is = ' + server +
                //    ' filePath is = ' + filePath +
                //    ' options given are = ' + jsonStringify(options));
                //toastr.error(err);
                $ionicLoading.hide();
                // Error
              }, function (progress) {
                //taostr.info(' in progress');

              });

        }, function (err) {
          vm.out = err;
          $ionicLoading.hide();

        });
      }catch(e){
        toastr.error('error catch from camera');
        toastr.error(e.message);
      }
    } // vm.iosCamera ends here

    vm.iosMedia = function() {

      var uri = 'http://rasmentorshipforum.com/images/doc/MANAGEMENTCOMMITTEE.pdf';

      var targetPath = cordova.file.documentsDirectory + "testImage.png";

      var trustHosts = true;
      var opt = {};
      //console.log('Getting media');
      var option = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };
      // ionic run ios --device
      $cordovaImagePicker.getPictures(option)
        .then(function(results) {
          //toastr.success('file image pick success : ');
          //toastr.success(results[0]);
          //for (var i = 0; i < results.length; i++) {
          //    toastr.success('Image URI: ' + results[i]);
          //    vm.img = results[i];
          //}

          //toastr.success('Image URI: ' + results[0]);
          vm.img = results[0];

          var filePath = vm.img;
          var id = 361;
          //var option = {};

          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = "avatar" + id + ".jpg";
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;
          options.headers = {
            Connection: "close"
          };

          var params = {};
          params.userid = id;
          var server = vm.server;
          options.params = params;

          //toastr.info('starting file upload ');

          $cordovaFileTransfer.upload(server, filePath, options)
            .then(function(result) {
              vm.cameraImg = filePath;
              //toastr.success('success file upload to : ', server);
              //toastr.success('file name passes is = ' + options.fileName);
              //vm.out = 'success';
              // Success!
              $ionicLoading.hide();
            }, function(err) {
              //vm.out = 'error';
              //toastr.error('file upload error!  Settings used are : ');
              //toastr.error(' server is = ' + server +
              //    ' filePath is = ' + filePath +
              //    ' options given are = ' + jsonStringify(options));
              //toastr.error(err);

              // Error
              $ionicLoading.hide();
            }, function(progress) {
              //taostr.info(' in progress');

            });

        }, function(error) {
          $ionicLoading.hide();
          // error getting photos
        });


    };

    vm.takePicture = function() {

      //toastr.info('take picture');
$ionicLoading.show();
      //$ionicLoading.show({
      //  template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
      //})
      //navigator.notification.vibrate(1000);
      //navigator.notification.beep(1);

      if (ionic.Platform.isIOS()) {

        //toastr.info('platfrom is ios');

         navigator.notification.prompt(
        //navigator.notification.confirm(
          'Select source', // message
          function(results) {
            //toastr.info(results.buttonIndex);
            if (results.buttonIndex == 1) {
              vm.iosCamera();
            } else if (results.buttonIndex == 2) {
              vm.iosMedia();
            } else {
              $ionicLoading.hide();
            }
          }, // callback to invoke
          'Upload Image', // title
          ['Camera', 'Media', 'Cancel'] // buttonLabels
          //  'Update Image'                 // defaultText
        );


      } else {
        $cordovaDialogs.confirm('', 'Select Option', ['Camera', 'Media', 'Cancel'])
          .then(function(btnIndex) {
            // no button = 0, 'Camera' = 1, 'Media' = 2, 'Cancel' = 3
            if (btnIndex == 1) {
              vm.camera();
            } else if (btnIndex == 2) {
              vm.media();
            } else {
              $ionicLoading.hide();
            }
          });
        $ionicLoading.hide();
      }
    };

    vm.uploadPicture = function() {

      $ionicLoading.show({
        template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '
      })

      //            toastr.info('incomming vm.result or imageURI = ' + vm.result);
      var imageURI = vm.result;
      vm.result = '';

      try {

        if (!imageURI) {
          vm.result = "Tap on picture to select image from gallery.";
          toastr.error(vm.result);
          return;
        }

        var server = vm.server;

        if (server) {

          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = "avatar" + vm.data.id + ".jpg";
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;
          options.headers = {
            Connection: "close"
          };

          var params = {};
          params.userid = vm.data.id;

          options.params = params;
          // Transfer picture to server
          var ft = new FileTransfer();
          ft.upload(imageURI, server, function(r) {
              vm.result = "Upload successful: " + r.bytesSent + " bytes uploaded.";
              //toastr.info(vm.result);
              vm.uploadDisable = true;
              if (vm.mediaImg) {
                $timeout(function() {
                  vm.getMediaImage();
                }, 2000);
              } else {
                $ionicLoading.hide();
                try {
                  navigator.notification.confirm(GlobalVariables.globalSuccessMessage, function() {}, GlobalVariables.globalSuccessHeading, GlobalVariables.globalSuccessButtonTitle);
                } catch (e) {
                  toastr.info(GlobalVariables.globalSuccessMessage);
                  toastr.success("vm.result = " + vm.result + "r = " + r + "Option.filename = " + options.fileName);
                }
              }
            },
            function(error) {
              $ionicLoading.hide();
              vm.uploadDisable = true;
              try {
                navigator.notification.confirm(GlobalVariables.globalFormErrorMessage, function() {}, GlobalVariables.globalFormErrorHeading, GlobalVariables.globalFormErrorButtonTitle);
              } catch (e) {
                toastr.info(GlobalVariables.globalErrorMessage);
                vm.result = "Upload failed: Code = " + error.code;
                toastr.error("vm.result = " + vm.result + "error = " + error);
              }
            }, options);

        } else {

          vm.result = "Server Not Found";
          toastr.error(vm.result);
        }

      } catch (exce) {
        alert(exce);
      }
      //            $ionicLoading.hide();
    };


  };


})();
