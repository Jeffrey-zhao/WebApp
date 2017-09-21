'use strict';

angular.module('app')
    .controller('positionCtrl', ['$scope', '$state', '$http', '$q', function($scope, $state, $http, $q) {
        $scope.isLogin = false;

        function getPosition() {
        	var def=$q.defer();

            $http.get("/data/position.json?id=" + $state.params.id, {})
                .then(function(res) {
                    $scope.position = res.data;
                    def.resolve(res);
                }).catch(function(error){
                	def.reject(error);
                });
            return def.promise;
        };
        function getCompany(id){
        	$http.get('/data/company.json?id='+id)
        	.then(function(res){
        		console.log(res);
        		$scope.company=res.data;
        	});
        };

        getPosition()
        .then(function(obj){
        	getCompany(obj.companyId);
        });
    }]);