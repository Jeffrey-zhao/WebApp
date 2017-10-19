'use strict';

angular.module('app')
    .controller('registerCtrl', ['$scope', '$http', '$interval','$state','cache', function($scope, $http, $interval,$state,cache) {
        $scope.submit = function() {
            $http.post('/data/regist.json',$scope.user)
            	.success(function(res){
            		$state.go('login');
            	});
        };

        var count = 60;
        $scope.sendCode = function() {
            $http.get('/data/code.json')
                .then(function(res) {
                    if (res.data&&1 === res.data.state) {
                        count = 60;
                        $scope.time = count+'s';
                        var interval = $interval(function() {
                            if (count <= 0) {
                                $interval.cancel(interval);
                                $scope.time = '';
                                return;
                            } else {

                                count--;
                                $scope.time = count + 's';
                            }
                        }, 1000)
                    }
                })
        }
    }]);