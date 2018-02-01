angular
.module('HYSApp')
.component('goods', {
    templateUrl: 'scripts/components/goods/goods.component.html',
    controller: function ($scope, $q, $timeout, ModalFactory, Goods) {

        $scope.availableGoods = [];
        $scope.searchText = '';

        function activate() {
            var goods = Goods.getAllGoods();

            goods.getGoods(function (response) {
                angular.forEach(response, function (item) {
                    if (item.name) {
                        $scope.availableGoods.push(item);
                    }
                });
            });
        }

        function changeSortFlag() {
            $scope.sortFlag = !$scope.sortFlag;
        }

        $scope.sort = function () {
            if ($scope.sortFlag) {
                $scope.availableGoods = _.sortBy($scope.availableGoods, 'price');
                changeSortFlag();
            } else if (!$scope.sortFlag) {
                $scope.availableGoods.reverse();
                changeSortFlag();
            }
        };

        $scope.addGood = function (index, idInDB) {

            var promise = $q(function (resolve, reject) {
                return Goods.removeGoodById(idInDB)
                    .$promise
                    .then(function (data) {
                        if (data) {
                            console.log('Ok: ', data);
                            resolve();
                        }
                    }, function (err) {
                        console.log(err);
                        reject(err);
                    });
            })
                .then(function () {
                    var good = $scope.availableGoods.splice(index, 1)[0];
                    return Goods.addGoodsToCart(good)
                        .$promise
                        .then(function (data) {
                        }, function (err) {
                            console.log('error on last step: ', err);
                        })

                })
                .then(function () {
                    ModalFactory.runModalWindows('Great, you have made an order!');
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        activate();
    }
});