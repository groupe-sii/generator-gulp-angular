'use strict';

module.exports = function(GulpAngularGenerator) {

    /**
     * Add files of main view depending on the ui framework and the css preprocessor
     */
    GulpAngularGenerator.prototype.uiFiles = function uiFiles() {

        if (this.props.router.module !== null) {
            this.files.push({
                src: 'src/app/main/__' + this.props.ui.key + '.html',
                dest: 'src/app/main/main.html',
                template: true
            });
        }

        this.files.push({
            src: 'src/app/_' + this.props.ui.key + '/__' + this.props.ui.key + '-index.' + this.props.cssPreprocessor.extension,
            dest: 'src/app/index.' + this.props.cssPreprocessor.extension,
            template: true
        });
    };
};
