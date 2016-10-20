appControllers.controller('messagePrintingCtrl', ['$scope',
	function($scope) {
		$scope.message = 'hahaha';

		$scope.printMessage = function() {
			window.alert($scope.message);
		};
	}
]);