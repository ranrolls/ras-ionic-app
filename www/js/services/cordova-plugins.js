(function () {
    'use strict';

    angular.module('root').factory('CordovaPlugins', ['$cordovaVibrationcordova', '$cordovaBackgroundGeolocation',
        '$cordovaEmailComposer', '$cordovaGlobalization', '$cordovaFile', 'DSCacheFactory',CordovaPlugins]);

    function CordovaPlugins($cordovaVibrationcordova, $cordovaBackgroundGeolocation, $cordovaEmailComposer, $cordovaGlobalization,
            $cordovaFile, DSCacheFactory) {




              

        function startVibration(ms) {
            if ($cordovaVibration.vibrate(ms)) {
                return true;
            } else {
                return false;
            }
        }

        function getGeolocation() {
            var options = {
                // https://github.com/christocracy/cordova-plugin-background-geolocation#config
            };
            document.addEventListener("deviceready", function () {
                // `configure` calls `start` internally
                $cordovaBackgroundGeolocation.configure(options)
                        .then(
                                null, // Background never resolves
                                function (err) { // error callback
                                    console.error(err);
                                },
                                function (location) { // notify callback
                                    console.log(location);
                                });
            }, false);
        }

        function stopGeolocation() {
            $cordovaBackgroundGeolocation.stop();
        }

        function checkEmailComposer() {
            $cordovaEmailComposer.isAvailable().then(function () {
                // is available
                console.log('email composer is available');
                return true;
            }, function () {
                // not available
                console.log('email composer is not available');
                return false;
            });

        }

        function sendEmail(config) {
//            var config = {
//                to: 'brennstoffweb@gmail.com',
//                cc: 'munish@brennstoffmarcom.com',
//                bcc: ['brennstoffweb@gmail.com', 'munish@brennstoffmarcom.com'],
//                attachments: [
//                    'file://img/logo.png',
//                    'res://icon.png',
//                    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
//                    'file://README.pdf'
//                ],
//                subject: 'Email Chech by Brennstoff Tester Catalogue',
//                body: 'How are you? Nice greetings from Brennstoff',
//                isHtml: true
//            };
            var config = {
                to: 'brennstoffweb@gmail.com',
                cc: 'munish@brennstoffmarcom.com',
                subject: 'Email Chech by Brennstoff Tester Catalogue',
                body: 'How are you? Nice greetings from Brennstoff',
                isHtml: true
            };
            $cordovaEmailComposer.open(email).then(null, function () {
                // user cancelled email
                console.log('user cancelled email');
            });
        }

        function getPreferredLanguage() {
            $cordovaGlobalization.getPreferredLanguage().then(
                    function (result) {
                        // result
                        console.log(result);
                    },
                    function (error) {
                        // error
                        console.log('error for getPreferred Language');
                        console.log(error);
                    });
        }

        function getLocaleName() {
            $cordovaGlobalization.getLocaleName().then(
                    function (result) {
                        // result
                        console.log(result);
                    },
                    function (error) {
                        // error
                        console.log('error for getLocaleName');
                        console.log(error);
                    });
        }

        function getFirstDayOfWeek() {
            $cordovaGlobalization.getFirstDayOfWeek().then(
                    function (result) {
                        // result
                        console.log(result);
                    },
                    function (error) {
                        // error
                        console.log('error for getFirstDayOfWeek');
                        console.log(error);
                    });
        }

        function getFreeDiskSpace() {
            $cordovaFile.getFreeDiskSpace()
                    .then(function (success) {
                        // success in kilobytes
                    }, function (error) {
                        // error
                    });
        }

        function checkDir(dir) {
            // dir = "dir/other_dir";
            $cordovaFile.checkDir(cordova.file.dataDirectory, dir)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function checkFile(fileName) {
            // fileName = "some_file.txt";
            $cordovaFile.checkFile(cordova.file.dataDirectory, fileName)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function createDir(dirName) {
//            dirName = "new_dir";
            $cordovaFile.createDir(cordova.file.dataDirectory, dirName, false)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function createFile(fileName) {
//            fileName = "new_file.txt";
            $cordovaFile.createFile(cordova.file.dataDirectory, fileName, true)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function removeDir(dirName) {
            // REMOVE
//            dirName = "some_dir";
            $cordovaFile.removeDir(cordova.file.dataDirectory, dirName)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function removeFile(fileName) {
//            fileName = "some_file.txt";
            $cordovaFile.removeFile(cordova.file.dataDirectory, fileName)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function removeRecursively() {
            $cordovaFile.removeRecursively(cordova.file.dataDirectory, "")
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function writeFile(fileName, data) {
            // WRITE
//          fileName = "file.txt";
//          data = "text";
            $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, data, true)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function writeExistingFile(fileName, data) {
//          fileName = "file.txt";
//          data = "text";
            $cordovaFile.writeExistingFile(cordova.file.dataDirectory, fileName, data)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function readAsText() {
            // READ
            $cordovaFile.readAsText(cordova.file.dataDirectory, $scope.inputs.readFile)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });

        }

        function moveDir(source, dest) {
            // MOVE
//            source ="dir"
//            dest = "new_dir"
            $cordovaFile.moveDir(cordova.file.dataDirectory, source, cordova.file.tempDirectory, dest)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function moveFile(fileName) {
//            fileName = "file.txt";
            $cordovaFile.moveFile(cordova.file.dataDirectory, fileName, cordova.file.tempDirectory)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function copyDir(source, dest) {
            // COPY
//            source = "dir";
//            dest = "new_dir";
            $cordovaFile.copyDir(cordova.file.dataDirectory, source, cordova.file.tempDirectory, dest)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }

        function copyFile(source, dest) {
//          source = "file.txt";
//          dest = "new_file.txt";
            $cordovaFile.copyFile(cordova.file.dataDirectory, source, cordova.file.tempDirectory, dest)
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
        }


        return {
            startVibration: startVibration,
            getGeolocation: getGeolocation,
            stopGeolocation: stopGeolocation,
            checkEmailComposer: checkEmailComposer,
            sendEmail: sendEmail,
            getPreferredLanguage: getPreferredLanguage,
            getLocaleName: getLocaleName,
            getFirstDayOfWeek: getFirstDayOfWeek,
            getFreeDiskSpace: getFreeDiskSpace,
            checkDir: checkDir,
            createDir: createDir,
            createFile: createFile,
            removeDir: removeDir,
            removeFile: removeFile,
            removeRecursively: removeRecursively,
            writeFile: writeFile,
            writeExistingFile: writeExistingFile,
            readAsText: readAsText,
            moveDir: moveDir,
            moveFile: moveFile,
            copyDir: copyDir,
            copyFile: copyFile
        };
    }
    ;
})();
