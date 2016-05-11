'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./public/sass/style.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/style.sass', ['sass']);
});
