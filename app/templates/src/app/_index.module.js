(function() {
    'use strict';

    /* globals angular */

    /**
     * @ngdoc object
     * @name  <%- appName %>
     * @description
     *
     * Main module of <%- appName %> application
     */

    angular
        .module('<%- appName %>', [ <% -modulesDependencies %> ]);

})();
