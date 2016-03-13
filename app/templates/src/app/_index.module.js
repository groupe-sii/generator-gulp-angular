"use strict";
var index_config_1 = require('./index.config');
 % ;
if (props.router.key === 'new-router') {
    - %  >
    ;
     % ;
}
else if (props.router.key !== 'noRouter') {
    - %  >
    ;
     % ;
}
- %  >
;
var index_run_1 = require('./index.run');
var main_controller_1 = require('./main/main.controller');
var app_technologies_service_1 = require('./components/app-technologies/app-technologies.service');
from;
'./config';
module <  % -props.appName %  > {
    'use strict': ,
    angular: .module('<%- props.appName %>', [
         % -modulesDependencies %  > ,
         % -props.appName %  > Config.name
    ])
        .config(index_config_1.config)
        <  % , if: function (props, router, key) {
        if (key === void 0) { key =  !== 'noRouter'; }
        - %  >
                .config(index_route_1.routerConfig)
            <  % ;
    } } -  %  >
        .service('AppTechnologiesService', app_technologies_service_1.AppTechnologiesService)
        .run(index_run_1.runBlock)
    <  % ;
if (props.router.key === 'new-router') {
    - %  >
            .controller('RouterController', index_route_1.RouterController)
        <  % ;
}
- %  >
        .controller('MainController', main_controller_1.MainController);
