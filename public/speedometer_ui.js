export default class SpeedometerUI {
	/*

	*/
	constructor(){
		/*

		*/
		this.mph = 0
		// user settings used for scene initialization
		this.obj_exports_path = "/assets/geo/export/"
		this.textures_settings = {
			"/assets/textures/gradient.png": {
				name: "gradient",
				wrapT: THREE.RepeatWrapping
				// anisotropy: this.renderer.capabilities.getMaxAnisotropy()
			}
		}
		this.materials_settings = {
			"speed_indicator_inset_mat": {
				"map": "/assets/textures/gradient.png"
			},
			"speed_indicator_ring_mat": {
				"map": "/assets/textures/ring.png"
			}
		}
		this.objs_settings = {
			"speed_indicator_ring.obj": {
				"material": "speed_indicator_ring_mat"
			},
			"speed_indicator_inset.obj": {
				"material": "speed_indicator_inset_mat"
			},
			"fuel_gauge_group.obj": {
				"material": "speed_indicator_inset_mat"
			},
			"power_gauge_group.obj": {
				"material": "speed_indicator_inset_mat"
			},
			"fuel_gauge_group_icon.obj": {
				"material": "speed_indicator_inset_mat"
			},
			"power_gauge_group_icon.obj": {
				"material": "speed_indicator_inset_mat"
			},
			"drive_state_indicators.obj": {
				"material": "speed_indicator_inset_mat"
			},
		}

		// THREE object instances created from user settings
		this.__textures = {}
		this.__materials = {}
		this.__objs = {}
		this.__text_geos = {}

		this.__setup_scene()
			.then(this.__load_textures.bind(this))
			.then(this.__load_materials.bind(this))
			.then(this.__update_mph_text.bind(this))
			.then(this.__load_objs.bind(this))
			.then(() => {
				window.addEventListener( 'resize', this.__on_window_resize.bind(this), false )
				this.render()
				console.log("Scene Loaded Successfully!")
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

	set_mph(mph){
		this.mph = mph
		let translate = mph/100
		this.__translate_texture(this.__textures["/assets/textures/gradient.png"], translate)
		
		// replace text geo
		this.scene.remove(this.__text_geos.mph_num)
		this.__update_mph_text().then(() => {
			this.scene.add(this.__text_geos.mph_num)
			this.render()
		})



	}
	__translate_texture(texture, translate) {
		/*

		*/
		texture.offset.set( 0, translate*-1 );
		this.render();
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
		/*
		*/
		console.log("loading textures...")
		let promise = new Promise((resolve) => {

			var texture_loader = new THREE.TextureLoader()
			let items_processed = 0

			for (var texture_path in this.textures_settings){
				console.log(texture_path)

				// this function is totally out of sync/order... i cant get it to FUCKING WAIT FOR THE LOOP!
				texture_loader.load(texture_path, texture => {
					
					let user_settings = this.textures_settings[texture_path]
					Object.assign(texture, user_settings)
					this.__textures[texture_path] = texture

					items_processed ++
					
					if (items_processed >= Object.keys(this.textures_settings).length) {
						resolve(this.__textures)
					}
				})
			}
		})

		return promise
	}

	__load_materials(){
		/*
		*/
		console.log("loading materials...")
		let promise = new Promise((resolve) => {

			let items_processed = 0
			for (var material_name in this.materials_settings){

				if (typeof this.materials_settings[material_name].map === String) {
					let mat_texture_path = this.materials_settings[material_name].map
					this.materials_settings[material_name].map = this.__textures[mat_texture_path]
				}
				this.materials_settings[material_name].map = this.__textures[this.materials_settings[material_name].map]
				this.__materials[material_name] = new THREE.MeshBasicMaterial(this.materials_settings[material_name])
				
				items_processed ++
				if (items_processed >= Object.keys(this.materials_settings).length) {
					resolve(this.__materials)
				}
			}

			resolve(this.__materials)
		})

		return promise
	}

	__load_objs(){
		console.log("loading objs...")
		let promise = new Promise((resolve) => {

			var obj_loader = new THREE.OBJLoader();
			obj_loader.setPath(this.obj_exports_path);
			let mesh

			let items_processed = 0
			for (var obj_name in this.objs_settings){

				let user_settings = this.objs_settings[obj_name]
				obj_loader.load(obj_name, object => {
					let material = this.__materials[user_settings.material]
					mesh = this.assign_material(object, material)
					this.__objs[obj_name] = mesh
					this.scene.add(mesh)

					if (items_processed >= Object.keys(this.objs_settings).length) {
						// force render to happen only after this loop is complete
						resolve(this.__objs)
					}
				})
			}
		})

		return promise
	}
	
	__update_mph_text(){
		console.log("loading texts...")
		let promise = new Promise((resolve) => {

			var loader = new THREE.FontLoader();

			loader.load( 'assets/fonts/helvetiker_regular.typeface.json', ( font ) => {
				let text_geo = new THREE.TextGeometry( parseInt(this.mph.toString()), {
					font: font,
					size: 1,
					height: .1,
					curveSegments: 2,
					bevelEnabled: false

				} );
				this.__text_geos["mph_num"] = new THREE.Mesh(text_geo, this.__materials["speed_indicator_ring_mat"])
				this.scene.add(this.__text_geos["mph_num"])

				resolve(this.__text_geos["mph_num"])
			} );

			loader.load( 'assets/fonts/helvetiker_regular.typeface.json', ( font ) => {
				let text_geo = new THREE.TextGeometry( "MPH", {
					font: font,
					size: .5,
					height: .08,
					curveSegments: 2,
					bevelEnabled: false
				} );
				this.__text_geos["mph_text"] = new THREE.Mesh(text_geo, this.__materials["speed_indicator_ring_mat"])
				this.scene.add(this.__text_geos["mph_text"])

				resolve(this.__text_geos["mph_text"])
			} );
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