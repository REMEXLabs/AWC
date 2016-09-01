const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');

gulp.task('transpile', () =>
  gulp.src('src/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('lib'))
);

gulp.task('default', ['transpile']);
