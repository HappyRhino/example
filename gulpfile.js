var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var runSequence = require('gulp-run-sequence');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var stringify = require('stringify');

// Compile Javascript
gulp.task('scripts', function() {
    return gulp.src('src/main.js')
    .pipe(browserify({
        debug: false,
        transform: ['stringify']
    }))
    //.pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

// Copy html
gulp.task('html', function() {
    return gulp.src('src/index.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist/'));
});

// Less to css
gulp.task('styles', function() {
    return gulp.src('./src/resources/stylesheets/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
});

// Clean output
gulp.task('clean', function(cb) {
    del(['dist/**'], cb);
});

gulp.task('default', function(cb) {
    runSequence('clean', ['scripts', 'styles', 'html'], cb);
});