(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name  <%- props.appName %>.service:AppTechnologiesService
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

        function getTechs() {
            return <%- technologies %>;
        }

        function getSIITechs() {
            return <%- siiTechnologies %>;
        }
    }
})();
