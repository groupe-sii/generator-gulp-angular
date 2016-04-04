'use strict';

var _ = require('lodash');

module.exports = function(GulpAngularGenerator) {

    /**
     * Compute Angular's other modules to load and format the dependency list to insert
     */
    GulpAngularGenerator.prototype.computeOtherModules = function computeOtherModules() {

        // angular-translate
        if(_.includes(this.props.otherModulesKeys, 'translate')) {
            this.files.push({
                src: 'config/languages/_en.json',
                dest: 'config/languages/en.json',
                template: true
            });

            this.files.push({
                src: 'config/languages/_fr.json',
                dest: 'config/languages/fr.json',
                template: true
            });
        }

        // Injections
        var injections = this.props.otherModules.map(function(module) {
            return module.inject;
        })[0];

        if (typeof injections !== 'undefined' && injections.length > 0) {
            injections.push('$logProvider');
        } else {
            injections = ['$logProvider'];
        }

        this.props.baseInjectionsQuotes = '';
        this.props.baseInjections = '';
        if(injections !== undefined) {
            this.props.baseInjectionsQuotes = injections
                .map(function(dependency) {
                    return '\'' + dependency + '\'';
                })
                .join(', ');
            this.props.baseInjections = injections.join(', ');
        }
    };
};
