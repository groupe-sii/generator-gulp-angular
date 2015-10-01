export class MainController {
  constructor ($timeout, WebDevTecService, toastr) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = <%- new Date().getTime() %>;
    this.toastr = toastr;

    this.activate($timeout, WebDevTecService);
  }

  activate($timeout, WebDevTecService) {
    this.getWebDevTecService(WebDevTecService);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTecService(WebDevTecService) {
    this.awesomeThings = WebDevTecService.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
