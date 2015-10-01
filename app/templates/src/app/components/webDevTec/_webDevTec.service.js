(function() {
    'use strict';

    angular
        .module('<%- appName %>')
        .service('WebDevTecService', WebDevTecService);

    /* @ngInject */
    function WebDevTecService() {
        var data = <%- technologies %>;

        this.getTec = getTec;

        function getTec() {
            return data;
        }
    }

})();
