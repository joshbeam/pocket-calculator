var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	sync = require('browser-sync'),
	shell = require('gulp-shell'),
	reload = sync.reload;

gulp.task('sass', function() {
	return gulp.src('app/src/scss/index.scss')
				.pipe(sass())
				.pipe(prefix())
				.pipe(gulp.dest('app/dist/css'))
				.pipe(reload({stream:true}));
});

gulp.task('js', function() {
	gulp.src('bower_components/angularjs/angular.min.js.map')
			.pipe(gulp.dest('app/dist/js'));

	return gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/mathjs/dist/math.min.js',
			'bower_components/angularjs/angular.min.js',
			'app/src/js/calculator/pocket-calculator.js',
			'app/src/js/**/*.js'
		])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('app/dist/js'))
		.pipe(reload({stream:true}));
});

gulp.task('watch', function() {
	// sync({
	// 	server: {
	// 		baseDir: 'app'
	// 	}
	// });
	shell.task(['node server.js'])();

	gulp.watch(['app/src/scss/*'], ['sass']);
	gulp.watch(['app/src/js/**/*'], ['js']);
});

gulp.task('default', ['sass','js','watch']);