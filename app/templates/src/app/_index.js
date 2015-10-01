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
        var language = _.find(AVAILABLE_LANGUAGES, {code: navigator.browserLanguage || navigator.language});
        $translateProvider.translations('en', LANGUAGES.en);
        $translateProvider.translations('fr', LANGUAGES.fr);
        $translateProvider.preferredLanguage((language) ? language.code : 'en');
<% } -%>
    }

    /* @ngInject */
    function run() {}
})();
