import "../style.css";
import "../toggle.css";
import * as api from "./api.js";
import { showAutocompleteDropdown } from "./autocomplete.js";
import { showCityWeather, changeTempUnit } from "./display.js"
import { tempUnit } from "./temp_unit.js"


// const API_KEY = 'ZYMNF6E2WY66VDTXW4B5Y33MD';

// Search Box
const input = document.querySelector('#city-input');
input.addEventListener("keydown", (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
    // console.log(e);
    const cityName = input.value;
		// console.log(cityName);
		
		// Get the temperature unit selected
    const toggleUnit = document.getElementById('selected-unit').checked;
		const selectedUnit = tempUnit(toggleUnit);

		// display temperature
		showCityWeather(cityName, selectedUnit);
	}

	// TODO LATER
	// showAutocompleteDropdown(cityName);	
});


// Change temperature unit displayed
const toggleUnit = document.getElementById('selected-unit');
toggleUnit.addEventListener("change", (e) => {

	// Returns "metric" or "us"
	const selectedUnit = tempUnit(toggleUnit.checked);
	changeTempUnit(selectedUnit);
});



// TODO: Change background depending on time/weather. For now the default is night. To be deleted when I can do that.
// document.documentElement.classList.add('default');


// Div where the weather info will be shown
const displayContainer = document.createElement('div');
displayContainer.classList.add('display-container');
document.body.appendChild(displayContainer);

const container = document.createElement('div');
container.classList.add('container');
displayContainer.appendChild(container);




// Default city
const selectedUnit = tempUnit(toggleUnit.checked);
showCityWeather("Curitiba", selectedUnit);
