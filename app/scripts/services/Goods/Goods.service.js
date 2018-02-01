angular
    .module('HYSApp')
    .service('Goods', function ($resource) {

        this.getAllGoods = function () {
            var goods = $resource('http://localhost:3000/goods', {}, {
                getGoods: {method: 'GET', isArray: true}
            });

            var goodsFromServer = [];

            goods.getGoods(function (response) {
                angular.forEach(response, function (item) {
                    if (item.name) {
                        goodsFromServer.push(item);
                    }
                });
            });

            return goodsFromServer;
        };

        this.addGoodsToCart = function (good) {
            var cart = $resource('http://localhost:3000/cart');
            return cart.save({}, good);
        };

        this.removeGoodById = function (id) {
            var goodById = $resource('http://localhost:3000/goods/:id',
                {id: id},
                {removeGood: {method: "DELETE"}}
            );

            return goodById.delete();
        };
    });