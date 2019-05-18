import React, { Component } from 'react';
import './Speedometer_UI.css';
import { Speedometer } from './speedometer.js';


class SpeedometerUI extends Component {

  render() {

    var speedometer = new Speedometer("test_speedometer")
    return (
        <div>
        { speedometer.mph }
        </div>
    );
  }
}

export default SpeedometerUI;
