(function () {
    'use strict';

    angular.module('common.services').factory('GlobalSettings', ['$http', '$q', '$ionicLoading', '$cordovaDevice', 'DSCacheFactory', GlobalSettings]);

    function GlobalSettings($http, $q, $ionicLoading, $cordovaDevice, DSCacheFactory) {

        self.globalSettingCache = DSCacheFactory.get("globalSettingCache");
        document.addEventListener("deviceready", function () {
            var device = "device information object";
//            var device = $cordovaDevice.getDevice();
            self.globalSettingCache.put("device", device);
            var cordova = "simple cordova information";
//            var cordova = $cordovaDevice.getCordova();
            self.globalSettingCache.put("cordova", cordova);
            var model = "model number for device return";
//            var model = $cordovaDevice.getModel();
            self.globalSettingCache.put("model", model);
            var platform = "platform details for device return";
//            var platform = $cordovaDevice.getPlatform();
            self.globalSettingCache.put("platform", platform);
            var uuid = "uuid information of device";
//            var uuid = $cordovaDevice.getUUID();
            self.globalSettingCache.put("uuid", uuid);
//            var version = "version information of device return";
            var version = $cordovaDevice.getVersion();
            self.globalSettingCache.put("version", version);
        }, false);
        
        function getDevice() {
//            return self.globalSettingCache.get("device");
            return "device information object";
        }
        
        function getCordova(){
//            return self.globalSettingCache.get("cordova");
            return "simple cordova information";
        }

        function getModel(){
//            return self.globalSettingCache.get("model");
            return "model number for device return";
        }
        
        function getPlatform(){
//            return self.globalSettingCache.get("platform");
            return "platform details for device return";
        }
        
        function getUuid(){
//            return self.globalSettingCache.get("uuid");
            return "uuid information of device";
        }
        
        function getVersion(){
            return $cordovaDevice.getVersion();
//            return self.globalSettingCache.get("version");
//            return "version information of device return";
        }
        
        return {
            getDevice: getDevice,       //Get all device information and return object
            getCordova: getCordova,     //Get the version of Cordova running on the device.
            getModel: getModel,         //The getModel() returns the name of the device's model or product. 
            getPlatform: getPlatform,   //Get the device's operating system name.
            getUuid: getUuid,           //Get the device's Universally Unique Identifier (UUID).
            getVersion: getVersion      //Get the operating system version.
        };
    }
    ;
})();