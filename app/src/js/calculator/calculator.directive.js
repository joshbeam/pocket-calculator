;(function(app) {

	'use strict';

	app.directive('calculator',calculator);

	calculator.$inject = ['Calculator'];

	function calculator(Calculator) {
		
		var d = {
			restrict: 'E',
			templateUrl: 'templates/calculator.html',
			link: link
		};

		return d;

		function link(scope, $el, attrs) {
			$el.find('[solve]').on('click', solve.bind($el));
		}

		/////////////////////
		
		function solve() {
			$(this).find('[display]').html(Calculator.solve(Calculator.equation));
		}

		function clear() {

		}
	}

})(angular.module('pocketCalculator'));