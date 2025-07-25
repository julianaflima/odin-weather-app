

function chooseBackground(icon) {
	console.log('inside chooseBackground');
	const root = document.documentElement;

	console.log(root)

	console.log(icon);
	switch (icon) {
		case "clear-day":
			console.log(icon);
			root.removeAttribute("class");
			root.classList.add("sunny");
			break;
	
		case "cloudy":
		case "fog":
		case "partly-cloudy-day": 
		case "wind":
			console.log(icon);
			root.removeAttribute("class");
			root.classList.add("cloudy");
			break;

		case "clear-night":
		case "partly-cloudy-night":
		case "rain-snow-showers-night":
		case "snow-showers-night":
		case "thunder":
			console.log(icon);
			root.removeAttribute("class");
			root.classList.add("night");
			break;

		case "rain-snow-showers-day":
		case "rain-snow":
		case "sleet":
		case "snow-showers-day":
		case "snow":
			console.log(icon);
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
			console.log(icon);
			root.removeAttribute("class");
			root.classList.add("rain");
			break;

		default:
			console.log(icon);
			root.removeAttribute("class");
			root.classList.add("default");
			break;
	}
}




export {
	chooseBackground,
}