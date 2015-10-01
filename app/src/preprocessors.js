'use strict';

var _ = require('lodash');

function rejectWithRegexp(regexp) {
    this.files = _.reject(this.files, function(file) {
        return regexp.test(file.src);
    });
}

module.exports = function(GulpAngularGenerator) {

    /**
     * List files extension processed by the generator
     */
    GulpAngularGenerator.prototype.computeProcessedFileExtension = function computeProcessedFileExtension() {
        this.processedFileExtension = [
            'html',
            'css',
            'js',
            this.props.cssPreprocessor.extension,
            this.props.htmlPreprocessor.extension
        ];
        if (this.imageMin) {
            this.processedFileExtension = this.processedFileExtension.concat(['jpg', 'png', 'gif', 'svg']);
        }
        this.processedFileExtension = _.chain(this.processedFileExtension)
            .uniq()
            .filter(_.isString)
            .value()
            .join(',');
    };

    /**
     * Compute gulp inject task dependencies depending on js and css preprocessors
     */
    GulpAngularGenerator.prototype.computeWatchTaskDeps = function computeInjectTaskDeps() {
        this.watchTaskDeps = [];

        if (this.props.htmlPreprocessor.key !== 'noHtmlPrepro') {
            this.watchTaskDeps.push('\'markups\'');
        }

        this.watchTaskDeps.push('\'inject\'');
        this.watchTaskDeps.push('\'config\'');
    };

    /**
     * Reject files from files.json
     * Some important files are listed in the files.json even if they are not needed
     * depending on options. This step reject these files.
     */
    GulpAngularGenerator.prototype.rejectFiles = function rejectFiles() {
        if (this.props.cssPreprocessor.key === 'noCssPrepro') {
            rejectWithRegexp.call(this, /styles\.js/);
        }

        // FIXME Try delete
        rejectWithRegexp.call(this, /tsd\.json/);
        rejectWithRegexp.call(this, /tsconfig\.json/);

        if (this.props.htmlPreprocessor.key === 'noHtmlPrepro') {
            rejectWithRegexp.call(this, /markups\.js/);
        }
    };

    /**
     * Copy additional lint files if needed
     */
    GulpAngularGenerator.prototype.lintCopies = function lintCopies() {
        // FIXME Try delete
    };

    /**
     * Copy additional files for Travis
     */
    GulpAngularGenerator.prototype.travisCopies = function travisCopies() {
        // FIXME Try delete
    };
};
