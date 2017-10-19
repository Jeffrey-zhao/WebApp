'use strict';

angular.module('app')
    .controller('positionCtrl', ['$scope', '$state', '$http', '$q', 'cache', '$log',
        function($scope, $state, $http, $q, cache, $log) {
            //cache2.put('zhao','cache2');
            $scope.message = $scope.isLogin ? '投个简历' : '去登陆';
            $scope.isLogin = !!cache.get('name');

            function getPosition() {
                var def = $q.defer();

                $http.get("/data/position.json?id=" + $state.params.id, {})
                    .then(function(res) {
                        $scope.position = res.data;
                        console.log(res.data)
                        if (res.data.posted) {
                            $scope.message = "已投递";
                        }
                        def.resolve(res);
                    }).catch(function(error) {
                        def.reject(error);
                    });
                return def.promise;
            };

            function getCompany(id) {
                $http.get('/data/company.json?id=' + id)
                    .then(function(res) {
                        $scope.company = res.data;
                    });
            };

            getPosition()
                .then(function(obj) {
                    getCompany(obj.companyId);
                });

            $scope.go = function() {
                if ($scope.message !== '已投递') {
                    if ($scope.isLogin) {
                        $http.post('/data/handle.json', {
                            id: $scope.position.id
                        }).success(function(res) {
                            $log.info(res.data);

                            $scope.message = '已投递'
                        })
                    } else {
                        $state.go('login')
                    }
                }
            }
        }
    ]);