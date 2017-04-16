import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  // static defaultProps = {
  //   center: {lat: 59.95, lng: 30.33},
  //   zoom: 11
  // };

  render() {
    return (
      <div className='mapContainer'>
      <GoogleMapReact
        defaultCenter={{lat: 30.45025, lng: -97.63138}}
        defaultZoom={12}
      >
        <AnyReactComponent
          lat={30.45025}
          lng={-97.63138}
          text={'HOOAH'}
        />
      </GoogleMapReact>
      </div>
    );
  }
}
module.exports = SimpleMap;
