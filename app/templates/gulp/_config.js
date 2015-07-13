'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')();

gulp.task('config', function() {
    var serviceConfig = require('../' + conf.paths.config + '/' + gulp.options.env + '/project.service.config.json');
    return gulp.src(conf.paths.config + '/project.config.json')
        .pipe($.ngConstant({
            name: '<%- props.appName %>-config',
            templatePath: conf.paths.config + '/project.config.tpl.ejs',
            deps: '',
            constants: {
                API_INFOS: serviceConfig
            }
        }))
        .pipe($.rename('config.js'))
        .pipe(gulp.dest(conf.paths.src + '/app'));
});
