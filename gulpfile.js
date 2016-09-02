const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const concat = require('gulp-concat');
const util = require('gulp-util');
const plumber = require('gulp-plumber');


gulp.task('transpile', function () {
  return gulp.src('src/Darwin.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('concat', ['transpile'], function () {
  return gulp.src([
      './src/Component.js',
      './src/Components.js'
    ])
    .pipe(concat('Darwin.js', {
      newLine: '\n\n'
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('test', ['build'], function () {
  return gulp.src(['spec/Darwin.js'])
    .pipe(jasmine({
      verbose: false
    }).on('error', util.log));
});
gulp.task('build', ['transpile', 'concat']);

gulp.task('default', ['build']);
