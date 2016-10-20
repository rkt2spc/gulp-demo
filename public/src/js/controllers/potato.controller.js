appControllers.controller('potatoCtrl', ['$scope',
	function($scope) {
		$scope.toggleState = false;
		$scope.toggleMessage = "Show potato";

		$scope.toggleImage = function() {

			$scope.toggleState = !$scope.toggleState;
			$scope.toggleMessage = ($scope.toggleState)? "Hide potato" : "Show potato";
		};
	}
]);