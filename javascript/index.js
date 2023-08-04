async function getWeatherInfo() {
	try {
		const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=34a457572d684d08a2114501230308&q=london-city-of-london-greater-london-united-kingdom&days=3&aqi=yes&alerts=yes`, {mode: "cors"});
		const data = await response.json();
		console.log(data);

		// const currentTemp = data.
		
	} catch(e) {
		// statements
		console.log(e);
	}
}

getWeatherInfo();