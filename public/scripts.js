const OBJ_EXPORTS = "/assets/geo/export/"
const OBJ_LIST = [
	"speed_indicator_ring.obj",
	"speed_indicator_inset.obj",
	"default_4pill_gauge.obj"]

function setup_scene(){

	// scene
	var scene = new THREE.Scene();

	// camera
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.position.z = 10;

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener( 'change', render );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;

	// lights
	var keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(30, 100%, 75%)"), 1.0);
	keyLight.position.set(-100, 0, 100);

	var fillLight = new THREE.DirectionalLight(new THREE.Color("hsl(240, 100%, 75%)"), 0.75);
	fillLight.position.set(100, 0, 100);

	var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
	backLight.position.set(100, 0, -100).normalize();

	scene.add(keyLight);
	scene.add(fillLight);
	scene.add(backLight);

	// obj loader
	var obj_loader = new THREE.OBJLoader();
	obj_loader.setPath(OBJ_EXPORTS);

	// load each custom obj into the scene
	OBJ_LIST.forEach(obj_file => {
		obj_loader.load(obj_file, (object) => {

		    scene.add(object);

		});
	})

	return [scene, camera, renderer, controls]
}

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

function render() {

	renderer.render( scene, camera );

}

[scene, camera, renderer, controls] = setup_scene();

animate();