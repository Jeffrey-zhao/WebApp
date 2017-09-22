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