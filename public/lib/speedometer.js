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
		this.__mpg = 0
		this.__fuel = 0.00
		this.__power = 0.00
		this.__acceleration = 0.4
		this.__drive_state_current = "n"
		this.__drive_states = {
			"r": "Reverse",
			"n": "Neutral",
			"d": "Drive",
			"p": "Park",
			"b": "Engine Break"
		}

		this.font_order = USER_SETTINGS.font_order

		this.__setup()
	}
	
	get_mph(){

		return this.mph
	}
	
	update(update_dict){
		Object.assign(this, update_dict)
		// here is where we will update the necessary Gauges
		return this
	}

	__setup(){
		var primary_font = this.font_order[0]
		var secondary_font = this.font_order[1]

		// MPH num
		let main_mph_num_gauge = this.add_gauge("main_mph_num", USER_SETTINGS)
		// MPH txt
		let main_mph_txt_gauge = this.add_gauge("main_mph_txt", USER_SETTINGS)
		// MPH GaugeGroup
		this.add_gauge_group("main_mph", [main_mph_num_gauge, main_mph_txt_gauge])
		
		var icon = new Icon("*path/to/icon1.png*")

		// MPG num
		let main_mpg_num_gauge = this.add_gauge("main_mpg_num_gauge", USER_SETTINGS)
		// MPG txt
		let main_mpg_txt_gauge = this.add_gauge("main_mpg_txt_gauge", USER_SETTINGS)
		// MPG GaugeGroup
		this.add_gauge_group("mpg_indicator_group", [main_mpg_num_gauge, main_mph_txt_gauge])
				
		// Speed Indicator
		this.speed_indicator_gauge = this.add_gauge("speed_indicator_gauge", USER_SETTINGS)
		
		// Power Gauge
		let power_gauge = this.add_gauge("power_gauge", USER_SETTINGS)
		// Fuel Gauge
		let fuel_gauge = this.add_gauge("fuel_gauge",USER_SETTINGS)
		// Power, Fuel Indicators Group
		this.add_gauge_group("resources_gauge", [power_gauge, fuel_gauge])
	}


}