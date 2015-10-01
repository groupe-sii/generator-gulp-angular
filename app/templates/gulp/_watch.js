'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
    return event.type === 'changed';
}

gulp.task('watch', [<%- watchTaskDeps.join(', ') %>], function () {
    gulp.watch([
        path.join(conf.paths.src, '/*.html'),
        'bower.json'
    ], ['inject']);

    gulp.watch([
        path.join(conf.paths.config, '/project.config.json'),
        path.join(conf.paths.config, '/**/*.json')
    ], ['config']);

<% if (props.cssPreprocessor.extension === 'css') { -%>
    gulp.watch(path.join(conf.paths.src, '/app/**/*.css'), function(event) {
<% } else { -%>
    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.css'),
        path.join(conf.paths.src, '/app/**/*.<%- props.cssPreprocessor.extension %>'),
        path.join(conf.paths.src, '/style/**/*.css'),
        path.join(conf.paths.src, '/style/**/*.<%- props.cssPreprocessor.extension %>')
    ], function(event) {
<% } -%>
        if(isOnlyChange(event)) {
<% if (props.cssPreprocessor.key === 'noCssPrepro') { -%>
            browserSync.reload(event.path);
<% } else { -%>
            gulp.start('styles');
<% } -%>
        } else {
            gulp.start('inject');
        }
    });

    gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
        if(isOnlyChange(event)) {
            gulp.start('scripts');
        } else {
            gulp.start('inject');
        }
    });

<% if (props.htmlPreprocessor.key !== 'noHtmlPrepro') { -%>
    gulp.watch(path.join(conf.paths.src, '/app/**/*.<%- props.htmlPreprocessor.extension %>'), ['markups']);
<% } -%>

    gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
        browserSync.reload(event.path);
    });
});
