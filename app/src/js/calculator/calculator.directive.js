;(function(app) {

	'use strict';

	app.directive('calculator',calculator);

	calculator.$inject = ['Calculator'];

	function calculator(Calculator) {
		
		var d = {
			restrict: 'E',
			templateUrl: '/templates/calculator.html',
			link: link
		},
			errorMessage = 'ERROR';

		return d;

		function link(scope, $el, attrs) {
			var $display = $el.find('[display]');

			$el.find('*').each(addTabIndex);
			$el.find('[solve]').on('click', solve.bind($display, $el));
			$el.find('[clear]').on('click', clear.bind($display));
			$el.find('[number]').add('[point]').on('click', store.bind($display, $el));
			$el.find('[operator]').on('click', operate.bind($display, $el));
		}

		/////////////////////

		// make everything "clickable"
		function addTabIndex(i, $div) {
			$($div).attr('tabindex', 0)
		}

		function solve($el) {
			Calculator.solve(solveSuccess.bind(this), solveError.bind(this));
		}

		// show the result
		function solveSuccess(solution) {
			display.call(this, solution);
		}

		// show 'ERROR'
		function solveError(error) {
			console.log(error);
			this.html(errorMessage);
		}

		// clear the display
		function clear() {
			Calculator.clear(display.bind(this, 0));
		}

		// stores operands and operators in memory
		function store($el, e) {
			var operand = $(e.target).html();

			// don't allow display overflow when inputting operands
			if(this.html().length !== 6) {
				// initially clear the display
				if(Calculator.solved() === true || this.html() === '0' || this.html() === errorMessage) {
					display.call(this, '');
				}

				// store this part of the equation and display the operand
				Calculator.store(operand, display.bind(this, this.html() + operand));
			}
		}

		function operate($el, e) {
			var operator = $(e.target).attr('operator');

			// allow carry over from the previous solution
			if(Calculator.solved() === true && this.html() !== '0') {
				Calculator.store(Calculator.getLastSolution());
			}

			// allow +/- to negate the current operand
			if(operator === 'negate') {
				Calculator.negate(function negationSuccess() {
					this.html( (this.html().charAt(0) === '-' ? this.html().substr(1) : '-' + this.html()) );
				}.bind(this));
			} else {
				// store the operator in memory
				Calculator.store(operator, display.bind(this, 0));
			}
		}

		// change the HTML content of the display
		function display(content) {
			this.html(content);
		}
	}

})(angular.module('pocketCalculator'));