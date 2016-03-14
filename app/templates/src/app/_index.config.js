(function() {
    'use strict';

    angular
        .module('<%- props.appName %>')
        .config(config);

    /** @ngInject */
    function config($logProvider, toastrConfig) {
        // Enable log
        $logProvider.debugEnabled(true);
    }

})();
