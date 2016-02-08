(function () {
    'use strict';

    angular.module('root').controller('rootIosCtrl', [
        'GlobalVariables', '$timeout', '$ionicLoading', '$cordovaNetwork','$ionicPlatform',
        'toastr', rootIosCtrl]);

    function rootIosCtrl(
        GlobalVariables, $timeout, $ionicLoading, $cordovaNetwork, $ionicPlatform, toastr
        ) {

        var vm = this;
            // $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )


        // $ionicLoading.show();
        // try{
        //     if($cordovaNetwork.isOffline()){
        //         try{
        //             navigator.notification.confirm(
        //                 GlobalVariables.globalNetworkOfflineMessage,     //  message
        //                 function(buttonIndex) {
        //         //            alert('You selected button ' + buttonIndex);
        //                 },               //  callback to invoke
        //                 GlobalVariables.globalErrorHeading,       //  title
        //                 GlobalVariables.globalErrorButtonTitle        //  button Name
        //             );
        //         }catch(e){
        //             toastr.info(GlobalVariables.globalNetworkOfflineMessage);
        //         }
        //     };
        //
        //
        // }catch(e){
        //     $ionicLoading.show();
        // }
        // $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
$ionicLoading.hide();
    };
})();
