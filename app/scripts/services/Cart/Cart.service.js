angular
    .module('HYSApp')
    .service('Cart', function ($resource, History) {

        this.getCart = function () {
            return $resource('http://localhost:3000/cart', {}, {
                getCart: {method: 'GET', isArray: true}
            })
        };

        this.removeCartById = function (id) {
            var cart = $resource('http://localhost:3000/cart/:id',
                {id: id},
                {removeCartGood: {method: "DELETE"}}
            );
            cart.removeCartGood({}, {id: id});
        };

        this.submitCart = function (cartGood) {
            var currentGood = History.mapObject(cartGood);
            var history = $resource('http://localhost:3000/history');
            history.save({}, currentGood);
        };
    });