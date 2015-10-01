'use strict';

var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var templateTools = require('../template-tools');
var mockModel = require('./mock-model');

describe('gulp-angular tsd template', function () {
  var tsd, model;

  before(function() {
    return templateTools.load('_tsd.json')
      .then(function(templateModule) {
        tsd = templateModule;
      });
  });

  beforeEach(function() {
    model = mockModel();
  });

  it('should insert tmp directory', function() {
    model.props.paths.tmp = 'test/tmp/dir';
    var result = tsd(model);
    result.should.match(/"path": "test\/tmp\/dir/);
    result.should.match(/"bundle": "test\/tmp\/dir/);
  });

  it('should insert default definitions', function() {
    model.props.paths.tmp = 'test/tmp/dir';
    var result = tsd(model);
    result.should.match(/angularjs\/angular.d.ts/);
    result.should.match(/angularjs\/angular-mocks.d.ts/);
    result.should.match(/jasmine\/jasmine.d.ts/);
    result.should.match(/karma-jasmine\/karma-jasmine.d.ts/);
    result.should.match(/moment\/moment-node.d.ts/);
  });

  it('should insert angular modules definitions', function() {
    model.angularModulesObject = {
      animate: true,
      cookies: true,
      sanitize: true
    };
    var result = tsd(model);
    result.should.match(/angularjs\/angular-animate.d.ts/);
    result.should.match(/angularjs\/angular-cookies.d.ts/);
    result.should.match(/angularjs\/angular-sanitize.d.ts/);
  });

  it('should insert jQuery definition', function() {
    model.props.jQuery.key = 'jquery2';
    var result = tsd(model);
    result.should.match(/jquery\/jquery.d.ts/);
  });

  it('should insert Zepto definition', function() {
    model.props.jQuery.key = 'zepto';
    var result = tsd(model);
    result.should.match(/zepto\/zepto.d.ts/);
  });

  it('should insert ngResource definition', function() {
    model.props.resource.key = 'angular-resource';
    var result = tsd(model);
    result.should.match(/angularjs\/angular-resource.d.ts/);
  });

  it('should insert Restangular definition', function() {
    model.props.resource.key = 'restangular';
    var result = tsd(model);
    result.should.match(/restangular\/restangular.d.ts/);
  });

  it('should insert UI-Router definition', function() {
    model.props.router.key = 'ui-router';
    var result = tsd(model);
    result.should.match(/angular-ui-router\/angular-ui-router.d.ts/);
  });

  it('should insert ngRoute definition', function() {
    model.props.router.key = 'angular-route';
    var result = tsd(model);
    result.should.match(/angularjs\/angular-route.d.ts/);
  });

  it('should insert Bootstrap definition', function() {
    model.props.ui.key = 'bootstrap';
    model.props.bootstrapComponents = 'official';
    var result = tsd(model);
    result.should.match(/bootstrap\/bootstrap.d.ts/);
  });

  it('should insert Foundation definition', function() {
    model.props.ui.key = 'foundation';
    model.props.foundationComponents = 'official';
    var result = tsd(model);
    result.should.match(/foundation\/foundation.d.ts/);
  });

  it('should insert Angular-Mateiral definition', function() {
    model.props.ui.key = 'angular-material';
    var result = tsd(model);
    result.should.match(/angular-material\/angular-material.d.ts/);
  });

  it('should insert UI-Bootstrap definition', function() {
    model.props.ui.key = 'angular-material';
    var result = tsd(model);
    result.should.match(/angular-ui-bootstrap\/angular-ui-bootstrap.d.ts/);
  });
});
