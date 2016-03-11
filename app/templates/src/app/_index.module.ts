/// <reference path="../../<%- props.paths.tmp %>/typings/tsd.d.ts" />

import { config } from './index.config';
<% if (props.router.key === 'new-router') { -%>
import { routerConfig, RouterController } from './index.route';
<% } else if (props.router.key !== 'noRouter') { -%>
import { routerConfig } from './index.route';
<% } -%>
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AppTechnologiesService } from './components/app-technologies/app-technologies.service';

module <%- props.appName %> {
  'use strict';

  angular.module('<%- props.appName %>', [<%- modulesDependencies %>])
    .config(config)
<% if (props.router.key !== 'noRouter') { -%>
    .config(routerConfig)
<% } -%>
    .service('AppTechnologiesService', AppTechnologiesService)
    .run(runBlock)
<% if (props.router.key === 'new-router') { -%>
    .controller('RouterController', RouterController)
<% } -%>
    .controller('MainController', MainController);
}
