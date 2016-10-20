var gulp = require('gulp');

//======================================================
//plugins
var jshint = require('gulp-jshint');

//======================================================
var jsSrc = './public/js/**/*.js';

gulp.task('check-js', function() {
	gulp.src(jsSrc)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});