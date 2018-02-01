angular
    .module('HYSApp')
    .service('Goods', function ($resource) {
        this.getAllGoods = function () {
            return $resource('http://localhost:3000/goods', {}, {
                getGoods: {method: 'GET', isArray: true}
            })
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