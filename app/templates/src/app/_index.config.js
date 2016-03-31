(function() {
    'use strict';

    angular
        .module('<%- props.appName %>')
        .config(config);

    /** @ngInject */
    function config(<%- props.baseInjections %>) {

        // Logging
        $logProvider.debugEnabled(true);

        <% if (props.otherModulesKeys.indexOf('translate') !== -1) { -%>
        // Translation
        var language = navigator.browserLanguage || navigator.language;
        $translateProvider.translations('en', LANGUAGES.en);
        $translateProvider.translations('fr', LANGUAGES.fr);
        $translateProvider.preferredLanguage((angular.isDefined(LANGUAGES[language])) ? language : 'en');
        <% } -%>
    }

})();
