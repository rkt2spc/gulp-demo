var app = angular.module('app', []);

app.controller('messagePrintingCtrl', ['$scope',
	function($scope) {
		$scope.message = 'hahaha';

		$scope.printMessage = function() {
			window.alert($scope.message);
		}
	}
])

app.component('messagePrinting', {
	templateUrl: '/partials/message.html',
	controller: 'messagePrintingCtrl'
})