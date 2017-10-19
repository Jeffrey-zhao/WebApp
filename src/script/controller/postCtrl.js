'use strict';

angular.module('app')
    .controller('postCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.tabList = [{
            id: "all",
            name: "全部"
        }, {
            id: "success",
            name: "面试邀请"
        }, {
            id: "fail",
            name: "不合格"
        }];

        $http.get('/data/myPost.json').then(function(res) {
            $scope.positionList = res.data;
        })
        $scope.filterObj = {};
        $scope.tClick = function(id, name) {
            switch (id) {
                case "all":
                    delete $scope.filterObj.state;
                    break;
                case "success":
                    $scope.filterObj.state = '1';
                    break;
                case "fail":
                    $scope.filterObj.state = '-1';
                    break;
                default:
                    break;
            }
        }
    }]);