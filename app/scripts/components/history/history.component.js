angular
    .module('HYSApp')
    .component('history', {
        templateUrl: 'scripts/components/history/history.component.html',
        controller: function ($scope, Goods, History) {
            $scope.history = [];

            function activate() {
                $scope.history = History.getHistory();
            }

            activate();
        }
    });