export default class SpeedometerUI {
	/*

	*/
	constructor(model){
		/*

		*/
		this.model = model
		
		// user settings used for scene initialization
		this.obj_exports_path = "/assets/geo/export/"
		this.textures_settings = {
			"/assets/textures/azMapper.png": {
				name: "gradient",
				wrapS: THREE.RepeatWrapping,
				wrapT: THREE.RepeatWrapping
				// anisotropy: this.renderer.capabilities.getMaxAnisotropy()
			},
			"/assets/textures/gradient.png": {
				name: "gradient",
				wrapS: THREE.RepeatWrapping,
				wrapT: THREE.RepeatWrapping
				// anisotropy: this.renderer.capabilities.getMaxAnisotropy()
			}
		}
		this.materials_settings = {
			"jacobs_mapper": {
				"map": "/assets/textures/azMapper.png"
			},
			"speed_indicator_inset_mat": {
				"map": "/assets/textures/gradient.png"
			}
		}
		this.objs_settings = {
			"speed_indicator_ring.obj": {
				"material": "jacobs_mapper"
			},
			"speed_indicator_inset.obj": {
				"material": "speed_indicator_inset_mat"
			},
			"fuel_gauge_group.obj": {
				"material": "jacobs_mapper"
			},
			"power_gauge_group.obj": {
				"material": "jacobs_mapper"
			},
			"fuel_gauge_group_icon.obj": {
				"material": "jacobs_mapper"
			},
			"power_gauge_group_icon.obj": {
				"material": "jacobs_mapper"
			},
			"drive_state_indicators.obj": {
				"material": "jacobs_mapper"
			},
		}

		// THREE object instances created from user settings
		this.__textures = {}
		this.__materials = {}
		this.__objs = {}
		this.__setup_scene()
			.then(this.__load_textures.bind(this))
			.then(this.__load_materials.bind(this))
			.then(this.__load_objs.bind(this))
			.then(() => {
				window.addEventListener( 'resize', this.__on_window_resize.bind(this), false )
				console.log("Scene Loaded Successfully!")
				this.render()
		})
		
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

	assign_material(object, material) {
		/*
		*/
		object.traverse(child => {
			if (child.isMesh) child.material = material
		})
		return object
	}

	__on_window_resize() {
		/*

		*/
		this.camera.aspect = window.innerWidth / window.innerHeight;

		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.render();
	}

	__load_textures(){
		let promise = new Promise((resolve) => {
			var texture_loader = new THREE.TextureLoader()
			for (var texture_path in this.textures_settings){

				let user_settings = this.textures_settings[texture_path]

				texture_loader.load(texture_path, texture => {
					Object.assign(texture, user_settings)
					this.__textures[texture_path] = texture
				})
			}

			resolve(this.__textures)
		})

		return promise
	}

	__load_materials(){
		let promise = new Promise((resolve) => {
			for (var material_name in this.materials_settings){
				if (typeof this.materials_settings[material_name].map === String) {
					let mat_texture_path = this.materials_settings[material_name].map
					this.materials_settings[material_name].map = this.__textures[mat_texture_path]
				}
				// must set to instance here
				this.materials_settings[material_name].map = this.__textures[this.materials_settings[material_name].map]
				// console.log(this.materials_settings)
				// console.log(this.__textures)
				this.__materials[material_name] = new THREE.MeshStandardMaterial(this.materials_settings[material_name])
			}

			resolve(this.__materials)
		})

		return promise
	}

	__load_objs(){
		let promise = new Promise((resolve) => {
			var obj_loader = new THREE.OBJLoader();
			obj_loader.setPath(this.obj_exports_path);
			var items_processed = 0
			let mesh

			/////////////// load .obj's from settings
			for (var obj_name in this.objs_settings){

				let user_settings = this.objs_settings[obj_name]
				obj_loader.load(obj_name, object => {
					let material = this.__materials[user_settings.material]
					mesh = this.assign_material(object, material)
					this.__objs[obj_name] = mesh
					this.scene.add(mesh)
				})

				if (items_processed === this.objs_settings.length) {
					// force render to happen only after this loop is complete
					this.render()
				}
			}

			resolve(this.__objs)
		})

		return promise
	}
	__setup_scene(){
		/*

		*/
		let promise = new Promise(resolve => {
			// scene
			this.scene = new THREE.Scene();

			// camera
			this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			this.camera.position.z = 10;
			
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

			resolve(true)
		})

		return promise
	}
}	