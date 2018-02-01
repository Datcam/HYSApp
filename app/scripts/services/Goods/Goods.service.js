angular
    .module('HYSApp')
    .service('Goods', function ($resource) {

        this.goodsInCart = [{id: 1, name: 'Lenovo', detail: ['1GBRAM', '16GB', '140g'], price: 80}];
        this.availableGoods = [
            {id: 1, name: 'Lenovo', detail: ['1GBRAM', '16GB', '140g'], price: 80},
            {id: 2, name: 'Meizu', detail: ['3GBRAM', '32GB', '166g'], price: 200},
            {id: 3, name: 'Honnor', detail: ['2GBRAM', '8GB', '150g'], price: 245},
            {id: 4, name: 'Sony', detail: ['4GBRAM', '64GB', '180g'], price: 160},
            {id: 5, name: 'iPhone', detail: ['5GBRAM', ' 256GB', '146'], price: 300}
        ];

        this.getAllGoods = function () {
            return $resource('http://localhost:3000/goods', {}, {
                getGoods: {method: 'GET', isArray: true}
            })
        };

        this.addGoodsToCart = function (good) {
            var cart = $resource('http://localhost:3000/cart');
            cart.save({}, good);
        };

        this.removeGoodById = function (id) {
            var cart = $resource('http://localhost:3000/goods/:id',
                {id: id},
                {removeGood: {method: "DELETE"}}
            );
            cart.removeGood({}, {id: id});
        };
    });