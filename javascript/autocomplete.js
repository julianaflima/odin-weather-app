import { getAutocompleteOptions } from "./api.js"

async function showAutocompleteDropdown(cityName) {
	console.log(cityName);
	let options = await getAutocompleteOptions(cityName);
	console.log(options);
	const autocompleteList = document.querySelector('.autocomplete-list');
	autocompleteList.innerHTML = '';

	options.forEach((option) => {
		autocompleteList.innerHTML += `<li cityID="${option.url}">${option.name}, ${option.region}, ${option.country}</li>`;
	});

	
}



export {
	showAutocompleteDropdown,
}