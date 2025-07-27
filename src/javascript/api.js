import { metricToUs } from "./temp_unit.js"
const API_KEY = 'ZYMNF6E2WY66VDTXW4B5Y33MD';
const API_KEY_GEOCODE = '68833fc17bbae270338907cmtf7545f';

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

		// This API would fix the problem with not loading weather if the input is just 'beng'.
		// const testResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=34a457572d684d08a2114501230308&q=${cityName}`, {mode: "cors"});
		// const testData = await testResponse.json();
		// console.log(testData);


		const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${API_KEY}`, {mode: "cors"});

		// If statement to catch invalid response data
		if (response.ok) {
			const data = await response.json();

			const city = new CityData;

			// Add current weather information to Object
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


			// Get city, state, country from latitude and longitude
			const latitude = data.latitude;
			const longitude = data.longitude;
			const responseGeocode = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${API_KEY_GEOCODE}`, {mode: "cors"});
			const cityCountryFromLatLon = await responseGeocode.json();
			city.location.city = cityCountryFromLatLon.address.city;
			city.location.state = getState(cityCountryFromLatLon.address.state);
			city.location.country = cityCountryFromLatLon.address.country;

			//TODO Alert


			// TEST FUNCTION FOR FORECAST
			nextXDaysForecast(city, data, 3);

			// console.log(city);


			return city;
		} else {
			// In case the response is not a valid JASON object
			return false
		}
		
	} catch(e) {
		// statements
		console.log(e);
	}
}

async function getAutocompleteOptions(inputName) {
	const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${inputName}`, {mode: "cors"});
	const data = await response.json();
	console.log(data);
	return data
}


function nextXDaysForecast(city, data, numberOfDays) {

	const daysToForescast = Math.min(data.days.length, numberOfDays)

	let dayOfWeekDigit = new Date().getDay();

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
		followingDay.date = data.days[i].datetime;


		// Get day of the week. First day should be tomorrow
		if (i == 1) {
			followingDay.weekDay = "Tomorrow";
		}
		else {
			let dayOfWeek = new Date(followingDay.date);
			let dayOfWeekName = dayOfWeek.toLocaleString('default', {weekday: 'short'});
			followingDay.weekDay = dayOfWeekName;
		}
	
		city.forecast.push(followingDay);
	}
}


function getState(state) {
	if (state) {
		state = state + ', '
		return state;
	}
	else {
		state = '';
		return state
	}
}



export { 
	CityData,
	getWeatherData,
	getAutocompleteOptions
	};