;(function(app, m) {

	'use strict';

	app.factory('Calculator', Calculator);

	Calculator.$inject = [];

	function Calculator() {
		var equation = [],
			operators = ['+','-','/','*'],
			answer;

		var factory = {
			solve: solve,
			store: store,
			clear: clear,
			get: get
		};

		return factory;

		//////////////////

		function solve() {
			console.log(equation);
			return math.eval(equation.join(''));
		}

		function store(expression) {
			if(typeof expression === 'number' && !isOperator(equation[equation.length - 1])) {
				if(equation.length === 0) {
					equation[0] = ''+expression;
				} else {
					equation[equation.length-1] += ''+expression;
				}
			} else {
				equation.push(''+expression);
			}
		}

		function clear() {
			equation = [];
		}

		function get() {
			return equation;
		}

		function isOperator(test) {
			var bool = false;

			operators.forEach(function(op) {
				if(op === test) {
					bool = true;
					return;
				}
			});

			return bool;
		}
	}

})(angular.module('pocketCalculator'), math);