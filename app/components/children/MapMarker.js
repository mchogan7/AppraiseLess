// Include React
var React = require("react");


var MapMarker = React.createClass({


  render: function() {
    return (
     <div className='mapMarker'>
     {this.props.indexNumber + 1}
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = MapMarker;
