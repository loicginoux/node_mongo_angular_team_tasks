angular.module("londy").controller("MainCtrl", function($scope) {
  console.log("main controller");
  $scope.name = "Title";
});


angular.module("londy").controller("ProjectsCtrl", function($scope) {
  $scope.projects = [
    {
      name: "test"
    }
  ];
});

angular.module("londy").controller("UsersCtrl", function($scope) {
  $scope.users = [
    {
      name: "Lo"
    }
  ];
});