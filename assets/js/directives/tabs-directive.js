angular.module("londy").directive("tabs", function() {
  return {
    restrict: "E",
    transclude: true,
    scope: {},
    controller: function($scope, $element) {
      var panes;
      panes = $scope.panes = [];
      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          return pane.selected = false;
        });
        return pane.selected = true;
      };
      return this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        return panes.push(pane);
      };
    },
    templateUrl: "/views/tabs.html",
    replace: true
  };
}).directive("pane", function() {
  return {
    require: "^tabs",
    restrict: "E",
    transclude: true,
    scope: {
      title: "@"
    },
    link: function(scope, element, attrs, tabsCtrl) {
      return tabsCtrl.addPane(scope);
    },
    templateUrl: "/views/pane.html",
    replace: true
  };
});