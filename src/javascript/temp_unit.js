function tempUnit(selectedUnit) {
	if (selectedUnit) {
		selectedUnit = "us";
	} 
	else {
		selectedUnit = "metric";
	}
	return selectedUnit;
}


function metricToUs(metricTemp){
	const usTemp = Math.round((metricTemp * 1.8) + 32);
	return usTemp;
}




export {
	tempUnit,
	metricToUs
}