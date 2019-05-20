/*
This script demonstrates how the Speedometer(model) core functionality
is designed to be decoupled and separate from the UI.

I have attempted to mimick receiving streamed input data from an
external source(like a vehicle computer). This input would be recieved
and handled by the Speedometer, then an appropriate response sent to
the UI.
*/

import SpeedometerUI from "/speedometer_ui.js";
import Speedometer from "/lib/speedometer.js";

// import speedometer API
var speedometer = new Speedometer("TRI-AD_Speedometer_Test")
var ui = new SpeedometerUI()

// simulated data from vehicle
var sb_pressed = false
var simulated_accerleration = 0.1
var simulated_gas = 2
var simulated_mph = 0

// animation
var driving_animation

document.body.onkeydown = function(e){
    if (e.keyCode == 32 && sb_pressed == false){
    	if (driving_animation){
			clearInterval(driving_animation)
		}
		simulated_gas = 2
		driving_animation = setInterval(drive, 24)
        sb_pressed = true
    }
}

document.body.onkeyup = function(e){
    if (e.keyCode == 32){
    	simulated_gas = -2
        sb_pressed = false
    }
}

function drive(){
	simulated_mph = simulated_mph + simulated_accerleration * simulated_gas

	if (simulated_mph <= 0) {
		clearInterval(driving_animation)
		simulated_mph = 0
	} else if (simulated_mph >= 100) {
		clearInterval(driving_animation)
		simulated_mph = 100
	}

	// EXAMPLE SPEEDOMETER API USAGE:
	let current_mph = speedometer.update({
		mph: simulated_mph
	}).get_mph()

	// update UI
	ui.set_mph(current_mph)
}                                                           