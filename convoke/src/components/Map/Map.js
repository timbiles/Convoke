import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './Map.css';

const Marker = props => {
  return (
    <img
      className="map_marker"
      src="https://image.flaticon.com/icons/svg/149/149059.svg"
      alt="Map marker"
    />
  );
};

class Map extends Component {
  constructor() {
    super();

    this.state = {
      center: {
        lat:
          32.735687,
        lng: -97.10806559999997
      },
      zoom: 11
    };
  }

  render() {
    console.log(this.props)
    return (
      <div className="google_map">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.state.zoom}
        >
          <Marker lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
