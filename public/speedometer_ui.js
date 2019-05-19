//TODO should load this from a config.json
const OBJ_EXPORTS = "/assets/geo/export/"
const OBJ_LIST = [
	{
		name: "speed_indicator_ring.obj",
		texture: "/assets/textures/azMapper.jpg"
	},
	{
		name: "speed_indicator_inset.obj",
		texture: "/assets/textures/azMapper.jpg"
	},
	{
		name: "fuel_gauge_group.obj",
		texture: "/assets/textures/azMapper.jpg"
	},
	{
		name: "power_gauge_group.obj",
		texture: "/assets/textures/azMapper.jpg"
	},
	{
		name: "fuel_gauge_group_icon.obj",
		texture: "/assets/textures/azMapper.jpg"
	},
	{
		name: "power_gauge_group_icon.obj",
		texture: "/assets/textures/azMapper.jpg"
	},
	{
		name: "drive_state_indicators.obj",
		texture: "/assets/textures/azMapper.jpg"
	}]
CONFIG = {

}

class SpeedometerUI {
	/*

	*/
	constructor(model){
		/*

		*/
		this.model = model
		this._obj_list = OBJ_LIST

		this.__setup_scene()
	}


	render() {
		/*

		*/
		this.renderer.render( this.scene, this.camera );

	}

	update() {
		/*

		*/
		this.controls.update();
		this.render();
	}

	update_uv_transform() {
		/*

		var texture = mesh.material.map;

		texture.offset.set( API.mph_value, 0 );

		render();
		*/
	}


	__on_window_resize() {
		/*

		*/
		this.camera.aspect = window.innerWidth / window.innerHeight;

		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.render();
	}

	__setup_scene(){
		/*

		*/
		// scene
		this.scene = new THREE.Scene();

		// camera
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camera.position.z = 10;


		// load all custom .obj's
		var obj_loader = new THREE.OBJLoader();
		obj_loader.setPath(OBJ_EXPORTS);
		
		var items_processed = 0

		var material = new THREE.MeshStandardMaterial({
			wireframe: true,
			opacity: 0.25,
			transparent: true
		});

		obj_loader.load("speed_indicator_ring.obj", object => {
			var texture_loader = new THREE.TextureLoader()

			texture_loader.load("assets/textures/azMapper.jpg", map => {
				// map settings
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
				material.map = map
				object.material = material

				object.traverse( function ( child ) {

					if ( child.isMesh ) child.material.map = map;

				} );

				this.scene.add(object)
				this.render()
			})
		})

		// this._obj_list.forEach(obj_dict => {
		// 	// use each obj_dict to load .obj model and assign associated texture
		// 	var obj_name = obj_dict["name"]

		// 	obj_loader.load(obj_name, object => {
		// 		// create textured THREE.Mesh object and bind directly to 'this' as a property
		// 		// thus, it is treated directly as our UI element implementation
		// 		this[obj_name] = this.textured_mesh(object, obj_dict, mesh => {
		// 			// callback to run after texture is fully loaded
		// 			console.log("adding", mesh, "to scene")
		// 			this.scene.add(mesh)
		// 			items_processed++;

		// 			if (items_processed === this._obj_list.length) {
		// 				// force render to happen only after this loop is complete
		// 				this.render()
		// 				window.addEventListener( 'resize', this.__on_window_resize.bind(this), false )			
		// 				}
		// 			return mesh
		// 			})
		// 		});
		// })

		// lights
		this.keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(30, 100%, 75%)"), 1.0);
		this.keyLight.position.set(-100, 0, 100);

		this.fillLight = new THREE.DirectionalLight(new THREE.Color("hsl(240, 100%, 75%)"), 0.75);
		this.fillLight.position.set(100, 0, 100);

		this.backLight = new THREE.DirectionalLight(0xffffff, 1.0);
		this.backLight.position.set(100, 0, -100).normalize();

		this.scene.add(this.keyLight);
		this.scene.add(this.fillLight);
		this.scene.add(this.backLight);

		// renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( this.renderer.domElement );
		
		// controls
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.addEventListener( 'change', this.render.bind(this) );
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = true;

	}

	// textured_mesh(object, obj_dict, callback) {
	// 	/*

	// 	*/
	// 	var name = obj_dict["name"]
	// 	var texture = obj_dict["texture"]

	// 	var material = new THREE.MeshStandardMaterial({
	// 				wireframe: true,
	// 				opacity: 0.25,
	// 				transparent: true
	// 			});
	// 	// create THREE.Texture out of string
	// 	var texture_loader = new THREE.TextureLoader()

	// 	texture_loader.load(texture, map => {
	// 		// map settings
	// 		map.wrapS = map.wrapT = THREE.RepeatWrapping;
	// 		map.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
	// 		material.map = map
	// 		material.needsUpdate = true
	// 		console.log("setting", material, "to", object)
	// 		object.material = material
	// 		return callback(object)
	// 	})
	// }
}

speedometer = new SpeedometerUI()