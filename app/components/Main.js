// Include React
var React = require("react");

var LandingPage = require("./LandingPage");

// Creating the Main component
var Main = React.createClass({

  getInitialState: function() {
    //this is not used yet.
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
    return (
     <div>
    {this.props.children}
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
