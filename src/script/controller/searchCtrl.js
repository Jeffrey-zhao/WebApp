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

        $scope.tClick = function(id, name) {
        	$scope.sheet.list=dict[id];
        	$scope.sheet.visible=true;
        };
        $scope.sClick=function(id,name){
        	console.log(id,name);
        }
    }]);