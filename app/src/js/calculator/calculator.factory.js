// TODO: show error in display if there's an error
;(function(app, m) {

	'use strict';

	app.factory('Calculator', Calculator);

	Calculator.$inject = [];

	function Calculator() {
		var equation = [],
			operators = ['+', '-', '/', '*', '%'],
			answer;

		var factory = {
			solve: solve,
			store: store,
			clear: clear,
			get: get,
			negate: negate
		};

		return factory;

		//////////////////

		function solve() {
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

		function negate(callback) {
			var last = equation[equation.length - 2],
				success = false;

			if(equation[equation.length - 1] !== '0') {
				if(last === '-') {
					equation[equation.length - 2] = '+';
					success = true;
				} else if(last === '+') {
					equation[equation.length - 2] = '-';
					success = true;
				} else {
					if(isOperator(last)) {
						equation.splice(equation.length - 1, 0, '-');
						success = true;
					}
				}
			}

			if(success === true) {
				return callback();
			}
		}
	}

})(angular.module('pocketCalculator'), math);