(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name  AppTechnologiesService
     * @module <%- props.appName %>
     * @description
     *
     * AppTechnologies Service
     */

    angular
        .module('<%- props.appName %>')
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

        /**
         * @ngdoc method
         * @name AppTechnologiesService#getTechs
         * @return {array} Array of technologies
         * @description Return an array of technologies
         */
        function getTechs() {
            return <%- technologies %>;
        }

        function getSIITechs() {
            return <%- siiTechnologies %>;
        }
    }
})();
