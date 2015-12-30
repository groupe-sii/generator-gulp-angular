'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')();

<% if (props.otherModulesKeys.indexOf('translate') !== -1) { -%>
var _getAllLanguages = function() {
    var filesystem = require('fs'),
        dir = conf.paths.config + '/languages',
        languages = {};

    filesystem.readdirSync(dir).forEach(function(file) {
        var language = file.slice(0, -5); // Remove '.json' from file name

        languages[language] = JSON.parse(filesystem.readFileSync(conf.paths.config + '/languages/' + file));
    });

    return languages;
};
<% } -%>

gulp.task('config', function() {
    var serviceConfig = require('../' + conf.paths.config + '/' + gulp.options.env + '/project.service.config.json');
<% if (props.otherModulesKeys.indexOf('translate') !== -1) { -%>
    var languagesConfig = _getAllLanguages();
<% } -%>

    return gulp.src(conf.paths.config + '/project.config.json')
        .pipe($.ngConstant({
            name: '<%- props.appName %>-config',
            templatePath: conf.paths.config + '/project.config.tpl.ejs',
            deps: '',
            constants: {
                API_INFOS: serviceConfig<% if (props.otherModulesKeys.indexOf('translate') !== -1) { -%>,
                LANGUAGES: languagesConfig<% } -%>
            }
        }))
        .pipe($.rename('config.js'))
        .pipe(gulp.dest(conf.paths.src + '/app'));
});
