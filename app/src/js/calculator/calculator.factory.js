// test in IE
// solve on enter
;(function(app, m) {

	'use strict';

	app.factory('Calculator', Calculator);

	Calculator.$inject = [];

	function Calculator() {
		var equation = [],
				lastSolution,
				operators = ['+', '-', '/', '*', '%'];

		var factory = {
			solve: solve,
			store: store,
			clear: clear,
			get: get,
			getLastSolution: getLastSolution,
			negate: negate
		};

		return factory;

		//////////////////

		/**
		 *	Evaluates the equation by joining the elements in the equation array
		 */
		function solve() {
			try {
				lastSolution = m.eval(equation.join(''));
				return lastSolution;
			} catch(e) {
				return e;
			}
		}

		/**
		 *	Stores each expression of the equation into the "equation" array.
		 *	Operands are individual items, and operators are individual items.
		 */
		function store(_expression) {
			var expression;

			// typecast the expression to a number (only if it's supposed to be a number) for checking it later
			if(_expression !== '.' && !isOperator(_expression)) {
				expression = +_expression;
			} else {
				expression = _expression;
			}

			// push any regular or decimal number as its own element into the array
			// e.g. '9999' should be one element, and '99.99' should be one element
			if(typeof expression === 'number' && !isOperator(equation[equation.length - 1]) || expression === '.') {
				if(equation.length === 0) {
					equation[0] = ''+expression;
				} else {
					equation[equation.length-1] += ''+expression;
				}
			// push all operands to the array as individual elements
			// e.g. '+' should be one element, and '9 + 9' should be three individual elements
			} else {
				equation.push(''+expression);
			}
		}

		/**
		 *	Resets the equation array
		 */
		function clear() {
			equation = [];
		}

		function get() {
			return equation;
		}

		function getLastSolution() {
			return lastSolution;
		}

		/**
		 *	Tests a string to see if it is an operator
		 */
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

		/**
		 *	Makes the current operand either positive or negative
		 */
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

			// To negate an operand, you must click the operand, and then the +/- sign.
			// If it wasn't in that order, then the callback won't be called.
			if(success === true) {
				return callback();
			}
		}
	}

})(angular.module('pocketCalculator'), math);