'use strict';

angular.module('londyServices')
.factory('Project', function($resource) {
  var Project = $resource('/team/:team_id/projects/:id',
    {
    	team_id: '51b482ce537cd62ab5000001',
    	id: '@id',
    }, {
      update: { method: 'PUT' },
      create: {method: 'POST'}
    }
    );
  return Project;
});