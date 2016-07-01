'use strict';

var _ = require('lodash');

module.exports = function(GulpAngularGenerator) {

  /**
   * Compute Angular's other modules to load and format the dependency list to insert
   */
  GulpAngularGenerator.prototype.computeOtherModules = function computeOtherModules() {

    // angular-translate
    if(_.includes(this.props.otherModulesKeys, 'translate')) {
      this.files.push({
        src: 'config/languages/_en.json',
        dest: 'config/languages/en.json',
        template: true
      });

      this.files.push({
        src: 'config/languages/_fr.json',
        dest: 'config/languages/fr.json',
        template: true
      });
    }

    // Sass 7-1
    if(_.includes(this.props.otherModulesKeys, 'sass71') && (this.props.cssPreprocessor.key === 'node-sass' || this.props.cssPreprocessor.key === 'ruby-sass')) {
      var pattern71 = [
        'src/styles/abstracts/_variables.scss',
        'src/styles/components/_button.scss',
        'src/styles/layout/_header.scss',
        'src/styles/pages/_home.scss',
        'src/styles/themes/_theme.scss'
      ];

      // Angular Material
      if (this.props.ui.key === 'angular-material') {
        this.files.push({
          src: 'src/styles/base/_angular-material-core.scss',
          dest: 'src/styles/base/_core.scss'
        });

        this.files.push({
          src: 'src/styles/base/_angular-material-typography.scss',
          dest: 'src/styles/base/_typography.scss'
        });
      }

      // Bootstrap
      if (this.props.ui.key === 'bootstrap') {
        pattern71.push('src/styles/vendors/_bootstrap.scss');

        this.files.push({
          src: 'src/styles/base/_bootstrap-core.scss',
          dest: 'src/styles/base/_core.scss'
        });
      }

      // Foundation
      if (this.props.ui.key === 'foundation') {
        pattern71.push('src/styles/vendors/_foundation.scss');

        this.files.push({
          src: 'src/styles/base/_foundation-core.scss',
          dest: 'src/styles/base/_core.scss'
        });
      }

      // Material Design Lite
      if (this.props.ui.key === 'material-design-lite') {
        this.files.push({
          src: 'src/styles/base/_material-design-lite-core.scss',
          dest: 'src/styles/base/_core.scss'
        });

        this.files.push({
          src: 'src/styles/base/_material-design-lite-typography.scss',
          dest: 'src/styles/base/_typography.scss'
        });
      }

      // no UI
      if (this.props.ui.key === 'noUI') {
        this.files.push({
          src: 'src/styles/base/_noUI-core.scss',
          dest: 'src/styles/base/_core.scss'
        });
      }

      this.files = this.files.concat(pattern71.map(function (file) {
        return {
          src: file,
          dest: file,
          template: true
        }
      }));
    }

    // Injections
    var injections = this.props.otherModules.map(function(module) {
      return module.inject;
    })[0];

    if (typeof injections !== 'undefined' && injections.length > 0) {
      injections.push('$logProvider');
    } else {
      injections = ['$logProvider'];
    }

    this.props.baseInjectionsQuotes = '';
    this.props.baseInjections = '';
    if(injections !== undefined) {
      this.props.baseInjectionsQuotes = injections
        .map(function(dependency) {
          return '\'' + dependency + '\'';
        })
        .join(', ');
      this.props.baseInjections = injections.join(', ');
    }
  };
};
