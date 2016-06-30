'use strict';

var _ = require('lodash');

module.exports = function(GulpAngularGenerator) {

  /**
   * Prepare NPM overrides property to fix external package.json with missing
   * or incomplete main property (needed by wiredep)
   */
  GulpAngularGenerator.prototype.preparePackageManagerOverrides = function preparePackageManagerOverrides() {

    var packageManagerOverrides = {};

    if (this.props.ui.key === 'bootstrap') {

      if (this.props.cssPreprocessor.extension === 'scss') {

          packageManagerOverrides['bootstrap-sass'] = {
          main: [
            'assets/stylesheets/_bootstrap.scss',
            'assets/fonts/bootstrap/glyphicons-halflings-regular.eot',
            'assets/fonts/bootstrap/glyphicons-halflings-regular.svg',
            'assets/fonts/bootstrap/glyphicons-halflings-regular.ttf',
            'assets/fonts/bootstrap/glyphicons-halflings-regular.woff',
            'assets/fonts/bootstrap/glyphicons-halflings-regular.woff2'
          ]
        };

        if (this.props.bootstrapComponents.key === 'official') {
            packageManagerOverrides['bootstrap-sass'].main.unshift('assets/javascripts/bootstrap.js');
        }

      } else {

          packageManagerOverrides.bootstrap = {
          main: [
            'dist/fonts/glyphicons-halflings-regular.eot',
            'dist/fonts/glyphicons-halflings-regular.svg',
            'dist/fonts/glyphicons-halflings-regular.ttf',
            'dist/fonts/glyphicons-halflings-regular.woff',
            'dist/fonts/glyphicons-halflings-regular.woff2'
          ]
        };

        if (this.props.bootstrapComponents.key === 'official') {
            packageManagerOverrides.bootstrap.main.unshift('dist/js/bootstrap.js');
        }

      }

      if (this.props.cssPreprocessor.key === 'noCssPrepro') {
          packageManagerOverrides.bootstrap.main.unshift('dist/css/bootstrap.css');
      }

      if (this.props.cssPreprocessor.key === 'less') {
          packageManagerOverrides.bootstrap.main.unshift('less/bootstrap.less');
      }
    }

    if (this.props.bootstrapComponents.key === 'ui-bootstrap') {
      packageManagerOverrides['angular-ui-bootstrap'] = {
        main: './dist/ui-bootstrap.js'
      };
    }

    if (this.props.router.key === 'new-router') {
        packageManagerOverrides['angular-new-router'] = {
        main: [ 'dist/router.es5.js' ]
      };
    }

    if (_.isEmpty(packageManagerOverrides)) {
      this.packageManagerOverrides = null;
    } else {
      this.packageManagerOverrides = JSON.stringify(packageManagerOverrides, null, 2)
        .replace(/\n/g, '\n  ');
    }

  };

  /**
   * Compute wiredep exclusions depending on the props
   */
  GulpAngularGenerator.prototype.computeWiredepExclusions = function computeWiredepExclusions() {
    this.wiredepExclusions = [];
    if (this.props.jQuery.key === 'jqLite' || this.props.jQuery.key === 'zepto') {
      this.wiredepExclusions.push('/jquery/');
    }
    if (this.props.ui.key === 'bootstrap') {
      if(this.props.bootstrapComponents.key !== 'official') {
        this.wiredepExclusions.push('/\\\/bootstrap\\.js$/');
        if(this.props.cssPreprocessor.extension === 'scss') {
          this.wiredepExclusions.push('/\\\/bootstrap-sass\\/.*\\.js/');
        }
      }
      if(this.props.cssPreprocessor.key !== 'noCssPrepro') {
        this.wiredepExclusions.push('/\\\/bootstrap\\.css/');
      }
    } else if (this.props.ui.key === 'foundation') {
      if(this.props.foundationComponents.key !== 'official') {
        this.wiredepExclusions.push('/foundation\\.js/');
      }
      if(this.props.cssPreprocessor.extension === 'scss') {
        this.wiredepExclusions.push('/foundation\\.css/');
      }
    }
  };

};
