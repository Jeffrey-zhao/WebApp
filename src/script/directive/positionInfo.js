'use strict';

angular.module('app')
    .directive('appPositionInfo', ["$http", function($http) {
        return {
            restrict: "A",
            replace: true,
            templateUrl: "view/template/positionInfo.html",
            scope: {
                isActive: '=',
                isLogin: '=',
                pos: "="
            },
            link: function(scope, elem, attr) {
                scope.$watch('pos', function(newValue) {
                    if (newValue) {
                        scope.imagePath = scope.isActive ? "image/star-active.png" : "image/star.png";
                        scope.pos.select = scope.pos.select || false;
                    }
                })
                scope.favorite = function() {
                    $http.post('/data/favorite.json', {
                            id: scope.pos.id,
                            select: !scope.pos.select
                        })
                        .success(function(res) {
                            console.log(res);
                            scope.pos.select = !scope.pos.select;
                            scope.imagePath = scope.pos.select ? "image/star-active.png" : "image/star.png";
                        })
                };

            }
        }
    }])