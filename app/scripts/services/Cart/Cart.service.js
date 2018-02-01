angular
    .module('HYSApp')
    .service('Cart', function ($resource, History) {

        this.getCart = function () {
            var carts =  $resource('http://localhost:3000/cart', {}, {
                getCarts: {method: 'GET', isArray: true}
            });

            var cartsFromServer = [];

            carts.getCarts(function (response) {
                angular.forEach(response, function (item) {
                    if (item.name) {
                        cartsFromServer.push(item);
                    }
                });
            });

            return cartsFromServer;
        };

        this.removeCartById = function (id) {
            var cart = $resource('http://localhost:3000/cart/:id',
                {id: id},
                {removeCartGood: {method: "DELETE"}}
            );
            return cart.delete();
        };

        this.submitCart = function (cartGood) {
            var currentGood = History.mapObject(cartGood);
            var history = $resource('http://localhost:3000/history');

            return history.save({}, currentGood);
        };
    });