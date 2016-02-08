(function () {

    'use strict';

    angular.module('root')

    .run(function ($rootScope, $ionicLoading) {

        $rootScope.$on('loading:show', function () {
            $ionicLoading.show(
                {
                    template: '\
                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\
                        <i>Loading...</i></span>\n\
                    '
                }
            )
        })
        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        })

    })
    .factory('$exceptionHandler', function () {
        return function errorCatcherHandler(exception, cause) {

            //console.log()

//            console.log(exception.substr(0,25));
//            console.log(typeof exception);
//            console.log(exception.TypeError);

            if(exception.name == "TypeError" && exception.message == "i is undefined"){
//                console.log(exception.name);
//                console.error(exception.message);
            }else if(exception.message == "The connection to ws://192.168.0.164:35729/livereload was interrupted while the page was loading." || exception.message == "Using //@ to indicate sourceMappingURL pragmas is deprecated. Use //# instead")
            {

            }
            else{
                console.error(exception);
            }
//            console.error(exception);
//            console.log(exception);
//            console.error(exception.stack);   .constructor,

//            Vendor-specific Extensions
//
//Microsoft:
//
//description: Error description. Similar to message.
//
//number: Error number.
//
//Mozilla:
//
//fileName: Path to file that raised this error.
//
//lineNumber: Line number in file that raised this error.
//
//stack: Stack trace.
//            Raven.captureException(exception);
        };
    })
    ;

//    .config(function($provide) {
//        $provide.decorator('$exceptionHandler', ['$log', '$delegate',
//          function($log, $delegate) {
//            return function(exception, cause) {
//              $log.debug('Default exception handler.');
//              $delegate(exception, cause);
//            };
//          }
//        ]);
//      });


    $(window).bind("orientationchange", function () {
        var orientation = window.orientation;
        var new_orientation = (orientation) ? 0 : 180 + orientation;
        $('body').css({
            "-webkit-transform": "rotate(" + new_orientation + "deg)"
        });
    });

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
try {
    navigator.splashscreen.show();
}catch(e){}
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false);
    }
    ;

   function detectOrientation(){
       if(typeof window.onorientationchange != 'undefined'){
           if ( orientation == 0 ) {
               //Do Something In Portrait Mode
//                alert('orientation value is = ' + orientation);
           }
           else if ( orientation == 90 ) {
               //Do Something In Landscape Mode
//                alert('orientation value is = ' + orientation);
           }
           else if ( orientation == -90 ) {
               //Do Something In Landscape Mode
//                alert('orientation value is = ' + orientation);
           }
           else if ( orientation == 180 ) {
               //Do Something In Landscape Mode
//                alert('orientation value is = ' + orientation);
           }
       }
   }

   detectOrientation();
   window.onorientationchange = detectOrientation; 

})();
