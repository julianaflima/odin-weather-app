import { metricToUs } from "./temp_unit.js"
const API_KEY = 'ZYMNF6E2WY66VDTXW4B5Y33MD';

class CityData {
	constructor() {
		this.alerts = {};
		this.current = {};
		// array of days and their forecast
		this.forecast = [];
		this.location = {};
	}
}


async function getWeatherData(cityName) {
	try {
		const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${API_KEY}`, {mode: "cors"});
		const data = await response.json();
		// console.log(data);

		const city = new CityData;

		// Add current weather information to Object
		city.location = data.resolvedAddress;
		city.current.condition_text = data.currentConditions.conditions;
		city.current.icon = data.currentConditions.icon;
		city.current.temp = {};
		city.current.tempMax = {};
		city.current.tempLow = {};
		city.current.temp.metric = Math.round(data.days[0].temp);
		city.current.temp.us = metricToUs(city.current.temp.metric)
		city.current.tempMax.metric = Math.round(data.days[0].tempmax);
		city.current.tempMax.us = metricToUs(city.current.tempMax.metric);
		city.current.tempLow.metric = Math.round(data.days[0].tempmin);
		city.current.tempLow.us = metricToUs(city.current.tempLow.metric);
		city.current.chanceRain = Math.round(data.days[0].precipprob);
		city.current.humidity = Math.round(data.days[0].humidity);

		// // Location
		// city.location.name = data.location.name;
		// city.location.country = data.location.country;
		// city.location.time_zone = data.location.tz_id;

		//TODO Alert


		// TEST FUNCTION FOR FORECAST
		nextXDaysForecast(city, data, 3);
		

		// console.log(city);
		return city;
		
	} catch(e) {
		// statements
		console.log(e);
	}
}

async function getAutocompleteOptions(inputName) {
	const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${inputName}`, {mode: "cors"});
	const data = await response.json();
	// console.log(data);
	return data
}


function nextXDaysForecast(city, data, numberOfDays) {

	const daysToForescast = Math.min(data.days.length, numberOfDays)

	for (let i = 1; i <= daysToForescast; i++) {
		let followingDay = {};
		followingDay.tempMax = {};
		followingDay.tempLow = {};
		
		followingDay.icon = data.days[i].icon;
		followingDay.tempMax.metric = Math.round(data.days[i].tempmax);
		followingDay.tempMax.us = metricToUs(followingDay.tempMax.metric);
		followingDay.tempLow.metric = Math.round(data.days[i].tempmin);
		followingDay.tempLow.us = metricToUs(followingDay.tempLow.metric);
		followingDay.chanceRain = Math.round(data.days[i].precipprob);
	
		city.forecast.push(followingDay);
	}
}



export { 
	CityData,
	getWeatherData,
	getAutocompleteOptions
	};