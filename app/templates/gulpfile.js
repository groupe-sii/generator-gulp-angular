/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp'),
    wrench = require('wrench'),
    minimist = require('minimist'),
    knownOptions = {
        string: 'env',
        default: {
            env: process.env.NODE_ENV || 'development' || 'test'
        }
    };

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

gulp.options = minimist(process.argv.slice(2), knownOptions);

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
