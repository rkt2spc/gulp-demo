var gulp = require('gulp');

//***************************************************
// PLUGINS
//***************************************************
var jshint = require('gulp-jshint'), //Check js for error

	imagemin = require('gulp-imagemin'), //Compile image

	concat = require('gulp-concat'), //Concat multiple files into one

	stripDebug = require('gulp-strip-debug'), //Remove comments and things like window.alert and console.log
	uglify = require('gulp-uglify'), //Compile javascript

	changed = require('gulp-changed'), //Only pass through file that changed

	minifyHtml = require('gulp-minify-html'), //Compile HTML

	autoprefixer = require('gulp-autoprefixer'), //Prefix CSS attribute with browser-specific tag -moz,...
	minifyCss = require('gulp-minify-css'), //Compile CSS

	clean = require('gulp-clean'); //Clean Directory

//***************************************************
// JAVASCRIPT
//***************************************************
var jsSrc = './public/src/js/**/*.js',
    jsDst = './public/build/js';

gulp.task('check-js', function() {
	gulp.src(jsSrc)
		.pipe(jshint({esversion: 6}))
		.pipe(jshint.reporter('default'));
});

gulp.task('build-js', function() {
    gulp.src(jsSrc)
        .pipe(concat('app.js'))
        // .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

//***************************************************
// IMAGES
//***************************************************
var imgSrc = './public/src/images/**/*.{gif,jpeg,jpg,png,svg}',
    imgDst = './public/build/images';

gulp.task('build-img', function() {
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

//***************************************************
// HTML
//***************************************************
var htmlSrc = './public/src/**/*.{htm,html}',
    htmlDst = './public/build';

gulp.task('build-html', function() {
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDst));
});

//***************************************************
// CSS
//***************************************************
var cssSrc = './public/src/css/**/*.css',
    cssDst = './public/build/css';

gulp.task('build-css', function() {
    gulp.src(cssSrc)
        .pipe(concat('app.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssDst));
});

//***************************************************
// CLEAN
//***************************************************
var cleanSrc = './public/build';

gulp.task('clean', function(done) {
    return gulp.src(cleanSrc)
        .pipe(clean({read: false}));
});

//***************************************************
// BUILD
//***************************************************
gulp.task('build',                  ['build-img', 'build-html', 'build-js', 'build-css']);
gulp.task('debug-build',            ['debug-build-img', 'debug-build-html', 'debug-build-js', 'debug-build-css']);

gulp.task('clean-build',            ['clean'],  () => gulp.start('build'));
gulp.task('clean-debug-build',      ['clean'],  () => gulp.start('debug-build'));

//***************************************************
// WATCH
//***************************************************
gulp.task('watch', function() {
    gulp.watch(imgSrc,  ['build-img']);
    gulp.watch(htmlSrc, ['build-html']);
    gulp.watch(jsSrc,   ['build-js']);
    gulp.watch(cssSrc,  ['build-css']);
});

//***************************************************
// DEFAULT
//***************************************************
gulp.task('default', ['build', 'watch']);



