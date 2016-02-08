(function () {

    'use strict';

    angular.module('root').factory('News', [
        '$ionicLoading', 'CommonServices', News]);

    function News($ionicLoading, CommonServices) {

        self.data;
        self.filterField = 'cid';
        self.fetchNumber = 1;
        self.fetchLimit = 2;
        self.packetSize = 5;

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

        function getPacketSize(){
            return self.packetSize;
        }

        function setPacketSize(number){
            self.packetSize = number;
        }

        function getData(id) {
            if (typeof id == "undefined") {
                return self.data;
            } else {
                return CommonServices.fetchPromise('newsd',{'cid':id});
            }
        }

        function fetchData() {
            return CommonServices.fetchPromise('news',{'number':self.fetchNumber,'rnd' : new Date().getTime()});
        }

        function setData(number) {
            return CommonServices.fetchPromise('news',{'number':number});
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
            getPacketSize           :   getPacketSize,
            setPacketSize           :   setPacketSize,
            fetchData               :   fetchData,
            setData                 :   setData,
            getData                 :   getData,
            updateData              :   updateData
        };
    };

})();
