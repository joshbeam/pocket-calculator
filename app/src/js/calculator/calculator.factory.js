;(function(app, m) {

	'use strict';

	app.factory('Calculator', Calculator);

	Calculator.$inject = [];

	function Calculator() {
		var equation = [],
			lastSolution,
			operators = ['+', '-', '/', '*', '%'],
			isSolved = true;

		var factory = {
			solve: solve,
			solved: solved,
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
		function solve(onSuccess, onError) {
			try {
				// parseFloat fixes native float imprecision
				// e.g. -0.6 + 2 - 1 != 0.3999 (but JavaScript thinks it does)
				lastSolution = parseFloat( +(m.eval(equation.join('')).toPrecision(12)) );
				this.solved(true);

				onSuccess.call(this, lastSolution);
			} catch(e) {
				onError.call(this, e);
			}

			this.clear();
		}

		function solved(bool) {
			if(typeof bool !== 'undefined') {
				isSolved = bool;
			} else {
				return isSolved;
			}
		}

		/**
		 *	Stores each expression of the equation into the "equation" array.
		 *	Operands are individual items, and operators are individual items.
		 */
		function store(expression, callback) {
			var isOperand = (typeof +expression === 'number' || expression === '.')
							&& !isOperator(expression)
							&& !isOperator(equation[equation.length - 1]);

			if(expression === '0' && equation.length === 0) {
				this.clear();
				return;
			}

			if(this.solved()) {
				this.solved(false);
			}

			// push any regular or decimal number as its own element into the array
			// e.g. '9999' should be one element, and '99.99' should be one element
			if(isOperand) {
				if(equation.length === 0) {
					equation[0] = ''+expression;
				} else {
					equation[equation.length-1] += ''+expression;
				}
			// push all operands to the array as individual elements
			// e.g. '+' should be one element, and '9 + 9' should be three individual elements
			} else {
				// FIXME: check if the operator is the same as the previous operator
				if(equation[equation.length - 1] !== expression) {
					equation.push(''+expression);
				}
			}

			if(typeof callback !== 'undefined') {
				return callback.call(this, equation);
			}
		}

		/**
		 *	Resets the equation array
		 */
		function clear(callback) {
			equation = [];

			if(typeof callback !== 'undefined') {
				return callback();
			}
		}

		function get() {
			return equation;
		}

		function getLastSolution() {
			this.solved(false);

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

			if(equation.length === 1 && equation[0] !== '0') {
				equation.unshift('-');
				success = true;
			} else if(equation[equation.length - 1] !== '0') {
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