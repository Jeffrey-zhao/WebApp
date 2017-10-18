'use strict';

angular.module('app')
    .controller('loginCtrl', ['$scope', '$http','cache','$state', function($scope, $http,cache,$state) {
    	$scope.submit=function(){
    		$http.post('/data/login.json',$scope.user).success(function(res){
    			cache.put('id',res.data.id);
    			cache.put('name',res.data.name);
    			cache.put('image',res.data.image);
    			$state.go('main');

    		})
    	}
    }]);