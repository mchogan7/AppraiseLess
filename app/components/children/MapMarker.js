// Include React
var React = require("react");


var MapMarker = React.createClass({


  render: function() {
    return (
     <div className='mapMarkerContainer'>
     <span className='mapMarkerNumber' style={this.props.color}>{this.props.indexNumber + 1}</span>
     <img src={this.props.marker} className='mapMarker'/>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = MapMarker;
