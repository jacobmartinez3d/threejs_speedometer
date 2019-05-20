# THREE.js Speedometer

This is an example of a basic JavaScript Speedometer with a THREE.js UI implementation.

## Getting Started

These instructions will show you how to get a working version of Speedometer in your browser.

### Prerequisites

Must have installed:
* Node.js

Any other dependencies are included in this repository.

### Installing

You must first install the required dependencies with npm.

1. Open a terminal and navigate to the root of the repository. Then, install dependencies by running:

```
npm install
```

2. Start the node server.

```
npm run start
```

3. Now the server is running and you can see Speedometer in your browser by going to the following address:

```
http://localhost:8080/
```

I have given free control over rotation and zooming in this scene - so go crazy. Try holding the spacebar while interacting with the Speedometer to simulate pushing the gas pedal!

## Design Philosophy

My goal for this concept was not only to meet design specs but also demonstrate how I would implement scene-building workflows similar to those in other 3D production environments. I believe when working with 3D assets it is necessary to streamline the process by mimicking things like proper scene and asset library management, material editor, and grouping.

Speedometer consists of a JavaScript-based model ("public/lib/speedometer.js"), and a THREE.js-based UI (speedometer_ui.js). They are intentionally decoupled for more flexibility for incorporating with larger UI systems.

For the purposes of this demonstration, I have also created a mock environment using both API's together in "public/speedometer_testing_environment.js".

#### Gauges
```
Gauge classes are for storing and handling streamed input data and providing a functional interface for updating UI.
```
The Gauge class is the base building block upon which more complex UI's could be built from. It is intended for handling a single streamed data input source and controlling a single UI element.

#### GaugeGroup
```
Wrapper to centralize data of multiple Gauges.
```
Gives hierarchical and organizational grouping abilities in case multiple data-sources are desired to behave as a single "Presentation" in the UI. An example of a use-case would be an icon which is grouped that should be able to be affected in a different way than a gauge from the same input source.

#### Speedometer
```
/*
Premade Template for a basic speedometer.

Speedometer is itself a GaugeGroup, made up of other Gages and GaugeGroups.
The primary role of speedometer is to take in streamed data update events
(from a vehicle computer for example), update current data with new data, and
ultimately update the UI.
*/
	__setup(){
		/*
		Instantiate all sub Gauges and GaugeGroups for Speedometer
		*/
		var primary_font = this.font_order[0]
		var secondary_font = this.font_order[1]

		// MPH num
		let main_mph_num_gauge = this.add_gauge("main_mph_num", USER_SETTINGS)
		// MPH txt
		let main_mph_txt_gauge = this.add_gauge("main_mph_txt", USER_SETTINGS)
		// MPH GaugeGroup
		this.add_gauge_group("main_mph", [main_mph_num_gauge, main_mph_txt_gauge])

		var icon = new Icon("*path/to/icon1.png*")

		// MPG num
		let main_mpg_num_gauge = this.add_gauge("main_mpg_num_gauge", USER_SETTINGS)
		// MPG txt
		let main_mpg_txt_gauge = this.add_gauge("main_mpg_txt_gauge", USER_SETTINGS)
		// MPG GaugeGroup
		this.add_gauge_group("mpg_indicator_group", [main_mpg_num_gauge, main_mph_txt_gauge])

		// Speed Indicator
		this.speed_indicator_gauge = this.add_gauge("speed_indicator_gauge", USER_SETTINGS)

		// Power Gauge
		let power_gauge = this.add_gauge("power_gauge", USER_SETTINGS)
		// Fuel Gauge
		let fuel_gauge = this.add_gauge("fuel_gauge",USER_SETTINGS)
		// Power, Fuel Indicators Group
		this.add_gauge_group("resources_gauge", [power_gauge, fuel_gauge])
	}
```

Above is an example of how I would simplify the process of building various Gauge-centric controllers. This class inherits from GaugeGroup and is nothing more than a named collection of other Gauges and GaugeGroups.

In this way, various iterations and implementations can be created with minimal effort and with accompanying external settings for quick and easy iteration and editing possibilities down the road. It is intended to mimick a "scene" file of sorts.

#### SpeedometerUI
```
A THREE.js implementation of a UI for Speedometer
```
My UI implementation follows the same design principles as Speedometer - externalize scene settings for easy external management of assets, and in this case begin to mimic the workflow of Maya's "Hypershade" which allows you to treat textures, materials, and meshes
as nodes that can be assigned to each other. With more time I would want to build an
exporter from Maya to allow for optimally fast initial concepts. This is why I design the scene to build itself from externalized settings(which could be what Maya outputs for me in the future).


## Author

* **Jacob Martinez** - *VFX Artist/Engineer* - [magnetic-lab](https://magnetic-lab.com)
