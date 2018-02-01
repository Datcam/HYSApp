'use strict';

/**
 * @ngdoc overview
 * @name HYSApp
 * @description
 * # HYSApp
 *
 * Main module of the application.
 */
angular
  .module('HYSApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angularMoment'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
        .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/cart', {
            templateUrl: 'views/cart.html',
            controller: 'CartCtrl'
        })
        .when('/history', {
            templateUrl: 'views/history.html',
            controller: 'HistoryCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
