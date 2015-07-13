'use strict';

/**
 * @ngdoc controller
 * @name  <%- props.appName %>.controller:MainController
 * @description
 *
 * Main Controller
 */

angular
    .module('<%- props.appName %>')
    .controller('MainController', function() {
        var vm = this;
        vm.title = '<%- props.appName %>';
    });
