/*
Basic class functional UI arrangment of fonts, and icons.

Serves as a way to arrange elements by altering their three.js
parameters.
*/
const THREE = require("three");

var font_loader = new THREE.FontLoader();

class Gauge {
	//TODO: add validations
	//TODO: figure out best way to attach to external input driving the gaugue
	constructor(
		name,
		type="default",
		color="default",
		style="default",
		shape="default",
		icon=null) {
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
	this.type = type
	this.icon = icon
	this.shell = null
	this.fonts = [
		"fonts/helvetiker_regular.typeface.json",
		"fonts/droid_serif_regular.typeface.json"
		]

	// translation
	this.t = [0, 0, 0]
	// rotation
	this.r = [0, 0, 0]
	// scale
	this.s = [1, 1, 1]
	// pivot
	this.p = this.t

	// instantiate primary and secondary 3d fonts
	for (var i = 1; i <= this.fonts.length; i++) {

		font_loader.load( this.fonts[i], function ( font ) {

			this.fonts.push(new THREE.TextGeometry( '00', {
				font: font,
				size: i*25,
				height: i*2,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 2,
				bevelSize: 2,
				bevelOffset: 0,
				bevelSegments: 1
			}))
		});
	}

	// show icon if it was supplied
	if (this.icon) {
		this.show_icon()
	}

	}
	
	show_icon() {
		/*
		Create and show a THREE textured plane with transparency.
		*/
	}
	set_shell(shell_num){
		/*
		Set the shell-layer of this instance and convert to circular type

		@param shell_num: shell-number to set to
		@type: int
		*/
		this.type = "circular"
		this.shell = shell_num

		return this
	}
}

class GaugeGroup {
	constructor(name, children) {
		this.name = name
		this.children = children
		this.shell = null
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

class Icon {
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

export default {Gauge, GaugeGroup, Icon}