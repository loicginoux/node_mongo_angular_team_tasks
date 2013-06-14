angular.module("londy").directive('task', ["$timeout", function ($timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    // scope:{
    //   project: "="
    // },
    require: "^ngController", // require parent controller for the link function
    link: function ($scope, elm, attrs, projectsController) {
      $scope.editable = false;
      $scope.switchEditable = function(event) {
        // when focusing out, we wait so that
        // in case we click on delete, it can first fire click event
        if (event.type == "blur") {
          $timeout(function() {
            $scope.editable = !$scope.editable;
          }, 0);
        }else{
          // change to edit mode
          $scope.editable = !$scope.editable;
          $timeout(function() {
            // when changed, we can focus on input
            elm.find("input").focus()
          }, 0)
        }
      };
      $scope.updateAndSwitch = function(id, event){
        $scope.switchEditable();
        if (typeof projectsController.updateProject == "function"){
          projectsController.updateProject(id, event)
        }
      };
      $scope.selectProject = function(id){
        if (typeof projectsController.showProject == "function"){
          projectsController.showProject(id, event)
        }
      };
    },
    templateUrl: "/views/task.html"
  }
}]);