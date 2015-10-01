'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),
    p    = require('../package.json'),

    $ = require('gulp-load-plugins')();

gulp.task('release', function() {
    return gulp.src(conf.paths.dist + '**/*')
        .pipe($.tar(p.name.toLowerCase() + '-' + p.version + '.tar'))
        .pipe($.gzip())
        .pipe(gulp.dest(conf.paths.release));
});
