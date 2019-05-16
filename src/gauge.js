/*
Basic class functional UI arrangment of fonts, and icons.

Serves as a way to arrange elements by altering their three.js
parameters.
*/
import THREE

var font_loader = new THREE.FontLoader();

class Gague {
	//TODO add validations
	constructor(
		name,
		fonts=[
			"fonts/helvetiker_regular.typeface.json",
			"fonts/droid_serif_regular.typeface.json"],
		type="timeslice",
		icon=null) {

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
		/* Create and show a THREE textured plane with transparency.

		@param icon_index	index of this.icons to show
		@type int
		*/
	}
}

class GaugeGroup {
	constructor(name, ) {

	}
}

class Icon {
	constructor(path, orientation=9) {

		this.path = path
		this.orientation = orientation
	}
}