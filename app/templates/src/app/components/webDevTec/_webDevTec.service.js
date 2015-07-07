(function() {
  'use strict';

  /**
 * @ngdoc service
 * @name  testGeneratorAngularSii.service:webDevTec
 * @description
 *
 * Gestion des webDevTec
 */

  angular
      .module('<%- appName %>')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = <%- technologies %>;

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();
