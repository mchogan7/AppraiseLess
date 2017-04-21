// Include React
var React = require("react");


var MapMarker = React.createClass({


  render: function() {
    return (
     <div className='mapMarkerContainer'>
     <span className='mapMarkerNumber'>{this.props.indexNumber + 1}</span>
     <img src="./images/BlueMarker.svg" className='mapMarker'/>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = MapMarker;
