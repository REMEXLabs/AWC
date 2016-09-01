const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const util = require('gulp-util');

gulp.task('build', function () {
  return gulp.src('src/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('test', ['build'], function () {
  return gulp.src(['spec/*.js'])
    .pipe(jasmine({
      verbose: false
    }).on('error', util.log));
});

gulp.task('default', ['build', 'test']);
