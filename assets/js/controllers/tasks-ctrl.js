angular.module("londy").controller("ProjectTasksCtrl", ["$scope", "Task", "pubsub", "taskParser", function($scope, Task, pubsub, taskParser) {
	$scope.tasks = [];

	this.loadTasks = function(event, id){
		$scope.selectedProject = id;
		if (id) {
			$scope.tasks = Task.query({project_id: id});
		}
	};



	$scope.addTask = function() {
		var value = $scope.newTask;
		if ( value ){
			var newTask = taskParser.parse(value);

			newTask.completed = false;
			newTask.project_id = $scope.selectedProject;
			newTask.created_date = Date.now();
			newTask.nb_comments = 0;

			$scope.tasks.push(newTask);

			var task = Task.create(newTask, function(serverTask){
				createdTask = $scope.tasks.pop();
				createdTask._id = serverTask._id;
				$scope.tasks.push(createdTask)
			});
			$scope.newTask = '';
		}
	}


	pubsub.subscribe('selectedProject', this.loadTasks.bind(this))
}]);