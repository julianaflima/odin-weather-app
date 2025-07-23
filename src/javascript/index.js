import "../style.css";
import * as api from "./api.js";
import { showAutocompleteDropdown } from "./autocomplete.js";
import { showCityWeather } from "./display.js"


// const API_KEY = 'ZYMNF6E2WY66VDTXW4B5Y33MD';

const input = document.querySelector('#city-input');
input.addEventListener("keydown", (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
    console.log(e);
    const cityName = input.value;
		console.log(cityName);
		
		// TODO: GET UNIT PREFERENCE WITH BUTTON

		// FROM api.js
		// api.getWeatherData(cityName, 'metric');

		// TODO LATER
		// showAutocompleteDropdown(cityName);	

		// display results
		showCityWeather(cityName);
	}
});

document.documentElement.classList.add('night');

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);


// const req = require.context('../images/icons_mono', false, /\.svg$/)
// console.log(req);
// console.log(req.keys());
// console.log(req.resolve("./cloudy.svg"));
// console.log(req.id);
// console.log(req("./cloudy.svg"));
// const testCloudy = "cloudy";
// const test = "./" + testCloudy + ".svg";



// const containerImg = document.createElement('div');
// containerImg.innerHTML = `<img src=${req("./" + testCloudy + ".svg")} alt="">`
// document.body.appendChild(containerImg);


// console.log(typeof(req.keys()));

// req.keys().forEach((filename) => {
// 	console.log('filename: ' + filename);
// 	const component = req(filename);
// 	console.log(component);
// });