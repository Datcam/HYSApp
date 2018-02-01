angular
.module('HYSApp')
.component('cart', {
   templateUrl: 'scripts/components/cart/cart.component.html',
   controller: function ($scope, $q,  Goods, Cart, History) {
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
           var promise = $q(function (resolve, reject) {
               var cartGood = $scope.goodsInCart.splice(index, 1)[0];
               return Cart.submitCart(cartGood)
                   .$promise
                   .then(function (data) {
                       console.log('Ok: ', data);
                       resolve();
                   }, function (err) {
                       console.log('Error: ', err);
                       reject();
                   })
           })
               .then(function () {
                   return Cart.removeCartById(idInDB)
                       .$promise
                       .then(function (data) {
                           console.log('Ok: ', data);
                       }, function (err) {
                           console.log('Error: ', err);
                       });
               })
               .then(function () {
                   $scope.updateSum();
               })
               .catch(function (err) {
                   console.log('Some error are appears: ', err);
               });
       };

       $scope.remove = function (index, idInBD) {

           var promise = $q(function (resolve, reject) {
               return Cart.removeCartById(idInBD)
                   .$promise
                   .then(function (data) {
                       console.log('Ok: ', data);
                       resolve();
                   }, function (err) {
                       console.log('Error: ', err);
                       reject(err);
                   })
           })
               .then(function () {
                   $scope.goodsInCart.splice(index, 1);
                   $scope.updateSum();
               })
               .catch(function (err) {
                   console.log('Some error are appears: ', err);
               });
       };

       activate();
   }
});