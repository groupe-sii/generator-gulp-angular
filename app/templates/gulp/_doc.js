'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    _ = require('lodash'),
    Dgeni = require('dgeni'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence', 'main-bower-files']
    }),
    deployment = {
        name: 'default',
        examples: {
            // These files are injected to examples' html.
            commonFiles: {
                scripts: '../../modules.js',
                stylesheets: '../../modules.css'
            },
            dependencyPath: '../../deps'
        }
    };

var dgeniGenerate = function() {
    try {
        var dgeni = new Dgeni([require('../docs/application/config/')
            .config(function(generateExamplesProcessor, generateProtractorTestsProcessor) {
                generateExamplesProcessor.deployments = [deployment];
                generateProtractorTestsProcessor.deployments = [deployment];
            })
            .config(function(renderDocsProcessor) {
                renderDocsProcessor.extraData.deploymentTarget = 'default';
            })
        ]);
        return dgeni.generate();
    } catch (x) {
        console.log(x.stack);
        throw x;
    }
};

gulp.task('docs:dgeni', function(done) {
    dgeniGenerate().then(function() {
        done();
    });
});

gulp.task('docs:partials', ['docs:dgeni'], function() {
    return gulp.src(['docs/application/app/{src,.tmp}/**/*.html', '.tmp_docs/{partials,.tmp}/**/*.html'])
        .pipe($.htmlmin({
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: 'docApp'
        }))
        .pipe(gulp.dest('.tmp_docs/partials'))
        .pipe($.size());
});

gulp.task('docs:html', ['docs:partials'], function() {
    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    return gulp.src(['docs/application/app/index.html'])
        .pipe($.inject(gulp.src('.tmp_docs/partials/**/*.js'), {
            read: false,
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            addPrefix: '../'
        }))
        .pipe($.useref())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        }))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(conf.paths.dist + '/' + conf.paths.doc))
        .pipe($.size());
});

gulp.task('docs:fonts', function() {
    return gulp.src('docs/application/bower_components/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe($.flatten())
        .pipe(gulp.dest(conf.paths.dist + '/' + conf.paths.doc + '/fonts'))
        .pipe($.size());
});

gulp.task('docs:clean:dist', function() {
    return $.del(conf.paths.dist + '/' + conf.paths.doc);
});

gulp.task('docs:clean:tmp', function() {
    return $.del('.tmp_docs');
});

gulp.task('docs:archi-graph', function() {
    gulp.src(conf.paths.src + '/{app,components}/**/*.js')
        .pipe($.angularArchitectureGraph({
            dest: conf.paths.dist + '/' + conf.paths.doc + '/images'
        }));
});

gulp.task('docs:build', function() {
    $.runSequence(
        'docs:clean:tmp',
        'docs:clean:dist',
        //'docs:archi-graph',
        'docs:fonts',
        'docs:html',
        'docs:clean:tmp'
    );
});
