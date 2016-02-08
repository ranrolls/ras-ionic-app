(function () {
    'use strict';
    angular.module('root').controller('StartupCordovaCtrl', ['$state', '$cordovaDevice', 'GlobalSettings', 'DSCacheFactory', StartupCordovaCtrl]);
    function StartupCordovaCtrl($state, $cordovaDevice, GlobalSettings, DSCacheFactory) {
//        self.globalSettingCache = DSCacheFactory.get("globalSettingCache");
        var vm = this, systemCheck = true;
       vm.items = [];
        if (systemCheck == true) {
//            var result = { referer:'jimbob', param2:37, etc:'bluebell' };
//            $state.go('toState', result);
           vm.items.push('Passing to cordova panel');
           $state.go('cordova.panel');
        }
        document.addEventListener("deviceready", function () {

//            self.globalSettingCache.put("device", $cordovaDevice.getDevice());
//            
//            vm.items.push('$cordovaDevice.getDevice ' + $cordovaDevice.getDevice());
////        vm.items.push('GlobalSettings.getCordova ' + GlobalSettings.getCordova());
//            self.globalSettingCache.put("cordova", $cordovaDevice.getCordova());
//            vm.items.push('$cordovaDevice.getCordova ' + $cordovaDevice.getCordova());
////        vm.items.push('GlobalSettings.getModel ' + GlobalSettings.getModel());
//            self.globalSettingCache.put("model", $cordovaDevice.getModel());
//            vm.items.push('$cordovaDevice.getModel() ' + $cordovaDevice.getModel());
////        vm.items.push('GlobalSettings.getPlatform ' + GlobalSettings.getPlatform());
//            self.globalSettingCache.put("platform", $cordovaDevice.getPlatform());
//            vm.items.push('$cordovaDevice.getPlatform ' + $cordovaDevice.getPlatform());
////        vm.items.push('GlobalSettings.getUuid ' + GlobalSettings.getUuid());
//            self.globalSettingCache.put("uuid", $cordovaDevice.getUuid());
//            vm.items.push('$cordovaDevice.getUuid ' + $cordovaDevice.getUuid());
//        vm.items.push('GlobalSettings.getVersion ' + GlobalSettings.getVersion());
          vm.version = $cordovaDevice.getVersion();
//            self.globalSettingCache.put("version", $cordovaDevice.getVersion());
//            vm.items.push(version);
            
        });


//$ionicPlatform.ready(function() {
//  $cordovaPlugin.someFunction().then(success, error);
//});
//function success(){
//    vm.items.push('Check Success on $cordova Plugin ');
//}
//function error(){
//    vm.items.push('Check Error on $cordova Plugin ');
//}
//        vm.items.push('Cordova.startVibration ' + Cordova.startVibration());
//        vm.items.push('Cordova.getGeolocation ' + Cordova.getGeolocation());
//        vm.items.push('Cordova.checkEmailComposer ' + Cordova.checkEmailComposer());
//        vm.items.push('Cordova.getPreferredLanguage ' + Cordova.getPreferredLanguage());
//        vm.items.push('Cordova.getLocaleName ' + Cordova.getLocaleName());
//        vm.items.push('Cordova.getFirstDayOfWeek ' + Cordova.getFirstDayOfWeek());
//        vm.items.push('Cordova.getFreeDiskSpace ' + Cordova.getFreeDiskSpace());


    }
    ;
})();