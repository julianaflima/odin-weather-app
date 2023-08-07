import * as api from "./api.js";
import { showAutocompleteDropdown } from "./autocomplete.js";

const input = document.querySelector('#city-input');
input.addEventListener('keyup', (e) => {
	const cityName = input.value;
	showAutocompleteDropdown(cityName);	
});
console.log(input.value);

// let cityName = 'london-city-of-london-greater-london-united-kingdom';

// api.getWeatherData(cityName);

// let cityNameOptions = 'bengaluru'
// showAutocompleteDropdown(cityNameOptions);