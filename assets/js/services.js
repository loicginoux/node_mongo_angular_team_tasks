// 'use strict';

// angular.module('londyServices', ['ngResource'])
// .factory('Project', function($resource) {
//   var Project = $resource('/team/:team_id/projects/:id',
//     {
//     	team_id: '51b482ce537cd62ab5000001',
//     	id: '@id',
//     }, {
//       update: { method: 'PUT' },
//       create: {method: 'POST'}
//     }
//     );
//   return Project;
// })
// .factory('Task', function($resource) {
//   var Task = $resource('/tasks/:id',
//     {
//       team_id: '51b482ce537cd62ab5000001',
//       id: '@id',
//     }, {
//       update: { method: 'PUT' },
//       create: {method: 'POST'}
//     }
//     );
//   return Task;
// })
// .factory('pubsub', function() {
//   var o = $({});

//   $.subscribe = function() {
//     o.on.apply(o, arguments);
//   };

//   $.unsubscribe = function() {
//     o.off.apply(o, arguments);
//   };

//   $.publish = function() {
//     o.trigger.apply(o, arguments);
//   };

//   return $;
// })
// .service("taskParser", function(){

// });