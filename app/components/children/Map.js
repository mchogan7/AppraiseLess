import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

var MapMarker = require("./MapMarker");

class SimpleMap extends Component {
  // static defaultProps = {
  //   center: {lat: 59.95, lng: 30.33},
  //   zoom: 11
  // };

  render() {
    var sorted = this.props.sorted
    return (
      <div className='mapContainer'>
      <GoogleMapReact
        defaultCenter={{lat: this.props.home.ycoord, lng: this.props.home.xcoord}}
        defaultZoom={15}
      >
        {sorted.search.map(function(result, i) {
                     return (
              <MapMarker key ={result.PROP_ID} indexNumber={i} lat={result.ycoord} lng={result.xcoord}/>
     
            );
          })}

 
      </GoogleMapReact>
      </div>
    );
  }
}
module.exports = SimpleMap;
