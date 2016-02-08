(function () {
    'use strict';

    angular.module('root').controller('fbtestCtrl', ['$http', '$q',
        '$ionicLoading', '$state', '$cordovaFile', '$cordovaDevice',
        'GlobalUrl', 'toastr', fbtestCtrl]);

    function fbtestCtrl($http, $q,
            $ionicLoading, $state, $cordovaFile, $cordovaDevice,
            GlobalUrl, toastr) {

        var vm = this;
        vm.data = [];
        vm.i;
        vm.imageURL;
        vm.operation = true;
        vm.status = true;
        vm.file = 'file.jpg';
        vm.folder = '';

        vm.checkFile = function () {
            toastr.info('checkFile');
            toastr.info('cordova.file.dataDirectory = '
                + cordova.file.dataDirectory);
            toastr.info('cordova.file.applicationStorageDirectory = '
                + cordova.file.applicationStorageDirectory);
        };

        vm.downloadFile = function () {
            toastr.info('downloadFile');
        };

        vm.checkDownloadFbFolder = function () {
            var f = vm.folder + 'Download/Fb';
            toastr.info('checkDownloadFbFolder = ' + f);
            if ($cordovaDevice.getPlatform() === 'Android') {
                $cordovaFile.checkDir(f)
                    .then(function (success) {
                        // success
                        toastr.success('4A - Check Download/Fb Directory Success');
                    }, function (error) {
                        toastr.error('4A - Error Download/Fb directory check');
                    });
            }
            ;
        };

        vm.createFbFolder = function () {
            var f = vm.folder;
            toastr.info('createFbFolder = ' + f);
            if ($cordovaDevice.getPlatform() === 'Android') {
                $cordovaFile.checkDir(f)
                    .then(function (success) {
                        // success
                        toastr.success('3A - Check Directory/Fb Success');
                    }, function (error) {
                        toastr.error('3A - Error Download/Fb directory check');
                        $cordovaFile.createDir(f)
                            .then(function (success) {
                                toastr.success('3B - Success Create Download/Fb directory check');
                            }, function (error) {
                                toastr.error('3B - Error Create Download/Fb directory check');
                            });
                    });
            };
        };

        vm.checkDownloadFolder = function () {
            var f = vm.folder;
            toastr.info('checkDownloadFolder = ' + f);
            if ($cordovaDevice.getPlatform() === 'Android') {
                $cordovaFile.checkDir(f)
                    .then(function (success) {
                        // success
                        toastr.success('2A - Check Directory Success');
                    }, function (error) {
                        toastr.error('2A - Error Download directory check');
                        $cordovaFile.createDir(f)
                            .then(function (success) {
                                toastr.success('2B - Success Create Download directory check');
                            }, function (error) {
                                toastr.error('2B - Error Create Download directory check');
                            });
                    });
            }
            ;
        };

        vm.getFileSystem = function () {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function (fileSystem) {
                    vm.folder = fileSystem.root.nativeURL
                },
                function () {
                    vm.folder = null;
                }
            );
        };

        vm.openImage = function (uri) {
            vm.imageURL = uri;
            vm.getFileSystem();
            vm.checkDownloadFolder();
            vm.createFbFolder();
            vm.checkDownloadFbFolder();
            vm.downloadFile();
            vm.checkFile();
        };

        //        vm.openImage = function (uri) {
        //            var targetFileName = uri.substring(uri.lastIndexOf('/')+1);
        //            window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        //            window.requestFileSystem(
        //                LocalFileSystem.PERSISTENT, 
        //                0, 
        //                function(fileSystem) {
        //                    var ft = new FileTransfer(); 
        //            
        //                    ft.download(
        //                    uri,
        //                    fileSystem.root.nativeURL + targetFileName, 
        //                    function(e)
        //                    { 
        ////                        toastr.success("Success" + JSON.stringify(e)); 
        //                        toastr.success('File Path is = ' + fileSystem.root.nativeURL + targetFileName);
        //                    }
        //                    , 
        //                    function(er)
        //                    { toastr.error("ERROR "+JSON.stringify(er)); }
        //                    );
        //                }, 
        //                function() {
        //                    toastr.error("failed to get filesystem");
        //                }
        //            );
        //        };

    };

})();