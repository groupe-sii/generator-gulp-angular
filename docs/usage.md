# Usage

## Create your project

Install the required tools: `yo`, `gulp`, `bower`
```
npm install -g yo gulp bower
```

Install `generator-gulp-angular`:
```
npm install -g https://github.com/groupe-sii/generator-gulp-angular
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo gulp-angular`, optionally passing an app name:
```
yo gulp-angular [app-name]
```

## Yo options
`yo gulp-angular --help` or `yo gulp-angular -h` for help. All options are not required. If not provided, default values will be used.

* `--app-path='src'` customize Angular's app folder, relative to cwd, default is `src`
* `--dist-path='dist'` customize build target folder, relative to cwd, default is `dist`
* `--tmp-path='.tmp'` customize pre-processing temp folder, relative to cwd, default is `.tmp`
* `--config-path='config'` customize configuration files folder, default is `config`
* `--skip-install` do not run `bower install` and `npm install` after generating the app, default is `false` (not skip)
* `--skip-welcome-message` skip yo welcome messages, default is `false` (not skip)
* `--skip-message` skip install messages, default is `false` (not skip)
* `--default` use default configurations, default is `false`
* `--advanced` prompt for advanced additional features, default is `false`


Paths configuration are stored in `gulpfile.js`. Change `options.(src|dist|tmp|config)` in `gulpfile.js` if you want to config paths after the app is generated.

**Warning**: The paths are also written in the `index.html` for the build with useref. If you want to change these paths, you also have to change the paths there in order to have the build task working.

## Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

More information on the gulp tasks in the [User Guide](user-guide.md).

## Directory structure

[Best Practice Recommendations for Angular App Structure](https://github.com/johnpapa/angular-styleguide)

The root directory generated with default paths configuration for application with name `gulpAngular`:
<pre>
├──  bower_components/
├──  config/
|   |──  development/
|   |──  production/
│   └──  project.config.json
|
├──  gulp/
├──  nodes_modules/
│
├──  src/
│   ├──  app/
│   │   ├──  components/
│   │   │   └──  githubContributor/
│   │   │   │   └──  githubContributor.service.js
│   │   │   │
│   │   │   └──  malarkey/
│   │   │   │   ├──  malarkey.directive.js
│   │   │   │   └──  malarkey.(scss|styl|less|css)
│   │   │   │
│   │   │   └──  navbar/
│   │   │   │   ├──  navbar.directive.js
│   │   │   │   ├──  navbar.html
│   │   │   │   └──  navbar.(scss|styl|less|css)
│   │   │   │
│   │   │   └──  webDevTec/
│   │   │       └──  webDevTec.service.js
│   │   │
│   │   ├──  main/
│   │   │   ├──  main.controller.js
│   │   │   └──  main.html
│   │   │
│   │   └──  index.js
│   │   └──  index.route.js
│   │   └──  index.(scss|styl|less|css)
|   |
│   ├──  assets/
│   │   └──  images/
│   ├──  favico.ico
│   └──  index.html
│
├──  .bowerrc
├──  .editorconfig
├──  .eslintrc
├──  .gitignore
├──  .htmlhintrc
├──  .jscsrc
├──  .jshintrc
├──  .scsslintrc.yml
├──  .yo-rc.json
├──  bower.json
├──  gulpfile.js
├──  karma.conf.js
└──  package.json
</pre>

There is none at the generation but you can add `.jade`, `.haml` or `.hbs` (dependent of your HTML pre-processor choice) anywhere in the `src` folder and it will be compiled automatically. **Warning**, the first file of a type in a folder is often missed by the Gulp watch, try to relaunch Gulp if it happens.


## Features included in the gulpfile

* *useref* : allow configuration of your files in comments of your HTML file
* *ngAnnotate* : convert simple injection to complete syntax to be minification proof
* *uglify* : optimize all your JavaScript
* *csso* : optimize all your CSS
* *rev* : add a hash in the file names to prevent browser cache problems
* *watch* : watch your source files and recompile them automatically
* *eslint* : The pluggable linting utility for JavaScript
* *imagemin* : all your images will be optimized at build
* *Unit test (karma)* : out of the box unit test configuration with karma
* *browser sync* : full-featured development web server with livereload and devices sync
* *angular-templatecache* : all HTML partials will be converted to JS to be bundled in the application

## Questions the generator will ask

* *jQuery*: jQuery 1.x, 2.x, Zepto, none
* *Angular modules*: animate, cookies, touch, sanitize
* *Resource handler*: ngResource, Restangular, none
* *Router*: ngRoute, UI Router, none
* *UI Framework*: Bootstrap, Foundation, Angular Material, Material Design Lite, none (depends on the chosen CSS preprocessor)
* *UI directives* : UI Bootstrap, Angular Strap, official Bootstrap JavaScript, Angular Foundation, official Foundation JavaScript, none (depends on the UI framework)
* *CSS pre-processor*: Less, Sass with Ruby and Node, Stylus, none
* *HTML preprocessor*: Jade, Haml, Handlebars, none
* *Package manager*: NPM, Bower
* *SII Modules*: angular-translate, Sass 7-1, Sonar
