'use strict';

angular.module('londyServices').factory('Task', function($resource) {
  var Task = $resource('/tasks/:id',
    {
      project_id: "",
      id: '@id',
    }, {
      update: { method: 'PUT' },
      create: {method: 'POST'}
    }
    );
  return Task;
})