'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),

    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')();

gulp.task('scripts', function() {
    return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe($.size())
});
