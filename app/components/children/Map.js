import {
  Map,
  Marker,
  InfoWindow
} from 'google-maps-react';

var React = require("react");

// ...

var Gmap = React.createClass({
getInitialState: function() {
    var selectedPlace = {name:'Austin, TX'};
    return {selectedPlace};
  },

  render: function() {
    return (<Map google={this.props.google} zoom={14}>

  <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

  <InfoWindow onClose={this.onInfoWindowClose}>
      <div>
        <h1>{this.state.selectedPlace.name}</h1>
      </div>
  </InfoWindow>
</Map>)
  }
});

// Export the component back for use in other files
module.exports = Gmap;