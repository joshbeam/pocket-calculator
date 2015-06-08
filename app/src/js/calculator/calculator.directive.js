;(function(app) {

	'use strict';

	app.directive('calculator',calculator);

	calculator.$inject = ['Calculator'];

	function calculator(Calculator) {
		
		var d = {
			restrict: 'E',
			templateUrl: 'templates/calculator.html',
			link: link
		},
		error = 'ERROR';

		return d;

		function link(scope, $el, attrs) {
			var $display = $el.find('[display]');

			$el.find('[solve]').on('click', solve.bind($display, $el));
			$el.find('[clear]').on('click', clear.bind($display));
			$el.find('[number]').add('[point]').on('click', store.bind($display, $el));
			$el.find('[operator]').on('click', operate.bind($display));
		}

		/////////////////////

		function solve($el) {
			try {
				this.html(Calculator.solve());
				$el.data('solved', true);
			} catch(e) {
				this.html(error);
			}

			Calculator.clear();
		}

		function clear() {
			this.html('0');
			Calculator.clear();
		}

		function store($el, e) {
			var operand = $(e.target).html();

			if(this.html().length !== 6) {
				// initially clear the display
				if(this.html() === '0' || !!$el.data('solved') || this.html() === error) {
					this.html('');
					$el.data('solved', false);
				}

				// store this part of the equation
				Calculator.store(operand);

				// display this part of the equation
				this.html(this.html() + operand);
			}
		}

		function operate(e) {
			var operator = $(e.target).attr('operator');

			if(operator === 'negate') {
				Calculator.negate(function negationSuccess() {
					this.html( (this.html().charAt(0) === '-' ? this.html().substr(1) : '-' + this.html()) );
				}.bind(this));
				
			} else {
				this.html('0');
				Calculator.store(operator);
			}
		}
	}

})(angular.module('pocketCalculator'));