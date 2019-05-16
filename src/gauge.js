/*
Basic class functional UI arrangment of fonts, and icons.

Serves as a way to arrange elements by altering their three.js
parameters.
*/
import THREE

var font_loader = new THREE.FontLoader();

class Gague {
	//TODO: add validations
	//TODO: figure out best way to attach to external input driving the gaugue
	constructor(
		name,
		fonts=[
			"fonts/helvetiker_regular.typeface.json",
			"fonts/droid_serif_regular.typeface.json"],
		type="timeslice",
		icon=null) {
		/*
		types:
			timeslice	current numerical value
			circular	THREE.RingGeometry-based with close-angle setting
			lifebar		horizontal or vertical "liefebar" style
		*/

	this.name = name
	this.fonts = fonts
	this.type = type
	this.icon = icon

	// instantiate primary and secondary 3d fonts
	for (i = 1, i <= 2, i++) {

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

		@param icon_index	index of this.icons to show
		@type int
		*/
	}
}

class GaugeGroup {
	constructor(name, ...children) {
		this.name = name
		this.children = children
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