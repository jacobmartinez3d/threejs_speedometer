/*
Gauge classes are for storing and handling streamed input data and providing a functional interface for updating UI.
*/


export class Gauge {
	/*
	Wrapper for data collected from a single streamed input source.
	*/
	constructor(name, settings) {
		/*
		Instantiate this Gauge with given settings.

		@param {String} name name of gauge
		@param {Object} settings JSON object with initial gauge settings
		*/

	this.name = name
	this.settings = settings
	}
	update(new_settings){
		/*
		Update this Gauge instance with new data

		@param new_settings {Object} JSON object with new settings.
		*/
		Object.assign(this.settings, new_settings)
	}
}

export class GaugeGroup {
	/*
	Wrapper to centralize data of multiple Gauges.
	*/
	constructor(name, children) {
		/*
		Instantiate with optional premade gauges

		@param {String} name name of this GagueGroup instance
		@param {Arr} children (optional)Array of Gauge instances to be included as children
		*/
		this.name = name
		this.__children = children || {}
	}
	add_gauge(name, user_settings){
		/*
		Add new Gauge instance as child to this GagueGroup

		@param {String} name name of new Gauge
		@param {Object} user_settings JSON containing initial Gauge settings
		*/
		let gauge = new Gauge(name, user_settings)
		this.__children[name] = gauge
		return gauge
	}
	add_gauge_group(name, children){
		/*
		Add new GaugeGroup instance as child to this GaugeGroup

		@param {String} name name of new GaugeGroup
		@param {Arr} children (optional)child-Gauges to instantiate with 
		*/
		let gauge_group = new GaugeGroup(name, children)
		this.__children[name] = gauge_group
	}
	retrieve_child(target_child_name) {
		/*
		Retrieve child Gauge instance by name.

		@param {String} target_child_name name of Gauge to retrieve
		@returns {Gauge || GaugeGroup}
		*/
		this.__children.forEach((child_name, child_instance) => {

			if (child_name === target_child_name) {
				return child_instance
			}
		})
	}
}

export class Icon extends Gauge {
	/*
	Wrapper for THREE object to behave as an icon with positional settings.
	*/
	constructor(name, settings) {
		super(name, settings)
	}

	update_path(new_path) {
		/*
		Update the img path this icon is sourcing from
		*/
		this.settings.path = new_path
	}
	update_orientaion(new_orientation) {
		/*
		Update the orientation setting for this icon to its parent

		orientation can be "l" (left), "r" (right), "t" (top), "b" (bottom)
		*/
		this.settings.orientation = new_orientation
	}
}