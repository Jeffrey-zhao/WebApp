'use strict';

angular.module('app',['ui.router','ngCookies']);



'use strict';

angular.module('app')
    .value('dict', {}).run(['$http','dict', function($http,dict) {
        $http.get('data/city.json').then(function(res) {
            dict.city = res.data;
        });
        $http.get('data/scale.json').then(function(res) {
            dict.scale = res.data;
        });
        $http.get('data/salary.json').then(function(res) {
            dict.salary = res.data;
        });
    }])
'use strict';

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('main', {
                url: '/main',
                templateUrl: 'view/main.html',
                controller: 'mainCtrl'
            })
            .state('position', {
                url: '/position/:id',
                templateUrl: 'view/position.html',
                controller: 'positionCtrl'
            })
            .state('company', {
                url: '/company/:id',
                templateUrl: "view/company.html",
                controller: 'companyCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: "view/search.html",
                controller: 'searchCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: "view/login.html",
                controller: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: "view/register.html",
                controller: 'registerCtrl'
            })
            .state('me', {
                url: '/me',
                templateUrl: "view/me.html",
                controller: 'meCtrl'
            })
            .state('post', {
                url: '/post',
                templateUrl: "view/post.html",
                controller: 'postCtrl'
            })
            .state('favorite', {
                url: '/favorite',
                templateUrl: "view/favorite.html",
                controller: 'favoriteCtrl'
            });
        $urlRouterProvider.otherwise('main');
    }])
'use strict';

angular.module('app')
.controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
	$http.get('data/company.json?id='+$state.params.id)
	.then(function(res){
		$scope.company=res.data;
		$scope.$broadcast('abc',{id:123,name:'jeffrey'})
	})
}]);
'use strict';

angular.module('app')
    .controller('favoriteCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {

    }]);
'use strict';

angular.module('app')
    .controller('loginCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {

    }]);
'use strict';

angular.module('app')
.controller('mainCtrl',['$http','$scope',function($http,$scope){
	$http.get('/data/positionList.json',{})
	.then(function(res){
		console.log(res);
		$scope.list=res.data;
	})
	.catch(function(res){
		console.log(res);
	});
}]);
'use strict';

angular.module('app')
    .controller('meCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {

    }]);
'use strict';

angular.module('app')
    .controller('positionCtrl', ['$scope', '$state', '$http', '$q','cache2', 
        function($scope, $state, $http, $q,cache2) {
        //cache2.put('zhao','cache2');

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
'use strict';

angular.module('app')
    .controller('postCtrl', ['$scope', function($scope) {

    }]);
'use strict';

angular.module('app')
    .controller('registerCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {

    }]);

'use strict';

angular.module('app')
    .controller('searchCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {
        $scope.name = '';
        $scope.search = function() {
            $http.get('data/positionList.json?name=' + $scope.name)
                .then(function(res) {
                    $scope.list = res.data;
                });
        };
        $scope.search();
        $scope.filterObj={};
        $scope.sheet = {};
        $scope.tabList = [{
                id: 'city',
                name: 'city'
            },
            {
                id: 'salary',
                name: 'salary'
            }, {
                id: 'scale',
                name: 'scale'
            }
        ];
        var tabId = '';
        $scope.tClick = function(id, name) {
            tabId = id;
            $scope.sheet.list = dict[id];
            $scope.sheet.visible = true;
        };
        $scope.sClick = function(id, name) {
            if (id) {
                angular.forEach($scope.tabList, function(item) {
                    console.log(item,id,name);
                    if (item.id == tabId) {
                        item.name = name;
                    }
                });
                $scope.filterObj[tabId+"Id"]=id;

                console.log($scope.filterObj[tabId+"Id"],id);
            } else {
                delete $scope.filterObj[tabId+"Id"];
                angular.forEach($scope.tabList, function(item) {
                    if (item.id == tabId) {
                        switch (item.id) {
                            case 'city':
                                item.name = "city";
                                break;
                            case 'salary':
                                item.name = "salary";
                                break;
                            case 'scale':
                                item.name = "scale";
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        };
    }]);
'use strict';

angular.module('app')
.directive('appCompanyInfo',[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/companyInfo.html",
		scope:{
			com:'='
		}
	}
}])

'use strict';

angular.module('app')
.directive('appFoot',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/foot.html'
	};
}]);
'use strict';

angular.module('app')
.directive('appHead',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html'
	}
}])


'use strict';

angular.module('app')
.directive('appHeadBar',[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/headBar.html",
		scope:{
			text:'='
		},
		link:function(scope,elem,attr){
			scope.back=function(){
				window.history.back();
			}
			scope.$on('abc',function(event,data){
				console.log(event,data);
			})
		}
	}
}])
'use strict';

angular.module('app')
    .directive('appPositionClass', [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "view/template/positionClass.html",
            scope:{
            	com:'='
            },
            link:function(scope,elem,attr){
            	scope.showPositionList=function(idx){
            		scope.positionList=scope.com.positionClass[idx].positionList;
            		scope.isActive=idx;
            	};

            	scope.$watch('com',function(newValue,oldValue,scp){
            		if(newValue) scope.showPositionList(0);
            	})          	
            }
        }
    }]);
'use strict';

angular.module('app')
.directive('appPositionInfo',[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/positionInfo.html",
		scope:{
			isActive:'=',
			isLogin:'=',
			pos:"="
		},
		link:function(scope,elem,attr){
			scope.imagePath=scope.isActive?"image/star-active.png":"image/star.png";
		}
	}
}])

'use strict';

angular.module('app')
.directive('appPositionList',[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/positionList.html",
		scope:{
			data:'=',
			filterObj:'='
		}
	}
}])

'use strict';

angular.module('app')
.directive('appSheet',[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			list:'=',
			isVisible:'=',
			select:'&'
		},
		templateUrl:"view/template/sheet.html"
	}
}])

'use strict';

angular.module('app')
.directive('appTab',[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			list:"=",
			tabClick:'&'
		},
		templateUrl:"view/template/tab.html",
		link:function(scope){
			scope.click=function(tab){
				scope.selectedId=tab.id;
				scope.tabClick(tab);
			}
		}
	}
}])
'use strict';

angular.module('app')
    .filter('filterByObj', [function() {
        return function(list, obj) {
            var result = [];
            angular.forEach(list, function(item) {
                var isEqual = true;
                for (var e in obj) {
                    if (item[e] !== obj[e]) {
                        isEqual = false;
                    }
                }
                if (isEqual) {
                    result.push(item);
                }
            })
            return result;
        }
    }]);
angular.module('app')
.service('cache',['$cookies',function($cookies){
	this.put=function(key,value){
		$cookies.put(key,value);
	};

	this.get=function(key){
		return $cookies.get(key);
	};

	this.remove=function(key){
		$cookies.remove(key);
	};
}])
.factory('cache2',['$cookies',function($cookies){
	return {

		put:function(key,value){
			$cookies.put(key,value);
		},

		get:function(key){
			return $cookies.get(key);
		},

		remove:function(key){
			$cookies.remove(key);
		}
	}
}]);
