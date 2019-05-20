/*
Premade Template for a basic speedometer.

Speedometer is itself a GaugeGroup, made up of other Gages and GaugeGroups.
The primary role of speedometer is to take in streamed data update events
(from a vehicle computer for example), update current data with new data, and
ultimately update the UI.
*/
import {Gauge, GaugeGroup, Icon} from "./gauge.js";

// demo purposes only. this data would be retrieved externally
// these settings are used as a default for each Gauge instantiated below
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
	A Centralized access point for a collection of speedometer-Gauges.
	*/
	constructor(name, children) {
		/*
		Initialize instance with defaults

		@param {String} name name of this Speedometer instance
		@param {Arr} children (optional)premade Gauge instances to instantiate with 
		*/
		super(name, children)
		// values to to be synced with UI:
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
		// establish a primary-secondary font family relationship for font defaults
		this.font_order = USER_SETTINGS.font_order

		this.__setup()
	}
	
	get_mph(){
		/*
		Retrieve current mph value
		*/
		return this.mph
	}

	update(update_dict){
		/*
		Update this instance with new data

		@param update_dict {Object} JSON object with new properties and values.
		*/
		Object.assign(this, update_dict)
		return this
	}

	__setup(){
		/*
		
		*/
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