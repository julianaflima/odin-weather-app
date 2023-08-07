import * as api from "./api.js";
import { showAutocompleteDropdown } from "./autocomplete.js";

const input = document.querySelector('#city-input');
input.addEventListener('keyup', (e) => {
	const cityName = input.value;
	showAutocompleteDropdown(cityName);	
});
