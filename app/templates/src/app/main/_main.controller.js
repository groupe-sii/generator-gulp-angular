"use strict";
var MainController = (function () {
    function MainController($timeout, AppTechnologiesService, toastr) {
        this.awesomeThings = new Array();
        this.siiTechs = new Array();
        this.AppTechnologiesService = AppTechnologiesService;
        this.classAnimation = '';
        this.activate($timeout);
    }
    MainController.prototype.activate = function ($timeout) {
        var _this = this;
        this.getAppTechnologies();
        $timeout(function () {
            _this.classAnimation = 'rubberBand';
        }, 4000);
    };
    MainController.prototype.showToastr = function () {
        this.toastr.info('Generator Gulp Angular / SII');
        this.classAnimation = '';
    };
    MainController.prototype.getAppTechnologies = function () {
        this.awesomeThings = this.AppTechnologiesService.tec;
        this.siiTechs = this.AppTechnologiesService.siitec;
    };
    return MainController;
}());
exports.MainController = MainController;
