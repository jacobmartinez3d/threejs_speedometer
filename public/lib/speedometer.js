/*
TODO: come up with a system of exporting uv shell-group data from Maya
	in a way that would allow easy positioning of gradient and other
	targetted dynamic texture-alterations.
*/
import {Gauge, GaugeGroup, Icon} from "./gauge.js";

// demo purposes only. this data would be retrieved from pipeline
const USER_SETTINGS = {
	"font_library": {
		"helvetiker": "../assets/fonts/helvetiker_regular.typeface.json",
		"helvetiker_bold": "../assets/fonts/helvetiker_bold.typeface.json",
		"optimer": "../assets/fonts/optimer_regular.typeface.json",
		"optimer_bold": "../assets/fonts/optimer_bold.typeface.json",
		"gentilis": "../assets/fonts/gentilis_regular.typeface.json",
		"gentilis_bold": "../assets/fonts/gentilis_bold.typeface.json",
		"droid_sans": "../assets/fonts/droid/droid_sans_regular.typeface.json",
		"droid_sans_bold": "../assets/fonts/droid/droid_sans_bold.typeface.json",
		"droid_serif": "../assets/fonts/droid/droid_serif_regular.typeface.json",
		"droid_serif_bold": "../assets/fonts/droid/droid_serif_bold.typeface.json"
	},
	"font_order": ["droid_sans_bold", "helvetiker"]
}

export default class Speedometer extends GaugeGroup {
	/*
	A GaugeGroup template for a basic speedometer.
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

		this.font_order = USER_SETTINGS.font_order

		this.__setup()
	}

	__setup(){
		var primary_font = this.font_order[0]
		var secondary_font = this.font_order[1]
		// MPH num
		this.main_mph_num_gauge = new Gauge("main_mph_num", USER_SETTINGS)
		// MPH txt
		this.main_mph_txt_gauge = new Gauge("main_mph_txt", USER_SETTINGS)
		// MPH GaugeGroup
		this.main_mph_gauge_group = new GaugeGroup(
			"main_mph",
			[this.main_mph_num_gauge, this.main_mph_txt_gauge])
		

		var icon = new Icon("*path/to/icon1.png*")
		// MPG num
		this.main_mpg_num_gauge = this.add_gauge("main_mpg_num_gauge", USER_SETTINGS)
		// MPG txt
		this.main_mpg_txt_gauge = new Gauge("main_mpg_txt_gauge", USER_SETTINGS)
		// MPG GaugeGroup
		this.mpg_indicator_group = new GaugeGroup(
			"mpg_indicator_group",
			[this.main_mpg_num_gauge, this.main_mph_txt_gauge])
				
		//shell 0: Speed Indicator
		this.speed_indicator_gauge = new Gauge(
			"speed_indicator_gauge", USER_SETTINGS)
		// Power Gauge
		this.power_gauge = new Gauge(
			"power_gauge",
			USER_SETTINGS)
		// Fuel Gauge
		this.fuel_gauge = new Gauge(
			"fuel_gauge",
			USER_SETTINGS
			)
		//shell 1: Power, Fuel Indicators Group
		this.resources_gauge = new GaugeGroup(
			"resources_gauge",
			[this.power_gauge, this.fuel_gauge]
			)
	}

	add_gauge(name, user_settings){

		let gauge = new Gauge(name, user_settings)
		this.__children[name] = gauge
		return gauge
	}

	update(update_dict){

		Object.keys(update_dict).forEach((key) => {
			this[key] = update_dict[key]
		})
	}

	add_mph_indicator(threejs_font) {

		this.add_mph_indicator.push(threejs_font)
	}

}