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

		this._setup_scene()
	}

	_setup_scene(){
		/*

		*/
		// scene
		this.scene = new THREE.Scene();

		// camera
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camera.position.z = 10;

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

		// obj loader
		var obj_loader = new THREE.OBJLoader();
		obj_loader.setPath("/assets/geo/export/");

		// speed_indicator_ring
		this._obj_list.forEach((obj_dict => {

			let obj_name = obj_dict["name"]
			let obj_texture = obj_dict["texture"]

			obj_loader.load(obj_name, (object) => {
					// convert into textured mesh
					this[obj_name] = this.textured_mesh(object, obj_texture)
				    this.scene.add(this[obj_name]);
				});

		}))

	window.addEventListener( 'resize', this.on_window_resize.bind(this), false )
	this.render()

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

	textured_mesh(object, texture_) {
		/*

		*/
		// handle texture arg whether its a str or a texture instance
		let material;
		let result_texture = texture_

		if (typeof texture_ == "string") {
			// create THREE.Texture out of string
			let texture_loader = new THREE.TextureLoader()

			texture_loader.load(texture_, texture => {
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
		
				material = new THREE.MeshBasicMaterial( { map: texture } );
				object.material = material
			})

		} else if (texture_ instanceof THREE.Texture) {
			material = new THREE.MeshBasicMaterial( { map: texture_ })
			object.material = material
		}


		return object
	}

	on_window_resize() {
		/*

		*/
		this.camera.aspect = window.innerWidth / window.innerHeight;

		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.render();
	}

}

speedometer = new SpeedometerUI()