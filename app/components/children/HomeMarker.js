// Include React
var React = require("react");


var HomeMarker = React.createClass({


  render: function() {
    return (
     <div className='mapMarkerContainer'>
     <img src="./images/WhiteHouse.svg" className='mapHomeMarker'/>
     <img src="./images/GreenMarker.svg" className='mapMarker'/>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = HomeMarker;
