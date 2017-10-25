'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var clean = require('gulp-clean');


gulp.task('sass', function () {
    return gulp.src('./pages/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./pages'));
});

gulp.task('rename', ['sass'], function () {
    return gulp.src("./pages/**/*.css")
        .pipe(rename(function (path) {
            path.extname = ".wxss"
        }))
        .pipe(gulp.dest("./pages"));
});

gulp.task('clean', ['rename'], function () {
    return gulp.src('./pages/**/*.css', {
            read: false
        })
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch('./pages/**/*.scss', ['clean']);
});