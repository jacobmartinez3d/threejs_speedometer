export default class SpeedometerUI {
	/*
	A THREE.js implementation of a UI for Speedometer
	*/
	constructor(){
		/*
		Instantiate with external scene settings, and build/render THREE.js scene

		The idea of the texture/materials/objs settings below is to mimick Maya's Hypershade where one could have a
		premade library of 'shaders' that would re-instantiate themselves on SpeedometerUI's init.
		*/
		this.mph = 0

		// (demo purposes only. Below data would be retrieved externally)
		// scene settings used for scene initialization
		this.obj_exports_path = "/assets/geo/export/"
		this.textures_settings = {
			"/assets/textures/gradient.png": {
				name: "gradient",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/ring.png": {
				name: "ring",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/azMapper.png": {
				name: "azMapper",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/power_icon.png": {
				name: "power_icon",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/resources_icon.png": {
				name: "resources_icon",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/resources_gauge_color.png": {
				name: "resources_gauge_color",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/power_gauge_color.png": {
				name: "power_gauge_color",
				wrapT: THREE.RepeatWrapping
			},
			"/assets/textures/drive_state_indicators.png": {
				name: "drive_state_indicators",
				wrapT: THREE.RepeatWrapping
			},

		}
		this.materials_settings = {
			"speed_indicator_inset_mat": {
				"map": "/assets/textures/gradient.png"
			},
			"speed_indicator_ring_mat": {
				"map": "/assets/textures/ring.png"
			},
			"azMapper": {
				"map": "/assets/textures/azMapper.png"
			},
			"power_icon": {
				"map": "/assets/textures/power_icon.png"
			},
			"resources_icon": {
				"map": "/assets/textures/resources_icon.png"
			},
			"resources_gauge_color": {
				"map": "/assets/textures/resources_gauge_color.png"
			},
			"power_gauge_color": {
				"map": "/assets/textures/power_gauge_color.png"
			},
			"drive_state_indicators": {
				"map": "/assets/textures/drive_state_indicators.png"
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
				"material": "resources_gauge_color"
			},
			"power_gauge_group.obj": {
				"material": "power_gauge_color"
			},
			"fuel_gauge_group_icon.obj": {
				"material": "resources_icon"
			},
			"power_gauge_group_icon.obj": {
				"material": "power_icon"
			},
			"drive_state_indicators.obj": {
				"material": "drive_state_indicators"
			},
		}
		this.text_geos_settings = {
			"mph_num": {
				"translate": {"x": -1.3, "y": 0, "z": -.03}
			},
			"mph_text": {
				"translate": {"x": -.7, "y": -1, "z": 0}
			}
		}

		// all instantiated THREE.js resources stored here
		this.__textures = {}
		this.__materials = {}
		this.__objs = {}
		this.__text_geos = {}

		// promise daisy-chain to ensure dependencies are respected when re-instantiating from scene-settings
		this.__setup_scene()
			.then(this.__load_textures.bind(this))
			.then(this.__load_materials.bind(this))
			.then(this.__update_mph_text.bind(this))
			.then(this.__load_objs.bind(this))
			.then(() => {
				this.render()
				console.log("Scene Loaded Successfully!")
		})
		
		window.addEventListener( 'resize', this.__on_window_resize.bind(this), false )
	}

	render() {
		/*
		Force scene to re-render
		*/
		this.renderer.render( this.scene, this.camera );
	}

	update() {
		/*
		Update controls and force re-render
		*/
		this.controls.update();
		this.render();
	}

	set_mph(mph) {
		/*
		Set mph value and update any associated elements in the scene.

		@param {Int} mph new MPH value to set
		*/
		this.mph = mph
		let translate = mph/100
		this.__translate_texture(this.__textures["/assets/textures/gradient.png"], translate)
		
		// replace text geo
		this.scene.remove(this.__text_geos.mph_num)

		var loader = new THREE.FontLoader();

		this.__update_mph_text().then(() => {
			this.scene.add(this.__text_geos.mph_num)
			this.render()
		})
	}

	translate(object, vector3) {
		/*
		Apply translation values to a mesh

		@param {THREE.Mesh} object mesh to apply translations to
		@param {vector3} vector3 x, y, z values to set
		*/
		object.translateX(vector3.x)
		object.translateY(vector3.y)
		object.translateZ(vector3.z)
	}

	__translate_texture(texture, translate) {
		/*
		Translate/offset texture vertically for sweeping-effect

		@param {THREE.Texture} texture Texture instance to translate
		@param {Int} translate 0-1 position value
		*/
		texture.offset.set( 0, translate*-1 );
		this.render();
	}

	assign_material(object, material) {
		/*
		Assign material to an object correctly in case it is a Group object.

		@param {THREE.Mesh || THREE.Group} object mesh object instance to assign material to
		@param {THREE.Material} material material instance to assign
		*/
		object.traverse(child => {
			if (child.isMesh) child.material = material
		})
		return object
	}

	__on_window_resize() {
		/*
		Resize scene to browser window automatically on resizing
		*/
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.render();
	}

	__load_textures() {
		/*
		Instantiate a THREE.Texture instance for each scene-settings entry
		*/
		console.log("loading textures...")
		let promise = new Promise((resolve) => {

			var texture_loader = new THREE.TextureLoader()
			let items_processed = 0
			var textures_arr = Object.keys(this.textures_settings)
			for (var texture_path_index in textures_arr){

				console.log("texture_path_index", texture_path_index)

				var texture_path = textures_arr[texture_path_index]
				console.log(texture_path)
.
				this.__textures[texture_path] = texture_loader.load(texture_path)

				console.log(this.__textures[texture_path])
				let user_settings = this.textures_settings[texture_path]
				Object.assign(this.__textures[texture_path], user_settings)

				console.log("texture loaded", texture_path)
				items_processed ++
			}
			return resolve(this.__textures)
		})

		return promise
	}

	__load_materials() {
		/*
		Instantiate a THREE.Material instance for each scene-settings entry
		*/
		console.log("loading materials...")

		let promise = new Promise((resolve) => {
			var materials_arr = Object.keys(this.materials_settings)
			let items_processed = 0
			for (var material_name_index in materials_arr){

				var material_name = materials_arr[material_name_index]

				// this ultimately needs to be a texture instance, so strings get converted here...
				if (typeof this.materials_settings[material_name].map === String) {
					let mat_texture_path = this.materials_settings[material_name].map
					this.materials_settings[material_name].map = this.__textures[mat_texture_path]

				}
				this.materials_settings[material_name].map = this.__textures[this.materials_settings[material_name].map]
				this.__materials[material_name] = new THREE.MeshBasicMaterial(this.materials_settings[material_name])
				this.__materials[material_name].transparent = true
				
				items_processed ++
				if (items_processed >= Object.keys(this.materials_settings).length) {
					resolve(this.__materials)
				}
			}

			resolve(this.__materials)
		})
		return promise
	}

	__load_objs() {
		/*
		Instantiate a THREE.Mesh instance for each scene-settings entry
		*/
		console.log("loading objs...")
		let promise = new Promise((resolve) => {

			let mesh
			var obj_loader = new THREE.OBJLoader();
			obj_loader.setPath(this.obj_exports_path);

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
	
	__update_mph_text() {
		/*
		Update the MPH text by removing the old one and re-insantiating a new one.
		*/
		var loader = new THREE.FontLoader();


		loader.load( 'assets/fonts/helvetiker_regular.typeface.json', ( font ) => {
			let text_geo = new THREE.TextGeometry( parseInt(this.mph.toString()), {
				font: font,
				size: 1.8,
				height: .1,
				curveSegments: 5,
				bevelEnabled: false

			} );
			let name = "mph_num"
			this.__text_geos[name] = new THREE.Mesh(text_geo, this.__materials["speed_indicator_ring_mat"])
			
			this.translate(this.__text_geos[name], this.text_geos_settings[name].translate)
			
			this.scene.add(this.__text_geos[name])
		} );

		name = "mph_text"

		loader.load( 'assets/fonts/helvetiker_regular.typeface.json', ( font ) => {
			let text_geo = new THREE.TextGeometry( "MPH", {
				font: font,
				size: .5,
				height: .08,
				curveSegments: 2,
				bevelEnabled: false
			} );
			this.__text_geos[name] = new THREE.Mesh(text_geo, this.__materials["speed_indicator_ring_mat"])
			
			this.translate(this.__text_geos[name], this.text_geos_settings[name].translate)

			this.scene.add(this.__text_geos[name])
		} );


	}
	
	__setup_scene() {
		/*
		Instantiate base elements for THREE.js scene
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