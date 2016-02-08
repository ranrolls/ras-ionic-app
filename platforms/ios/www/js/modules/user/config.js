(function () {

    'use strict';

    angular.module('root')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home.user', {
                    url: "/user",
                    templateUrl: "js/modules/user/view.html",
                    controller: "userCtrl"
                })
                .state('home.userDetail', {
                    url: "/userDetail",
                    templateUrl: "js/modules/user/detail.html",
                    controller: "userCtrl as uc",
                    resolve: {
                        userData: userData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'userProfile'
                            });
                        }
                    }
                })
                .state('home.username', {
                    url: "/username",
                    templateUrl: "js/modules/user/username.html",
                    controller: "passwordCtrl as fc",
                    resolve: {
                        userData: userData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Login '
                            });
                        }
                    }
                })
                .state('home.password', {
                    url: "/password",
                    templateUrl: "js/modules/user/password.html",
                    controller: "passwordCtrl as fc",
                    resolve: {
                        userData: userData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Login '
                            });
                        }
                    }
                })
                .state('home.verifyCode', {
                    url: "/verifyCode",
                    templateUrl: "js/modules/user/verifyCode.html",
                    controller: "passwordCtrl as vc",
                    resolve: {
                        userData: userData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Login'
                            });
                        }
                    }
                })
                .state('home.editProfile', {
                    url: "/editProfile",
                    templateUrl: "js/modules/user/editProfile.html",
                    controller: "userCtrl as uc",
                    resolve: {
                        userData: userData,
                        editData:editData
                        // menuText : function($rootScope) {
                        //     $rootScope.$broadcast('menutext', {
                        //         'text' : 'Login'
                        //     });
                        // }
                    }
                })
                .state('home.changePass', {
                    url: "/changePass",
                    templateUrl: "js/modules/user/changePassword.html",
                    controller: "passwordCtrl as cc",
                    resolve: {
                        userData: userData,
                        menuText : function($rootScope) {
                            $rootScope.$broadcast('menutext', {
                                'text' : 'Login'
                            });
                        }
                    }
                })
                ;
        });

    function userData(User) {
        return User.getData();
    }

    function editData(User) {
        return User.editData();
    }

})();
