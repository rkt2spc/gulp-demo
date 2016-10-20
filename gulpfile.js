var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

//***************************************************
// JAVASCRIPT
//***************************************************
var jsSrc = './public/src/js/**/*.js',
    jsDst = './public/build/js';

gulp.task('check-js', function() {
	gulp.src(jsSrc)
		.pipe(plugins.jshint({esversion: 6}))
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('build-js', function() {
    gulp.src(jsSrc)
        .pipe(plugins.concat('app.js'))
        // .pipe(stripDebug())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDst));
});

//***************************************************
// IMAGES
//***************************************************
var imgSrc = './public/src/images/**/*.{gif,jpeg,jpg,png,svg}',
    imgDst = './public/build/images';

gulp.task('build-img', function() {
    gulp.src(imgSrc)
        .pipe(plugins.changed(imgDst))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(imgDst));
});

//***************************************************
// HTML
//***************************************************
var htmlSrc = './public/src/**/*.{htm,html}',
    htmlDst = './public/build';

gulp.task('build-html', function() {
    gulp.src(htmlSrc)
        .pipe(plugins.changed(htmlDst))
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest(htmlDst));
});

//***************************************************
// CSS
//***************************************************
var cssSrc = './public/src/css/**/*.css',
    cssDst = './public/build/css';

gulp.task('build-css', function() {
    gulp.src(cssSrc)
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.autoprefixer('last 2 versions'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(cssDst));
});

//***************************************************
// CLEAN
//***************************************************
var cleanSrc = './public/build';

gulp.task('clean', function(done) {
    return gulp.src(cleanSrc)
        .pipe(plugins.clean({read: false}));
});

//***************************************************
// BUILD
//***************************************************
gulp.task('build',                  ['build-img', 'build-html', 'build-js', 'build-css']);

gulp.task('clean-build',            ['clean'],  () => gulp.start('build'));

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
// NODEMON
//***************************************************
gulp.task('nodemon', ['clean-build', 'watch'], function() {

    var nodemon = plugins.nodemon({
        script: 'index.js',
        watch: ['.'],
        ignore: ['./public', 'gulpfile.js'],
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });

    nodemon.on('crash', function() {
        var delay = 3;
        nodemon.emit('restart', delay);
    });
});

//***************************************************
// DEFAULT
//***************************************************
gulp.task('default', ['build', 'watch']);



