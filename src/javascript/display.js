import { getWeatherData } from "./api.js"


// Get the path of all images inside ./images/icons_mono
// icons.keys() => array with all file names
// icons(FILENAME) => webpack path to the image
const icons = require.context('../images/icons_mono', false, /\.svg$/);


async function showCityWeather(cityName, unit) {
	// console.log(e.target);
	// const cityId = e.target.dataset.cityid;
	// console.log(e.target.dataset)


	const cityData = await getWeatherData(cityName);

	// Clear dropdown
	document.querySelector('.autocomplete-list').innerHTML = '';
	// document.querySelector('.results').classList.add('hidden');

	// Clear/Reset container with results
	const container = document.querySelector('.container')
	container.innerHTML = ``;


	// Add div with current weather information to container
	container.innerHTML = `<div class="current-container">
		<h1> ${cityData.location} </h1>
		<img src=${icons("./" + cityData.current.icon + ".svg" )} alt="" class="icon" id="current-icon">
		<div>${cityData.current.condition_text}</div>
		<div>
			<span 
			class="temperature" 
			data-temp-metric=${cityData.current.tempMax.metric} 
			data-temp-us=${cityData.current.tempMax.us}>
			${cityData.current.tempMax[unit]}</span>&deg; / 
			<span 
			class="temperature"
			data-temp-metric=${cityData.current.tempLow.metric} 
			data-temp-us=${cityData.current.tempLow.us}>
			${cityData.current.tempLow[unit]}</span>&deg;
		</div>
		<div>
			<div class="icon-text" id="current-container-rain">
				<img src=${icons("./chanceRain.svg")} class="icon current-small-icon"} alt=""> <span>${cityData.current.chanceRain}%</span>
			</div>
			<div class="icon-text" id="current-container-humidity">
				 <img src=${icons("./humidity.svg")} class="icon current-small-icon"} alt=""> <span>${cityData.current.humidity}%</span>
			</div>
		</div>
	</div>`;

	// Div with forecast for the next days
	const forecast = document.createElement('div');
	forecast.classList.add('forecast-container');

	// Add each day to the forecast div
	for (let i = 0; i < cityData.forecast.length; i++) {
		const cardForecastDay = document.createElement('div');
		cardForecastDay.classList.add('forecast-card')

		cardForecastDay.innerHTML = `
			<img src=${icons("./" + cityData.forecast[i].icon + ".svg" )} alt="" class="icon forecast-card-main-icon">
			<div class="forecast-card-temp">
				<span 
				class="temperature" 
				data-temp-metric=${cityData.forecast[i].tempMax.metric} 
				data-temp-us=${cityData.forecast[i].tempMax.us}>
					${cityData.forecast[i].tempMax[unit]}</span>&deg; /
				<span 
				class="temperature" 
				data-temp-metric=${cityData.forecast[i].tempLow.metric} 
				data-temp-us=${cityData.forecast[i].tempLow.us}>
				${cityData.forecast[i].tempLow[unit]}</span>&deg;
			</div>
			<div class="icon-text" >
				<img src=${icons("./chanceRain.svg")} class="icon forecast-card-precipitation-icon"} alt=""><span>${cityData.forecast[i].chanceRain}%</span>
			</div>`;
		forecast.appendChild(cardForecastDay);
	};

	container.appendChild(forecast);
}


function changeTempUnit(newUnit) {
	console.log(newUnit);
	const allTempsToUpdate = document.querySelectorAll('.temperature');

	if (newUnit == 'metric') {
		allTempsToUpdate.forEach((temp) => {
			temp.innerHTML = `${temp.dataset.tempMetric}`;
		});
	}
	else {
		allTempsToUpdate.forEach((temp) => {
			temp.innerHTML = `${temp.dataset.tempUs}`;
		});
	}
}

export {
	showCityWeather,
	changeTempUnit,
}