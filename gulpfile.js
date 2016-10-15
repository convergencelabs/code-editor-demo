const gulp = require('gulp');
const webpack = require('gulp-webpack');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const merge = require('merge2');
const mkdirp = require('mkdirp');
const spawn = require('child_process').spawn;

const sassGlob = 'src/sass/**/*.scss';
const dockerTag = 'nexus.convergencelabs.tech:18443/code-editor';
const dockerPushTag = 'nexus.convergencelabs.tech:18444/code-editor';


gulp.task('default', ['webpack', 'sass', 'copy-assets'], function() {
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
  return gulp.src([sassGlob, '/node_modules/ace-collab-ext/ace-collab.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('code-editor.css'))
    .pipe(gulp.dest('build/'));
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src('./build/code-editor.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del(['build', 'docker-build']);
});

gulp.task('docker-copy', ['minify'], function () {
  mkdirp('docker-build');

  return merge([
    gulp.src(['dist/**/*']).pipe(gulp.dest('docker-build/build')),
    gulp.src(['docker/**/*']).pipe(gulp.dest('docker-build'))
  ]);
});

gulp.task('docker-build', ['docker-copy'], function(cb) {
  var docker = spawn('docker', ['build', '-t', dockerTag, 'docker-build']);

  docker.stdout.on('data', function (data) {
    console.log("" + data);
  });
  docker.stderr.on('data', function (data) {
    console.error("" + data);
  });

  docker.on('exit', function (code) {
    if (code != 0) {
      cb(new Error('Failed to build docker container.  Exit Code: ' + code))
    } else {
      cb();
    }
  });
});

gulp.task('docker', ['docker-build'], function(cb) {
  var docker = spawn('docker', ['push', dockerPushTag]);

  docker.stdout.on('data', function (data) {
    console.log("" + data);
  });
  docker.stderr.on('data', function (data) {
    console.error("" + data);
  });

  docker.on('exit', function (code) {
    if (code != 0) {
      cb(new Error('Failed to build docker container.  Exit Code: ' + code));
    } else {
      cb();
    }
  });
});

