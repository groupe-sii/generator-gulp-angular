'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'run-sequence', 'tslint-stylish']
    });

gulp.task('js-hint', function() {
    return gulp.src(conf.paths.src + '/{app,components}/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('es-lint', function() {
    return gulp.src(conf.paths.src + '/{app,components}/**/*.js')
        .pipe($.eslint({
            reset: true
        }))
        .pipe($.eslint.format());
});

gulp.task('scss-lint', function() {
    return gulp.src(conf.paths.src + '/{app,components}/**/*.scss')
        .pipe($.scssLint({
            config: '.scsslintrc.yml'
        }));
});

gulp.task('html-hint', function() {
    return gulp.src(conf.paths.src + '/{app,components}/**/*.html')
        .pipe($.htmlhint({
            htmlhintrc: '.htmlhintrc'
        }));
});

gulp.task('ts-lint', function() {
    return gulp.src(conf.paths.src + '/{app,components}/**/*.ts')
        .pipe($.tslint())
        .pipe($.tslint.report($.tslintStylish, {
            emitError: false,
            bell: false
        }));
});

gulp.task('lint', function() {
    return $.runSequence(
        'js-hint', 'es-lint', 'scss-lint', 'html-hint'
    );
});
