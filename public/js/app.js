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

app.controller('potatoCtrl', ['$scope',
	function($scope) {
		$scope.toggleState = false;
		$scope.toggleMessage = "Show potato";

		$scope.toggleImage = function() {

			$scope.toggleState = !$scope.toggleState;
			$scope.toggleMessage = ($scope.toggleState)? "Hide potato" : "Show potato";
		}
	}
])

app.component('potato', {
	templateUrl: '/partials/potato.html',
	controller: 'potatoCtrl'
})