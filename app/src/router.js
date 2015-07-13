'use strict';


module.exports = function(GulpAngularGenerator) {

  /**
   * Configure routing by defining what to add in the index.html and what in the app.js
   */
  GulpAngularGenerator.prototype.computeRouter = function computeRouter() {
    var routerPartialSrc = 'src/app/main/__' + this.props.ui.key + '.html';

    if (this.props.router.module === 'ngRoute') {
      this.routerHtml = '<div ng-view></div>';

    } else if (this.props.router.module === 'ui.router') {
      this.routerHtml = '<div ui-view></div>';

    } else {
      this.routerHtml = this.fs.read(this.templatePath(routerPartialSrc));
      this.routerHtml = this.routerHtml.replace(
        /^<div ([^>]*)>/,
        '<div $1 ng-controller="MainController as main">'
      );

      this.routerHtml = this.routerHtml.replace(/\n/g, '\n    ');
    }
  };

};
