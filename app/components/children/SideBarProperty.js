// Include React
var React = require("react");

var helpers = require("../utils/helpers");


// Creating the Main component
var SideBarProperty = React.createClass({


  render: function() {
    return (
     <div>
        <div>
        {helpers.toTitleCase(this.props.info.address)}
        </div>
        <div>${this.props.info.appraised_val}</div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SideBarProperty;
