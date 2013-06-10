'use strict';


// angular.module('mongolab', ['ngResource']).
// factory('Component', function($resource) {
//   var Component = $resource('https://api.mongolab.com/api/1/databases' +
//     '/angular_component_store/collections/components/:id',
//     { apiKey: 'Fwp5JA8YbuP-ly6QeZ0mpR8iPO4rwyp7' }, {
//       update: { method: 'PUT' }
//     }
//     );

//   Component.prototype.update = function(compo) {
//     return Component.update({id: this._id.$oid},
//       angular.extend({}, this, {_id:undefined}), compo);
//   };

//   Component.prototype.destroy = function(compo) {
//     return Component.remove({id: this._id.$oid}, compo);
//   };

//   return Component;
// });