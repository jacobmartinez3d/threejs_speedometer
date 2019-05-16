import THREE
import {Gaugue, GaugeGroup, Icon} from "./gauge.js"

class speedometer extends GaugeGroup {
	/*
	A GaugeGroup template for a basic speedometer.

	Since a speedometer is circular in nature the Gauges are organized
	by "shell" layers outside of the center circle.
	*/
	constructor() {

		this.mph_number_indicator = [new GaugeGroup("main_mph",
			Gauge("main_mpg_num", this.fonts[0]),
			Gauge("main_mpg_txt", this.fonts[0])
			)]

		// use secondary font here
		this.mpg_indicator = [
			new GaugeGroup("main_mpg",
				// icon attached to the "mpg" number
				Gauge("main_mph_num", this.fonts[1], icon = new Icon("*path/to/icon1.png*")),
				Gauge("main_mph_txt", this.fonts[1])
			)]

		// shells are the circular GagueGroups radiating from center
		this.shells = [
			Gauge("speed_indicator",
				type="lifebar",
				style="gradient_wing",
				color="ice",
				shape="circular"),
			GaugeGroup("resouces_lifebars",
				Gauge("power_gauge",
					type="lifebar",
					style="perforrated")
					color="blue",
					shape="circular"
					),
				Gauge("fuel_gauge",
					type="lifebar",
					style="perforrated")
					color="turquoise",
					shape="circular"
					)
		]

	}

	create() {
		// mph number indicator
		this.mph_number_indicator[0].translate.x(0)  // set to number
		this.mph_number_indicator[0].translate.y(0)  // set to number
		this.mph_number_indicator[0].translate.z(0)  // set to number

		// mph text-label indicator
		this.mph_text_indicator[0].translate.x(0)  // set to text
		this.mph_text_indicator[0].translate.y(
			this.mph_number_indicator[0].par.y/2)  // set to text
		this.mph_text_indicator[0].translate.z(0)  // set to text

		this.mpg
	}

	update() {
		// Set new properties and update UI elements to reflect.
	}
	add_mph_indicator(threejs_font) {
		this.add_mph_indicator.push(threejs_font)
	}
}