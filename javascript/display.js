import { selectCity } from "./select.js";
import { getWeatherData } from "./api.js"


async function showCityWeather(e) {
	// console.log(e.target);
	// const city = await selectCity(e);
	const cityId = e.target.dataset.cityid;
	const cityData = await getWeatherData(cityId)
	console.log(cityData)

	// clean dropdown
	document.querySelector('.autocomplete-list').innerHTML = '';
	document.querySelector('.results').classList.add('hidden');

	const container = document.createElement('div');
	container.innerHTML = `<h1> ${cityData.location.name}, ${cityData.location.country} </h1>
	<div>${cityData.current.condition_text}</div>
	<img src="${cityData.current.condition_icon}" alt="">`;

	document.body.appendChild(container);

}

export {
	showCityWeather,
}