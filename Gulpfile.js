'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('sass', function () {
  return gulp.src('./public/sass/style.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/style.sass', ['sass']);
});

gulp.task('cssmin', function () {
	gulp.src('./public/stylesheets/style.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/stylesheets/min/'));
});
