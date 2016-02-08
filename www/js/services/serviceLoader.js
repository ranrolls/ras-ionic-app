

myApp.factory('myService', function($http) {

    var getData = function() {

        return $http({method:"GET", url:"/my/url"}).then(function(result){
            return result.data;
        });
    };
    return { getData: getData };
});


function myFunction($scope, myService) {
    var myDataPromise = myService.getData();
    myDataPromise.then(function(result) {  // this is only run after $http completes
       $scope.data = result;
       console.log("data.name"+$scope.data.name);
    });
}

