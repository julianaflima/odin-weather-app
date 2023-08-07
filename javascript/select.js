import { getWeatherData } from "./api.js"

async function selectCity(e) {
	const city = e.target.dataset.cityid;
	const cityData = await getWeatherData(city);
	// console.log(cityData);
	return cityData;
}

export {
	selectCity,
}