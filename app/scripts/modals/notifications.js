angular
    .module('HYSApp')
    .controller('Notifications', function (val, $scope, $uibModalInstance) {
        $scope.message = val;

        $scope.ok = function () {
            $uibModalInstance.close();
        }
    });