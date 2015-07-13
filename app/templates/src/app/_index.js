'use strict';

/* globals angular */

/**
 * @ngdoc object
 * @name  <%- props.appName %>
 * @description
 *
 * Main module of <%- appName %> application
 */

angular
    .module('<%- props.appName %>', [<%- modulesDependencies %>])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/');
    }])
    .run([function() {

    }]);
