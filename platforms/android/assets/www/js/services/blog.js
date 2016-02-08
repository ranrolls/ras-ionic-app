(function () {
    'use strict';

    angular.module('root').factory('Blog', ['$http', '$q', 'GlobalUrl', '$ionicLoading', Blog]);

    function Blog($http, $q, GlobalUrl, $ionicLoading) {

        self.data; self.categoryData; self.firstFetch = true;
        self.filterField = 'cid';
        
        function addComment(cid, un, ce, ct) {
            
            var def4 = $q.defer();
            
            var parameters = { 'id': cid, 'userName': un, 'commentEmail': ce, 'commentText': ct };
            
            $http.get(GlobalUrl.getUrl('blog-category-list-item-comments-insert'), {
                params: parameters
            }).success(function (data, status, headers, config) {
                def4.resolve(data);
            }).error(function (data, status, headers, config) {
                def4.reject("Failed to get data");
            });
            
            return def4.promise;
            
        }
        
        function fetchCategoryListItemComments(id) {
            
//            console.log('incomming cat Id is = ' + subCatId);
            var def3 = $q.defer();
            
            var parameters = { 'blogid': id };
            
            $http.get(GlobalUrl.getUrl('blog-category-list-item-comments'), {
                params: parameters
            }).success(function (data, status, headers, config) {
                def3.resolve(data);
//                console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
//                console.log(data);
            }).error(function (data, status, headers, config) {
                def3.reject("Failed to get data");
//                console.log('failed to get data in fetch sub category data');
//                console.log(headers);
            });
            
            return def3.promise;
        }
        
        function fetchCategoryListItem(id) {
            
//            console.log('incomming cat Id is = ' + subCatId);
            var def2 = $q.defer();
            
            var parameters = { 'id': id };
            
            $http.get(GlobalUrl.getUrl('blog-category-list-item'), {
                params: parameters
            }).success(function (data, status, headers, config) {
                def2.resolve(data);
//                console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
//                console.log(data);
            }).error(function (data, status, headers, config) {
                def2.reject("Failed to get data");
//                console.log('failed to get data in fetch sub category data');
//                console.log(headers);
            });
            
            return def2.promise;
        }
        
        function fetchCategoryList(subCatId) {
            
//            console.log('incomming cat Id is = ' + subCatId);
            var def1 = $q.defer();
            
            var parameters = { 'catId': subCatId };
            
            $http.get(GlobalUrl.getUrl('blog-category-list'), {
                params: parameters
            }).success(function (data, status, headers, config) {
                def1.resolve(data);
//                console.log('incommming subCatId id in fetchSubCatData is = ' + subCatId);
//                console.log(data);
            }).error(function (data, status, headers, config) {
                def1.reject("Failed to get data");
//                console.log('failed to get data in fetch sub category data');
//                console.log(headers);
            });
            
            return def1.promise;
        }
        
        function fetchCategoryData(force) {
            
            var def = $q.defer();
            
            if (force || self.firstFetch) {
                
                $http.get(GlobalUrl.getUrl('blog-category'), {
                    params: {}
                }).success(function (data, status, headers, config) {
                    self.firstFetch = false;
                    self.categoryData = data;
                    def.resolve(data);
                }).error(function (data, status, headers, config) {
                    def.reject("Failed to get data");
                });
                
                return def.promise;
                
            } else {
                
//                console.log(self.categoryData);
                return self.categoryData;
            }
            
        }

        function getData(id) {
            if (typeof id == "undefined") {
                return self.data;
            } else {
                var r;
//                console.log('incomming id is = ' + id);
                var d = self.data;

//                console.log(d);

                $.each(d, function (i1, v1) {
                    $.each(v1, function (i2, v2) {
                        if (i2 == 'pName' && v2 == id) {
                            r = v1;
                        }
                    });
                });
//                console.log('result from news service = ' + r);
                return r;
            }
        }

        function setData(data) {
            if (typeof data == "undefined") {
                self.data = [
                    {
                        "pName": "Kunda Pawali",
                        "pCategoriesIds": "100, 101",
                        "pFinish": "Gloss",
                        "pSizes": "12,14,18,20,22,24",
                        "pGauge": "",
                        "pImgUrl": "Kunda Pawali PLain 12x18 20x24"
                    },
                    {
                        "pName": "Pawali",
                        "pCategoriesIds": "100, 101",
                        "pFinish": "Gloss",
                        "pSizes": "12,14,16,18,20,22,24",
                        "pGauge": "",
                        "pImgUrl": "Pawali PLain 12x18 20x24"
                    },
                    {
                        "pName": "Kadhi Kunda",
                        "pCategoriesIds": "100, 102",
                        "pFinish": "Gloss",
                        "pSizes": "20,22,24",
                        "pGauge": "",
                        "pImgUrl": "Kadi Kunda 19x24"
                    },
                    {
                        "pName": "Ring Bucket",
                        "pCategoriesIds": "100, 102",
                        "pFinish": "Gloss",
                        "pSizes": "3,4,5",
                        "pGauge": "",
                        "pImgUrl": "BUCKET RING WITH COVER"
                    },
                    {
                        "pName": "Classic Barni ( Jointless )",
                        "pCategoriesIds": "100, 103",
                        "pFinish": "Gloss",
                        "pSizes": "1,1.5,2,2.5,3,4,5,6,8,10",
                        "pGauge": "",
                        "pImgUrl": "Barni Life time 1x6"
                    },
                    {
                        "pName": "Ring Barni ( Jointless )",
                        "pCategoriesIds": "100, 103",
                        "pFinish": "Gloss",
                        "pSizes": "1,1.5,2,2.5,3,4,5",
                        "pGauge": "",
                        "pImgUrl": "BURNI RING WITHOUT JOINT"
                    },
                    {
                        "pName": "Milk Pot",
                        "pCategoriesIds": "100, 104",
                        "pFinish": "Gloss",
                        "pSizes": "7 X 9, 10 X 14, 15 X 18",
                        "pGauge": "",
                        "pImgUrl": "Milk POt 7x9 10x24"
                    },
                    {
                        "pName": "Premium Milk Can",
                        "pCategoriesIds": "100, 104",
                        "pFinish": "Dual",
                        "pSizes": "1,2,3",
                        "pGauge": "",
                        "pImgUrl": "PREMIUM MILK CAN"
                    },
                    {
                        "pName": "DD Russian Ring",
                        "pCategoriesIds": "100, 105",
                        "pFinish": "Gloss",
                        "pSizes": "7 X 9, 10 X 14, 15 X 18",
                        "pGauge": "",
                        "pImgUrl": "Deep Dabba Russian Ring 10x14"
                    }];
            } else {
                self.data = data;
            }

        }

        self.sampleCategories = {"status":"1","result":[{"id":"1","name":"Social","alias":"social","description":"<p>Social<\/p>"},{"id":"2","name":"Entertainment","alias":"entertainment","description":""},{"id":"3","name":"Restaurent","alias":"restaurent","description":""},{"id":"4","name":"Megical","alias":"megical","description":""}]};


        return {
            sampleCategories    : sampleCategories,
            addComment          : addComment,
            fetchCategoryListItemComments: fetchCategoryListItemComments,
            fetchCategoryListItem:fetchCategoryListItem,
            fetchCategoryList   : fetchCategoryList,
            fetchCategoryData   : fetchCategoryData,
            setData             : setData,
            getData             : getData
        };
    }
    ;
})();