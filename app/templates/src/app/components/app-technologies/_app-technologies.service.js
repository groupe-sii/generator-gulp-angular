(function() {
    'use strict';

    angular
        .module('<%- appName %>')
        .service('AppTechnologiesService', AppTechnologiesService);

    AppTechnologiesService.$inject = [];

    /* @ngInject */
    function AppTechnologiesService() {
        var service = {
            getTechs: getTechs,
            getSIITechs: getSIITechs
        };

        return service;

        ////////////////

        function getTechs() {
            return <%- technologies %>;
        }

        function getSIITechs() {
            return <%- siiTechnologies %>;
        }
    }
})();
