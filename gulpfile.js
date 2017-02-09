const gulp = require('gulp');
const webpack = require('gulp-webpack');
const del = require('del');
const merge = require('merge2');
const mkdirp = require('mkdirp');
const spawn = require('child_process').spawn;

const dockerPushTag = 'nexus.convergencelabs.tech:18444/convergence-code-editor';

gulp.task('default', ['webpack', 'copy-index', 'copy-assets'], function() {
});

gulp.task('copy-index', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy-assets', function() {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('build/assets'));
});

gulp.task('webpack', function() {
  return gulp.src('src/js/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del(['build', 'docker-build']);
});

gulp.task('docker-copy', ['default'], function () {
  mkdirp('docker-build');

  return merge([
    gulp.src(['build/**/*']).pipe(gulp.dest('docker-build/build')),
    gulp.src(['docker/**/*']).pipe(gulp.dest('docker-build'))
  ]);
});

gulp.task('docker-build', ['docker-copy'], function(cb) {
  const docker = spawn('docker', ['build', '-t', dockerPushTag, 'docker-build']);

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

gulp.task('docker', ['docker-build'], function(cb) {
  const docker = spawn('docker', ['push', dockerPushTag]);

  docker.stdout.on('data', function (data) {
    console.log("" + data);
  });
  docker.stderr.on('data', function (data) {
    console.error("" + data);
  });

  docker.on('exit', function (code) {
    if (code != 0) {
      cb(new Error('Failed to publish docker container.  Exit Code: ' + code));
    } else {
      cb();
    }
  });
});

