import {Gauge, GaugeGroup, Icon} from "./gauge.js";

class Speedometer extends GaugeGroup {
	/*
	A GaugeGroup template for a basic speedometer.

	Since a speedometer is circular in nature the Gauges are organized
	by "shell" layers outside of the center circle.
	*/
	constructor(name, children) {
		super(name, children)
		// UI properties
		this.mph = 0
		this.mpg = 0
		this.fuel = 0.00
		this.power = 0.00
		this.drive_state_current = "n"
		this.drive_states = {
			"r": "Reverse",
			"n": "Neutral",
			"d": "Drive",
			"p": "Park",
			"b": "Engine Break"
		}

		this.__setup()
	}

	__setup(){
		// MPH num
		this.main_mph_num_gauge = new Gauge("main_mph_num", this.fonts[0])
		// MPH txt
		this.main_mph_txt_gauge = new Gauge("main_mph_txt", this.fonts[0])
		// MPH GaugeGroup
		this.main_mph_gauge_group = new GaugeGroup(
			"main_mph",
			[this.main_mph_num_gauge, this.main_mph_txt_gauge])
		

		var icon = new Icon("*path/to/icon1.png*")
		// MPG num
		this.main_mpg_num_gauge = new Gauge("main_mpg_num", icon)
		// MPG txt
		this.main_mpg_txt_gauge = new Gauge("main_mpg_tx")
		// MPG GaugeGroup
		this.mpg_indicator_group = new GaugeGroup(
			"main_mpg",
			[this.main_mpg_num_gauge, this.main_mph_txt_gauge])
				
		//shell 0: Speed Indicator
		this.speed_indicator_gauge = new Gauge(
			"speed_indicator",
			"lifebar",
			"ice",
			"gradient_wing",
			"circular")
		// Power Gauge
		this.power_gauge = new Gauge(
			"power_gauge",
			"lifebar",
			"blue",
			"perforrated",
			"circular"
			)
		// Fuel Gauge
		this.fuel_gauge = new Gauge(
			"fuel_gauge",
			"lifebar",
			"turquoise",
			"perforrated",
			"circular"
			)
		//shell 1: Power, Fuel Indicators Group
		this.resources_gauge = new GaugeGroup(
			"resouces_lifebars",
			[this.power_gauge, this.fuel_gauge]
			)

		// shells are the circular GagueGroups radiating from center
		this.shells = []
		this.add_shell(
			this.speed_indicator_gauge	
			)
	}

	update(update_dict){

		Object.keys(update_dict).forEach((key) => {
			this[key] = update_dict[key]
		})
	}

	add_shell(gauge_obj) {
		/*
		Append Gauge or GaugeGroup to new shell.
		*/
		let shell_num = this.shells.length
		this.shells.push(gauge_obj.set_shell(shell_num))

		return gauge_obj
	}

	add_mph_indicator(threejs_font) {

		this.add_mph_indicator.push(threejs_font)
	}

}

export default Speedometer