angular
.module('HYSApp')
.component('cart', {
   templateUrl: 'scripts/components/cart/cart.component.html',
   controller: function ($scope, Goods, Cart, History) {
       // $scope.goodsInCart = Goods.getGoodsFromCart();

       $scope.sum = 0;
       $scope.goodsInCart = [];

       function activate() {
           var cart = Cart.getCart();

           cart.getCart(function (response) {
               angular.forEach(response, function (item) {
                   if (item.name) {
                       $scope.goodsInCart.push(item);
                   }
               });

               $scope.updateSum();
           });
       }

       $scope.updateSum = function () {
           $scope.sum = 0;
           $scope.goodsInCart.forEach(function (item) {
               $scope.sum += item.price;
           });
       };

       $scope.submit = function (index, idInDB) {
           var cartGood = $scope.goodsInCart.splice(index, 1)[0];
           Cart.submitCart(cartGood);
           Cart.removeCartById(idInDB);
           $scope.updateSum();
       };

       $scope.remove = function (index, idInBD) {
           $scope.goodsInCart.splice(index, 1);
           Cart.removeCartById(idInBD);
           $scope.updateSum();

       };

       activate();
   }
});