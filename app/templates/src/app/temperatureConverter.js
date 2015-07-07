var temperatureConverter = (function() {

	var waterFreezingTemperature = 32, //in °F
		coefficient = 1.8,
		precision = 100;

	/**
	 * celsiusToFahrenheit Convert celsius to fahrenheit temperature
	 * @param  {number} celsiusValue celsius temperature
	 * @return {number} fahrenheit temperature
	 */
	var celsiusToFahrenheit = function(celsiusValue) {
		return Math.floor( ((celsiusValue*coefficient) + waterFreezingTemperature) * precision) / precision;
	};

	/**
	 * celsiusToFahrenheit Convert fahrenheit to celsius temperature
	 * @param  {number} celsiusValue fahrenheit temperature
	 * @return {number} celsius temperature
	 */
	var fahrenheitToCelsius = function(fahrenheitValue) {
		return Math.floor( ((fahrenheitValue - waterFreezingTemperature)/coefficient) * precision) / precision;
	};

	return {
		celsiusToFahrenheit: celsiusToFahrenheit,
		fahrenheitToCelsius: fahrenheitToCelsius
	};

})();