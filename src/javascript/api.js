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


async function getWeatherData(cityName, unit) {
	try {
		const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${unit}&key=${API_KEY}`, {mode: "cors"});
		const data = await response.json();
		console.log(data);

		const city = new CityData;

		console.log(data.days[0].temp);
		// Current data
		city.location = data.resolvedAddress;
		city.current.condition_text = data.currentConditions.conditions;
		city.current.icon = data.currentConditions.icon;
		city.current.temp = Math.round(data.days[0].temp);
		city.current.tempMax = Math.round(data.days[0].tempmax);
		city.current.tempMin = Math.round(data.days[0].tempmin);
		city.current.chanceRain = Math.round(data.days[0].precipprob);
		city.current.humidity = Math.round(data.days[0].humidity);
		// city.current.temp_c = data.current.temp_c;
		// city.current.temp_f = data.current.temp_f;
		// city.current.feelslike_c = data.current.feelslike_c;
		// city.current.feelslike_f = data.current.feelslike_f;
		// city.current.air_quality = data.current.air_quality;
		// city.current.uv = data.current.uv;

		// // Location
		// city.location.name = data.location.name;
		// city.location.country = data.location.country;
		// city.location.time_zone = data.location.tz_id;

		// // TODO Alert


		// TEST FUNCTION FOR FORECAST
		nextXDaysForecast(city, data, 3);
		

		console.log(city);
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
	// TODO CHECK FOR DAYS GREATER THAN THE AVAILABLE DAYS

	const daysToForescast = Math.min(data.days.length, numberOfDays)

	for (let i = 1; i <= daysToForescast; i++) {
		let followingDay = {};
		followingDay.icon = data.days[i].icon;
		followingDay.tempMax = Math.round(data.days[i].tempmax);
		followingDay.tempLow = Math.round(data.days[i].tempmin);
		followingDay.chanceRain = Math.round(data.days[i].precipprob);
	
		city.forecast.push(followingDay);
	}
}

export { 
	CityData,
	getWeatherData,
	getAutocompleteOptions
	};