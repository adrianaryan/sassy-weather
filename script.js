//const apiKey = "c0fff48255974fe650f9128b85c18529"


const londonURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=c0fff48255974fe650f9128b85c18529&units=imperial"
const seattleURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=47.6762&lon=-122.3182&units=imperial&APPID=c0fff48255974fe650f9128b85c18529"

window.onload = function() {
	console.log("It Works!")
}

function getSeattleWeather() {
	document.getElementById("showWeather").innerHTML = ""
	console.log("clicked on Seattle")


	let h4 = document.createElement("h4")
	h4.innerHTML = "Today in Seattle:"
	document.getElementById("showWeather").appendChild(h4)


	let request = new XMLHttpRequest()

	request.open("GET", seattleURL, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function getLondonWeather() {
	document.getElementById("showWeather").innerHTML = ""
	console.log("clicked on London")

	let h4 = document.createElement("h4")
	h4.innerHTML = "Today in London:"
	document.getElementById("showWeather").appendChild(h4)


	let request = new XMLHttpRequest()
	request.open("GET", londonURL, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function onLoadFunc() {
	const resp = JSON.parse(this.response)
	console.log("RESPONSE")
	printListItem("Conditions: " + resp.weather[0].main)
	printListItem("Current Temperature: " + resp.main.temp + " °F")
	printListItem("Max Temperature Today: " + resp.main.temp_max + " °F")
	printListItem("Min Temperature Today: " + resp.main.temp_min + " °F")
}

function onerrorFunc() {
	console.log("Erorrrrrrrr")
}

function printListItem(message) {
	let p = document.createElement("p")
	p.innerHTML = message
	document.getElementById("showWeather").appendChild(p)
}

function getUsersWeather() {
	document.getElementById("showWeather").innerHTML = ""
	console.log("clicked Current Location's Weather")
	let h4 = document.createElement("h4")
	h4.innerHTML = "Current weather report on your area:"
	document.getElementById("showWeather").appendChild(h4)

	navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError)
}

function geolocSuccess(position) {
	const newPos = {lat: position.coords.latitude, lng: position.coords.longitude}
	console.log(newPos)
	getLocation(newPos)
}

function geolocError() {
	console.log("Error getting user's location.")
}

function getLocation(locObj) {
	let mapUri = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lng}&units=imperial&APPID=c0fff48255974fe650f9128b85c18529`
	console.log(mapUri)
	let request = new XMLHttpRequest()
	request.open("GET", mapUri, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}
