import { AppTechnologiesService, ITecThing } from '../components/app-technologies/app-technologies.service';

export class MainController {
  public awesomeThings: ITecThing[];
  public siiTechs: ITecThing[];
  public AppTechnologiesService: AppTechnologiesService;
  public classAnimation: string;
  public creationDate: number;
  public toastr: any;

  /* @ngInject */
  constructor ($timeout: angular.ITimeoutService, AppTechnologiesService: AppTechnologiesService, toastr: any) {
    this.awesomeThings = new Array();
    this.siiTechs = new Array();
    this.AppTechnologiesService = AppTechnologiesService;
    this.classAnimation = '';
    this.activate($timeout);
    this.toastr = toastr;
  }

  /** @ngInject */
  activate($timeout: angular.ITimeoutService) {
    this.getAppTechnologies();

    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  showToastr() {
    this.toastr.info('Generator Gulp Angular / SII');
    this.classAnimation = '';
  }

  getAppTechnologies() {
    this.awesomeThings = this.AppTechnologiesService.tec;
    this.siiTechs = this.AppTechnologiesService.siitec;
  }
}
