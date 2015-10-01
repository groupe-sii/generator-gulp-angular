(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name <%- appName %>
     * @description <%- appName %> main module
     */
    angular
        .module('<%- appName %>', [
            <%- modulesDependencies %>
        ])
        .config(config)
        .run(run);

    config.$inject = [<%- props.baseInjectionsQuotes %>];

    /* @ngInject */
    function config(<%- props.baseInjections %>) {
<% if (props.otherModulesKeys.indexOf('translate') !== -1) { -%>
        // Translation
        var language = navigator.browserLanguage || navigator.language;
        $translateProvider.translations('en', LANGUAGES.en);
        $translateProvider.translations('fr', LANGUAGES.fr);
        $translateProvider.preferredLanguage((angular.isDefined(LANGUAGES[language])) ? language : 'en');
<% } -%>
    }

    /* @ngInject */
    function run() {}
})();
