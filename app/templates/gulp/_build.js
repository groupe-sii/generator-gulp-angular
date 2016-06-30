'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),

    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'run-sequence']
    });

<% if (props.htmlPreprocessor.key === 'noHtmlPrepro') { -%>
gulp.task('partials', function () {
<% } else { -%>
gulp.task('partials', ['markups'], function () {
<% } -%>
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
    .pipe($.htmlmin({
        collapseWhitespace: true,
        removeAttributeQuotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: '<%- props.appName %>',
        root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false }),
        partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: path.join(conf.paths.tmp, '/partials'),
            addRootSlash: false
        },
        htmlFilter = $.filter('*.html', { restore: true }),
        jsFilter = $.filter('**/*.js', { restore: true }),
        cssFilter = $.filter('**/*.css', { restore: true });

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.useref())
        .pipe(jsFilter)
        .pipe($.sourcemaps.init())
<% if (props.jsPreprocessor.srcExtension !== 'es6' && props.jsPreprocessor.key !== 'typescript') { -%>
        .pipe($.ngAnnotate())
<% } -%>
        .pipe($.stripDebug())
        .pipe($.stripNgLog())
        .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
        .pipe($.rev())
        .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.sourcemaps.init())
<% if (props.ui.key === 'bootstrap' && props.cssPreprocessor.extension === 'scss') { -%>
    <% if (props.packageManager.key === 'npm') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/node_modules/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    <% } else if (props.packageManager.key === 'bower') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    <% } -%>
<% } else if (props.ui.key === 'bootstrap' && props.cssPreprocessor.extension === 'less') { -%>
    <% if (props.packageManager.key === 'npm') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/node_modules/bootstrap/fonts/', '../fonts/'))
    <% } else if (props.packageManager.key === 'bower') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/bower_components/bootstrap/fonts/', '../fonts/'))
    <% } -%>
<% } else if (props.ui.key === 'bootstrap' && props.cssPreprocessor.extension === 'styl') { -%>
    <% if (props.packageManager.key === 'npm') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/node_modules/bootstrap-stylus/fonts/', '../fonts/'))
    <% } else if (props.packageManager.key === 'bower') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/bower_components/bootstrap-stylus/fonts/', '../fonts/'))
    <% } -%>
<% } else if (props.ui.key === 'material-design-lite' || props.ui.key === 'angular-material') { -%>
    <% if (props.packageManager.key === 'npm') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/node_modules/material-design-iconfont/iconfont/', '../fonts/'))
    <% } else if (props.packageManager.key === 'bower') { -%>
        .pipe($.replace('../<%- computedPaths.appToBower %>/bower_components/material-design-iconfont/iconfont/', '../fonts/'))
    <% } -%>
<% } -%>
        .pipe($.minifyCss({ processImport: false }))
        .pipe($.rev())
        .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.htmlmin({
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
    });

<% if (imageMin) { -%>
gulp.task('images', function () {
    return gulp.src(path.join(conf.paths.src, '/assets/images/**/*'))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/images/')));
});
<% } -%>

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
<% if (props.ui.key === 'bootstrap' && props.cssPreprocessor.extension === 'styl') { -%>
    <% if (this.props.packageManager.key === 'npm') { -%>
    return gulp.src($.mainBowerFiles().concat('node_modules/bootstrap-stylus/fonts/*'))
    <% } else if (this.props.packageManager.key === 'bower') { -%>
    return gulp.src($.mainBowerFiles().concat('bower_components/bootstrap-stylus/fonts/*'))
    <% } -%>
<% } else if (props.ui.key === 'material-design-lite' || props.ui.key === 'angular-material') { -%>
    <% if (this.props.packageManager.key === 'npm') { -%>
    return gulp.src($.mainBowerFiles().concat('node_modules/material-design-iconfont/iconfont/*'))
    <% } else if (this.props.packageManager.key === 'bower') { -%>
    return gulp.src($.mainBowerFiles().concat('bower_components/material-design-iconfont/iconfont/*'))
    <% } -%>
<% } else { -%>
    return gulp.src($.mainBowerFiles())
<% } -%>
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{<%- processedFileExtension %>}'),
        path.join('!' + conf.paths.src, '/doc/*.{ngdoc,css>}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
<% if (props.jsPreprocessor.key === 'typescript') { -%>
     return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/partials'), path.join(conf.paths.tmp, '/serve')]);
<% } else { -%>
     return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
<% } -%>
});

<% if (imageMin) { -%>
gulp.task('build', function() {
    return $.runSequence(
        'clean', 'config', 'html', 'images', 'fonts', 'other'
    );
});
<% } else { -%>
gulp.task('build', function() {
    return $.runSequence(
        'clean', 'config', 'html', 'fonts', 'other'
    );
});
<% } -%>
