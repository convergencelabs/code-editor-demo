const gulp = require('gulp');
const webpack = require('gulp-webpack');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('default', ['webpack', 'sass'], function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('webpack', function() {
  return gulp.src('src/js/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('build'));
});

gulp.task('minify', ['webpack'], function() {
  return gulp.src('lib/bundle.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("lib"));
});

gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('code-editor.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('minify-css', ['css'], function() {
  return gulp.src('./lib/ace-collab.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del(['build']);
});

