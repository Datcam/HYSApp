angular
    .module('HYSApp')
    .component('history', {
        templateUrl: 'scripts/components/history/history.component.html',
        controller: function ($scope, Goods, History) {

            $scope.history = [];

            function activate() {
                var history = History.getHistory();

                history.getHistory(function (response) {
                    angular.forEach(response, function (item) {
                        if (item.name) {
                            $scope.history.push(item);
                        }
                    });
                });
            }

            activate();
        }
    });