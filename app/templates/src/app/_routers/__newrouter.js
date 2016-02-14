(function() {
    'use strict';

    angular
        .module('<%- props.appName %>')
        .config(config)
        .controller('RouterController', RouterController);

    /* @ngInject */
    function config($componentLoaderProvider) {
        $componentLoaderProvider.setTemplateMapping(function(name) {
            return 'app/' + name + '/' + name + '.html';
        });
    }

    /* @ngInject */
    function RouterController($router) {
        $router.config([{
            path: '/',
            component: 'main'
        }]);
    }
})();
