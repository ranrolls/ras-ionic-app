(function () {
    'use strict';

    angular.module('root').factory('Articles', [
        '$ionicLoading', 'CommonServices', Articles]);

    function Articles($ionicLoading, CommonServices) {

        self.data;
        self.filterField = 'cid';
        self.fetchNumber = 1;
        self.fetchLimit = 5;
        
        function initialiseData(){
            self.data = [];
        }
        
        function initialiseFetchNumber(){
            self.fetchNumber = 1;
        }
        
        function initialiseFetchLimit(){
            self.fetchLimit = 3;
        }
        
        function getFetchNumber(){
            return self.fetchNumber;
        }
        
        function incrementFetchNumber(){
            self.fetchNumber++;
        }

        function getFetchLimit(){
            return self.fetchLimit;
        }
        
        function setFetchLimit(number){
            self.fetchLimit = number + 1;
        }

        function getData(id) {
            if (typeof id == "undefined") {
                return self.data;
            } else {
                return CommonServices.fetchPromise('articlesd',{'cid':id});
            }
        }
        
        function fetchData() {
            return CommonServices.fetchPromise('articles',{'number':self.fetchNumber});
        }
        
        function setData(number) {
            return CommonServices.fetchPromise('articles',{'number':number});
        }
        
        function updateData(data){
            self.data = data;
        }

        return {
            initialiseData          :   initialiseData,
            initialiseFetchNumber   :   initialiseFetchNumber,
            initialiseFetchLimit    :   initialiseFetchLimit,
            getFetchNumber          :   getFetchNumber,
            incrementFetchNumber    :   incrementFetchNumber,
            getFetchLimit           :   getFetchLimit,
            setFetchLimit           :   setFetchLimit,
            fetchData               :   fetchData,
            setData                 :   setData,
            getData                 :   getData,
            updateData              :   updateData
        };
    };
})();