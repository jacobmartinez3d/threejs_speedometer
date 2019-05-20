import SpeedometerUI from "/speedometer_ui.js";
import Speedometer from "/lib/speedometer.js";

var speedometer = new Speedometer("TRI-AD_Speedometer_Test")
var ui = new SpeedometerUI()

console.log(speedometer)
console.log(ui)

// simulated data from vehicle
var sb_pressed = false
var simulated_accerleration = 0.4
var simulated_gas = 1
var simulated_mph = 0

// animation
var driving_animation

document.body.onkeydown = function(e){
    if (e.keyCode == 32 && sb_pressed == false){
    	if (driving_animation){
			clearInterval(driving_animation)
		}
		simulated_gas = 1
		driving_animation = setInterval(drive, 100)
        sb_pressed = true
    }
}

document.body.onkeyup = function(e){
    if (e.keyCode == 32 && sb_pressed == true){
    	simulated_gas = -2
        sb_pressed = false
    }
}

function drive(){
	simulated_mph = simulated_mph + simulated_accerleration * simulated_gas

	if (simulated_mph <= 0) {
		clearInterval(driving_animation)
		simulated_mph = 0
	}

	speedometer.update({
		__mph: simulated_mph
	})
	
	console.log("driving at", speedometer.get_mph())
}