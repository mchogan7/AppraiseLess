import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

var MapMarker = require("./MapMarker");
var HomeMarker = require("./HomeMarker");


class SimpleMap extends Component {

  render() {
    var sorted = this.props.sorted
    return (
      <div className='mapContainer'>
      <GoogleMapReact
        zoom={16}
        center={{lat: this.props.home.ycoord, lng: this.props.home.xcoord}}
        resetBoundsOnResize = {true}
      >

         <HomeMarker indexNumber='home' lat={this.props.home.ycoord} lng={this.props.home.xcoord}/>

           {this.props.tab === 'search' &&
        sorted.search.map(function(result, i) {
                     return (
              <MapMarker key ={result.PROP_ID} 
                        indexNumber={i} 
                        lat={result.ycoord} 
                        lng={result.xcoord}
                        color={{color: 'rgb(255,202,0)'}}
                        marker={"./images/BlueMarker.svg"}/>
     
            );
          })}

                 {this.props.tab === 'saved' &&
        sorted.saved.map(function(result, i) {
                     return (
              <MapMarker key ={result.PROP_ID} 
                         indexNumber={i} 
                         lat={result.ycoord} 
                         lng={result.xcoord}
                         color={{color: 'white'}}
                         marker={"./images/GreenMarker.svg"}/>
     
            );
          })}

 
      </GoogleMapReact>
      </div>
    );
  }
}
module.exports = SimpleMap;
