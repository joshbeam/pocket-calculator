;(function(app, m) {

	'use strict';

	app.factory('Calculator', Calculator);

	Calculator.$inject = [];

	function Calculator() {
		var equation = '1+1',
			answer;

		var factory = {
			solve: solve,
			store: store,
			clear: clear
		};

		return factory;

		//////////////////

		function solve() {
			return math.eval(equation);
		}

		function store(expression) {
			equation += expression;
		}

		function clear() {
			equation = null;
		}
	}

})(angular.module('pocketCalculator'), math);