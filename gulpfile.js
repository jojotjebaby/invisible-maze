/**
 * Created by joris on 06/02/17.
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');

// Project assets path
var config = {
    assetsDir: './assets/',
    bowerDir : './bower_components/',
    assetsOutputPath : './dist/'
};

/* Styles
 ====================================== */
gulp.task('styles', function() {
    return gulp.src( config.assetsDir + 'styles/all.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                './assets/styles'
            ]
        }))
        .on("error", swallowError)
        .pipe(sourcemaps.write())
        .pipe(rename('master.css'))
        .pipe(gulp.dest(config.assetsOutputPath + 'css'));
});



/* Error handling
 ====================================== */

function swallowError (error)
{
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

/* Scripts
 ====================================== */

gulp.task('scripts', function () {
    gulp.src([
        'assets/scripts/**/*'
    ])
        .pipe(uglify())
        .on("error", swallowError)
        .pipe(gulp.dest(config.assetsOutputPath + 'scripts'));
});

/* Task compilations
 ====================================== */

gulp.task('watch', function() {
    gulp.watch('assets/styles/**/*.scss', ['styles']);
    gulp.watch('assets/scripts/**/*.js', ['scripts']);
});

/* Default (all)
 ====================================== */
gulp.task('default', ['styles', 'scripts'], function() {

});