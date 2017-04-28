///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                     Google Maps Component                         //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: ResultsPage.js

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
var MapMarker = require("./MapMarker");
var HomeMarker = require("./HomeMarker");

class SimpleMap extends Component {

  render() {
    //sorted will contain an array of 100 property objects, passed here as props
    var sorted = this.props.sorted
    return (
      <div className='mapContainer'>
        {/* This is the Map component */}
        <GoogleMapReact
          zoom={16}
          center={{lat: this.props.home.ycoord, lng: this.props.home.xcoord}}
          resetBoundsOnResize = {true}
        >
          {/* This is the Home marker */}
          <HomeMarker indexNumber='home' lat={this.props.home.ycoord} lng={this.props.home.xcoord}/>

          {/* Here, we create the numbered map markers for the "search" properties */}
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
            }
          )}

          {/* Here, we create the numbered map markers for the "saved" properties */}
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
            }
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

module.exports = SimpleMap;