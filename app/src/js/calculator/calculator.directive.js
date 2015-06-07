;(function(app) {

	'use strict';

	app.directive('calculator',calculator);

	calculator.$inject = [];

	function calculator() {
		
		var d = {
			restrict: 'E',
			templateUrl: 'templates/calculator.html',
			link: link
		};

		return d;

		function link(scope, element, attrs) {

		}
		
	}

})(angular.module('pocketCalculator'));