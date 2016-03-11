export interface ITecThing {
  title: string;
  url: string;
  description: string;
  logo: string;
}

export class AppTechnologiesService {
  public data: ITecThing[];
  public siidata: ITecThing[];

  public get tec(): ITecThing[] {
    return this.data;
  }

  public get siitec(): ITecThing[] {
    return this.siidata;
  }

  /** @ngInject */
  constructor () {
    this.data = <%- technologies %>;
    this.siidata = <%- siiTechnologies %>;
  }
}
