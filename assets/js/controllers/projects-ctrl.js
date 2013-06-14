angular.module("londy").controller("ProjectsCtrl", [ "$scope", "Project", "pubsub", function($scope, Project, pubsub) {

  $scope.projects = Project.query();

  $scope.addProject = function() {
    if ($scope.projectName != ""){
      $scope.projects.push({
        name:$scope.projectName
      });

      var proj = Project.create({
        name:$scope.projectName
      }, function(project){
        proj = $scope.projects.pop();
        proj._id = project._id;
        $scope.projects.push(proj)
      });
      $scope.projectName = '';
    }
  }

  $scope.removeProject = function(id) {
    Project.delete({id: id});
    $scope.projects = $scope.projects.filter(function(el){
      return el._id != id;
    });
    if ($scope.selectedProject == id) {
      pubsub.publish('selectedProject', "");
    }
  }

  this.updateProject = function(id, event) {
    var val = event.target.value;
    if (!val) {
      $scope.removeProject(id);
    } else{
      $scope.projects = $scope.projects.map(function(proj){
        if (proj._id == id) proj.name = val;
        return proj;
      });
      Project.update({
        id: id,
        name: event.target.value
      });
    }
  }

  this.showProject = function(id) {
    $scope.selectedProject = id;
    pubsub.publish('selectedProject', id);
  }
}]);