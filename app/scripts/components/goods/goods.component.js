angular
.module('HYSApp')
.component('goods', {
   bindings: {
       availableGoods: '='
   },
    templateUrl: 'scripts/components/goods/goods.component.html',
    controller: function ($scope, ModalFactory, Goods, $resource) {

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
            var good = $scope.availableGoods.splice(index, 1)[0];
            Goods.addGoodsToCart(good);
            Goods.removeGoodById(idInDB);
            ModalFactory.runModalWindows('Great, you have made an order!');
        };

        activate();
    }
});