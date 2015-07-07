define([
    'intern/chai!expect',
    'intern!bdd',
    'internalSrc/app/temperatureConverter'
], function(expect, bdd) {

    bdd.describe('vanilla module', function() {

        bdd.it('should convert a celsius temperature to fahrenheit', function() {
            expect(temperatureConverter.celsiusToFahrenheit(5)).to.equal(41);
        });

        bdd.it('should convert a fahrenheit temperature to celsius', function() {
            expect(temperatureConverter.fahrenheitToCelsius(41)).to.equal(5);
        });

    });
});
