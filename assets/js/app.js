'use strict';

// modules definition
angular.module('londyServices', ['ngResource'])
angular.module('londy', ["londyServices", "ui.directives"])


// app configuration
angular.module('londy')
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/components.html',
      //   controller: 'ListComponentsCtrl'
      // })
      .when('/', {
        templateUrl: '/views/app.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


