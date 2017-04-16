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
        defaultCenter={{lat: 59.95, lng: 30.33}}
        defaultZoom={11}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
      </div>
    );
  }
}
module.exports = SimpleMap;
