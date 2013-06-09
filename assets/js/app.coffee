angular.module('londy', ["mongolab"])
	.config(($routeProvider) ->
		$routeProvider
			.when('/', {
				templateUrl: 'assets/partials/app.html',
				controller: 'ProjectCtrl'
			})
			# .when('/component/:componentId', {
			#   templateUrl: 'views/component.html',
			#   controller: 'ShowComponentCtrl'
			# })
			.otherwise({
				redirectTo: '/'
			})
	)
