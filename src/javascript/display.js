import { getWeatherData } from "./api.js"


// Get the path of all images inside ./images/icons_mono
// icons.keys() => array with all file names
// icons(FILENAME) => webpack path to the image
const icons = require.context('../images/icons_mono', false, /\.svg$/);


async function showCityWeather(cityName) {
	// console.log(e.target);
	// const cityId = e.target.dataset.cityid;
	// console.log(e.target.dataset)
	const cityData = await getWeatherData(cityName, 'metric');
	console.log(cityData);

	// Clear dropdown
	document.querySelector('.autocomplete-list').innerHTML = '';
	// document.querySelector('.results').classList.add('hidden');

	// Clear/Reset container with results
	const container = document.querySelector('.container')
	container.innerHTML = ``;


	// Add div with current weather information to container
	container.innerHTML = `<div class="current-container">
		<h1> ${cityData.location} </h1>
		<img src=${icons("./" + cityData.current.icon + ".svg" )} alt="" id="current-icon">
		<div>${cityData.current.condition_text}</div>
		<div>${cityData.current.tempMax} ${cityData.current.tempMin}</div>
		<div>
		<img src=${icons("./chanceRain.svg")} id="precipitation-icon"} alt=""> ${cityData.current.chanceRain}% 
		 <img src=${icons("./humidity.svg")} id="precipitation-icon"} alt=""> ${cityData.current.humidity}%
		</div>
	</div>`;

	// Div with forecast for the next days
	const forecast = document.createElement('div');
	forecast.classList.add('forecast-container');

	// Add each day to the forecast div
	for (let i = 0; i < cityData.forecast.length; i++) {
		const cardForecastDay = document.createElement('div');
		// TODO: probably add a class to each forecast day
		cardForecastDay.innerHTML = `
			<img src=${icons("./" + cityData.forecast[i].icon + ".svg" )} alt="" id="forecast-icon">
			<div>
				${cityData.forecast[i].tempMax} ${cityData.forecast[i].tempLow}
			</div>
			<div>
				<img src=${icons("./chanceRain.svg")} id="precipitation-icon"} alt="">
				${cityData.forecast[i].chanceRain}%
			</div>`;
		forecast.appendChild(cardForecastDay);
	};

	container.appendChild(forecast);

}

export {
	showCityWeather,
}