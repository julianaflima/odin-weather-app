const API_KEY = '34a457572d684d08a2114501230308';

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
		const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=yes&alerts=yes`, {mode: "cors"});
		const data = await response.json();
		console.log(data);

		const city = new CityData;
		// Current data
		city.current.condition_text = data.current.condition.text;
		city.current.condition_icon = data.current.condition.icon;
		city.current.temp_c = data.current.temp_c;
		city.current.temp_f = data.current.temp_f;
		city.current.feelslike_c = data.current.feelslike_c;
		city.current.feelslike_f = data.current.feelslike_f;
		city.current.humidity = data.current.humidity;
		city.current.air_quality = data.current.air_quality;
		city.current.uv = data.current.uv;
		city.current.precipitation = data.current.precipitation;

		// Forecast current day + next 2 days
		for(let i = 0; i < 3; i++){
			city.forecast.push({});
			city.forecast[i].date = data.forecast.forecastday[i].date;
			city.forecast[i].maxtemp_c = data.forecast.forecastday[i].day.maxtemp_c;
			city.forecast[i].maxtemp_f = data.forecast.forecastday[i].day.maxtemp_f;
			city.forecast[i].mintemp_c = data.forecast.forecastday[i].day.mintemp_c;
			city.forecast[i].mintemp_f = data.forecast.forecastday[i].day.mintemp_f;
			city.forecast[i].change_of_rain = data.forecast.forecastday[i].day.daily_chance_of_rain;
		}

		// Location
		city.location.name = data.location.name;
		city.location.country = data.location.country;

		// TODO Alert


		console.log(city);
		
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


export { 
	CityData,
	getWeatherData,
	getAutocompleteOptions
	};