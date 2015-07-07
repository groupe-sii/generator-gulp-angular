/*global angular*/

define([
    'intern/chai!expect',
    'intern!bdd',

    'intern/order!angular/angular',
    'intern/order!SOURCES/app/temperatureConverter',
    'intern/order!SOURCES/app/temperatureFactory'
], function(expect, bdd) {

    function inject(fn) {
        return function() {
            angular.injector(['ng', 'temperatureFactory']).invoke(fn);
        }
    }

    bdd.describe('temperature filter', function() {

        var celsiusToFahrenheitFilter = null,
            fahrenheitToCelsiusFilter = null;

        bdd.beforeEach(inject(function($filter) {
            celsiusToFahrenheitFilter = $filter('celsiusToFahrenheit');
            fahrenheitToCelsiusFilter = $filter('fahrenheitToCelsius');
        }));

        bdd.it('should be a wrapper for the vanilla module', function() {
            expect(celsiusToFahrenheitFilter(5)).to.equal(41);
            expect(fahrenheitToCelsiusFilter(41)).to.equal(5);
        });

    });
});
