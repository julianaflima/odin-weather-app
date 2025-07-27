

function chooseBackground(icon) {
	const root = document.documentElement;

	switch (icon) {
		case "clear-day":
			root.removeAttribute("class");
			root.classList.add("sunny");
			break;
	
		case "cloudy":
		case "fog":
		case "partly-cloudy-day": 
		case "wind":
			root.removeAttribute("class");
			root.classList.add("cloudy");
			break;

		case "clear-night":
		case "partly-cloudy-night":
		case "rain-snow-showers-night":
		case "snow-showers-night":
		case "thunder":
			root.removeAttribute("class");
			root.classList.add("night");
			break;

		case "rain-snow-showers-day":
		case "rain-snow":
		case "sleet":
		case "snow-showers-day":
		case "snow":
			root.removeAttribute("class");
			root.classList.add("snow");
			break;

		case "hail":
		case "rain":
		case "showers-day":
		case "showers-night":
		case "thunder-rain":
		case "thunder-showers-day":
		case "thunder-showers-night":
			root.removeAttribute("class");
			root.classList.add("rain");
			break;

		default:
			root.removeAttribute("class");
			root.classList.add("default");
			break;
	}
}




export {
	chooseBackground,
}