'use strict';

angular.module('londy', [])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/components.html',
      //   controller: 'ListComponentsCtrl'
      // })
      .when('/', {
        templateUrl: '/views/projects.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


