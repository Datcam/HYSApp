'use strict';

/**
 * @ngdoc service
 * @name HYSApp.ModalFactory
 * @description
 * # ModalFactory
 * Service in the HYSApp.
 */
angular.module('HYSApp')
  .service('ModalFactory', function ($uibModal) {
    this.runModalWindows = function (val) {
        return $uibModal.open({
            templateUrl: 'scripts/modals/notifications.html',
            controller: 'Notifications',
            resolve:{
                val: function () {
                    return val;
                }
            }
        }).result.catch(function (res) {
                console.log('it was ', res);
        });
    }
  });
