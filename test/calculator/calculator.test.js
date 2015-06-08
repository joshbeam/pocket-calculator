describe('Calculator', function() {
	var Calculator,
		store;

	beforeEach(module('pocketCalculator'));
	beforeEach(inject(function(_Calculator_) {
		Calculator = _Calculator_;
		Calculator.clear();
	}));
	beforeEach(function() {
		store = function(arr) {
			arr.forEach(function(op) {
				Calculator.store(op);
			});
		};
	});

	describe('Operations', function() {
		describe('Division', function() {
			it('should divide', function() {
				store(['9','/','3']);

				Calculator.solve(function(r) {
					expect(r).to.equal(3);
				});				
			});
		});

		describe('Addition', function() {
			it('should add', function() {
				store(['1', '+', '2']);

				Calculator.solve(function(r) {
					expect(r).to.equal(3);
				});
			});
		});

		describe('Subtraction', function() {
			it('should subtract', function() {
				store(['1', '-', '2']);

				Calculator.solve(function(r) {
					expect(r).to.equal(-1);
				});
			});
		});

		describe('Modulus', function() {
			it('should return the remainder', function() {
				store(['3', '%', '2']);

				Calculator.solve(function(r) {
					expect(r).to.equal(1);
				});
			});

			it('should not return the remainder if negative', function() {
				store(['3', '%', '-2']);

				Calculator.solve(function(r) {
				}, function(error) {
					expect(typeof error).to.equal('object');
				});
			});
		});

		describe('Multiplication', function() {
			it('should multiply', function() {
				store(['100', '*', '89']);

				Calculator.solve(function(r) {
					expect(r).to.equal(8900);
				});
			});
		});

		describe('Negator', function() {
			it('should negate', function() {
				store(['1', '+', '2']);

				Calculator.negate();

				Calculator.solve(function(r) {
					console.log(r);
					expect(r).to.equal(-1);
				});					
			});
		});
	});
});