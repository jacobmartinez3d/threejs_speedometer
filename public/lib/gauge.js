/*
Basic class functional UI arrangment of fonts, and icons.

Serves as a way to arrange elements by altering their three.js
parameters.
*/


export class Gauge {
	//TODO: add validations
	//TODO: figure out best way to attach to external input driving the gaugue
	constructor(name, settings) {
		/*
		@param name: name of gauge
		@type: str
		@param fonts: list of fonts, in order of hierarchy(0-primary,
			1-secondary, etc) for use in this gauge's display
		@type: list
		@param type: type of gaugue
			timeslice	current numerical value
			circular	THREE.RingGeometry-based
			lifebar		horizontal or vertical "liefebar" style
		@type: str
		@param icon: path to img to use as an icon for this gauge
		@type: str
		*/

	this.name = name
	this.settings = settings

	// THREE font instances
	this.__fonts = {}

	// translation
	this.t = [0, 0, 0]
	// rotation
	this.r = [0, 0, 0]
	// scale
	this.s = [1, 1, 1]
	// pivot
	this.p = this.t

	// show icon if it was supplied
	// if (this.settings.icon) {
	// 	this.show_icon()
	// }

	this.__setup()
	}
	
	show_icon() {
		/*
		Create and show a THREE textured plane with transparency.
		*/
	}

	__setup(){
		// instantiate primary and secondary 3d fonts
		this.settings.font_order.forEach( (font_name, i) => { 

			let font_path = this.settings.font_library[font_name]
			
			var font_loader = new THREE.FontLoader();
			font_loader.load(font_path, font => {
				let font_geo = new THREE.TextGeometry( 'Hello three.js!', {
					font: font,
					size: 80,
					height: 5,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 10,
					bevelSize: 8,
					bevelOffset: 0,
					bevelSegments: 5
				})
				this.__fonts[font_name] = font_geo
			});
		})
}
}

export class GaugeGroup {
	constructor(name, children) {
		this.name = name
		this.__children = children || {}
	}
	retrieve_child(child_name) {
		/*
		Return child Gauge instance by name.

		@param child_name: name of Gauge to retrieve
		@type: str
		@returns: Gauge instance 
		*/
	}
	update(...target) {
		/*
		Update values of children Gaugues and update results visually.

		@param target: children to update
		@type: array
		@returns: array of updated children
		*/
	}
	set_shell(shell_num){
		this.shell = shell_num

		return this
	}

}

export class Icon {
	/*
	Wrapper for THREE object to behave as an icon with positional settings.
	*/
	constructor(path, orientation=9) {
		this.path = path
		this.orientation = orientation
	}

	set_position(orientation) {
		/*
		Apply translation settings to the THREE object to reflect orientation

		@param orientation: Clock-style integer representing orientation
		@type: int
		@returns orientation value
		*/
	}
}