(function () {

    'use strict';

    //var intervalTimer = 2000;
    //var intervalHandler;

    angular.module('root').controller('aboutCtrl', ['toastr',
        '$timeout', '$ionicLoading', '$scope',
        'GlobalVariables', 'GlobalData', aboutCtrl]);

    function aboutCtrl(toastr, $timeout, $ionicLoading, $scope,
            GlobalVariables, GlobalData) {

        var vm = this;

        vm.data = {}, vm.img = '', vm.introtext = '';
        var loadingTime = GlobalVariables.loaderDefaultTime;  // only number value allowed

        $ionicLoading.show(                {                    template: '\                        <span class="text-center"><ion-spinner></ion-spinner><br /><br />\n\                        <i>Loading...</i></span>\n\                    '                }            )
        GlobalData.getAbout()
                .then(
                        function (data) {
                            vm.data = data;
                            // console.log(data);
                            // $timeout(function(){
                            //   vm.img = vm.data.images;
                              // vm.introtext = vm.data.introtext;
                              // angular.element('.bew').html(vm.introtext);
                            // },5000);
                        },
                        function (data, status, headers, config) {

                            try {
                                navigator.notification.confirm(GlobalVariables.globalErrorMessage, function () {
                                }, GlobalVariables.globalErrorHeading, GlobalVariables.globalErrorButtonTitle);
                            } catch (e) {
                                toastr.info(GlobalVariables.globalErrorMessage);
                            }

                            vm.data = {
                                "title": "Home \/ About",
                                "introtext": "&lt;p&gt;&lt;strong&gt;Lorem Ipsum&lt;\/strong&gt; is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&lt;\/p&gt;\r\n&lt;div class=&quot;clearfix&quot;&gt;&amp;nbsp;&lt;\/div&gt;\r\n&lt;div class=&quot;pull-left col-xs-7 pd0&quot;&gt;&lt;img src=&quot;images\/page\/about_img.jpg&quot; alt=&quot;&quot; \/&gt;&lt;\/div&gt;\r\n&lt;div class=&quot;pull-left col-xs-5 about_bg pd0&quot;&gt;&lt;strong class=&quot;text-center&quot;&gt;Lorem Ipsum is simply dummy text&lt;\/strong&gt;\r\n&lt;p class=&quot;text-center&quot;&gt;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make&lt;\/p&gt;\r\n&lt;\/div&gt;",
                                "fulltext": "",
                                "catid": "2",
                                "images": "http:\/\/ras.refine-dev.com\/newras\/page\/",
                                "urls": "{\"urla\":false,\"urlatext\":\"\",\"targeta\":\"\",\"urlb\":false,\"urlbtext\":\"\",\"targetb\":\"\",\"urlc\":false,\"urlctext\":\"\",\"targetc\":\"\"}",
                                "urla": false,
                                "urlatext": "",
                                "urlb": false,
                                "urlbtext": "",
                                "urlc": false,
                                "urlctext": ""
                            };
                        }
                );
    }
    ;

})();
