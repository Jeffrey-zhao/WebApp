'use strict';

angular.module('app')
.controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
	$http.get('data/company.json?id='+$state.params.id)
	.then(function(res){
		$scope.company=res.data;
		$scope.$broadcast('abc',{id:123,name:'jeffrey'})
	})
}]);