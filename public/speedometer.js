var mesh, renderer, scene, camera;

var gui;

var API = {
	mph_value: 0
};

init();

function init() {

	// set up renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// set up scene
	scene = new THREE.Scene();

	// set up camera
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 10, 15, 25 );
	scene.add( camera );

	// set up controls and apply them to camera and render-area
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
	controls.minDistance = 20;
	controls.maxDistance = 50;
	controls.maxPolarAngle = Math.PI / 2;

	// set up geometry
	var obj_loader = new THREE.OBJLoader();
	var speed_indicator_ring_geo;
	obj_loader.setPath("assets/geo/")
	obj_loader.load("speed_indicator_ring.obj", (object) => {
		speed_indicator_ring_geo = object
	})

	new THREE.TextureLoader().load( 'assets/textures/UV_Grid_Sm.jpg', function ( texture ) {

		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

		//texture.matrixAutoUpdate = false; // default true; set to false to update texture.matrix manually

		var material = new THREE.MeshBasicMaterial( { map: texture } );

		mesh = new THREE.Mesh( speed_indicator_ring_geo, material );
		scene.add( mesh );

		update_uv_transform();

		init_gui();

		render();

	} );

	window.addEventListener( 'resize', on_window_resize, false );

}

function render() {

	renderer.render( scene, camera );

}

function on_window_resize() {

	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function update_uv_transform() {

	var texture = mesh.material.map;

	texture.offset.set( API.mph_value, 0 );

	render();
}

function init_gui() {

	gui = new dat.GUI();
	// add ui components and set ranges
	gui.add( API, 'mph_value', 0.0, 100.0 ).name( 'MPH' ).onChange( update_uv_transform );
}