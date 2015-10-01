'use strict';

var path = require('path');
var files = require('../files.json');

/**
 * Take a template file path and create a copy description object
 * Add an _ to the file's basename if it's a template
 * Look for the js preprocessor equivalent file and use it if exist
 */
function resolvePaths(template) {
    return function(file) {
        var src = file,
            dest = file;

        if (template) {
            var basename = path.basename(file);
            src = file.replace(basename, '_' + basename);
        }

        if (src.match(/\.js$/)) {
            var preprocessorFile = this.sourceRoot() + '/' + src.replace(/\.js$/, '.js');
            if (this.fs.exists(preprocessorFile)) {
                src = src.replace(/\.js$/, '.js');
                dest = dest.replace(/\.js$/, '.js');
            }
        }

        return {
            src: src,
            dest: dest,
            template: template
        };
    };
}

module.exports = function(GulpAngularGenerator) {

    /**
     * Prepare all files from files.json and add them to `this.files` as copy description object
     */
    GulpAngularGenerator.prototype.prepareFiles = function prepareFiles() {
        this.files = []
            .concat(files.staticFiles.map(resolvePaths(false), this))
            .concat(files.templates.map(resolvePaths(true), this));

    };

};
