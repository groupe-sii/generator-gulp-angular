(function() {
  'use strict';

  angular
    .module('<%- props.appName %>')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
