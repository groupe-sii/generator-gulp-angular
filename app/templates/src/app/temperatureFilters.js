'use strict';

angular.module('temperatureFactory')
.filter('celsiusToFahrenheit', function() {
    return function(input) {
        return temperatureConverter.celsiusToFahrenheit(input);
    };
})
.filter('fahrenheitToCelsius', function() {
    return function(input) {
        return temperatureConverter.fahrenheitToCelsius(input);
    };
});
