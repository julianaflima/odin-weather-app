import { getAutocompleteOptions } from "./api.js"
import { selectCity } from "./select.js"

async function showAutocompleteDropdown(cityName) {
	// console.log(cityName);
	let options = await getAutocompleteOptions(cityName);
	// console.log(options);
	const autocompleteList = document.querySelector('.autocomplete-list');
	autocompleteList.innerHTML = '';

	options.forEach((option) => {
		autocompleteList.innerHTML += `<li data-cityID="${option.url}">${option.name}, ${option.region}, ${option.country}</li>`;
	});

	// add event listener to select from dropdownlist
	autocompleteList.addEventListener('click', showCityWeather);
}

function showCityWeather(e) {
	// console.log(e.target);
	selectCity(e).then((result) => console.log(result));
	// clean dropdown
	document.querySelector('.autocomplete-list').innerHTML = '';
	document.querySelector('.results').classList.add('hidden');
}



export {
	showAutocompleteDropdown,
}