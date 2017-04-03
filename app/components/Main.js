// Include React
var React = require("react");

// Creating the Main component
var Main = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
    return (
     <h1>Let's do this</h1>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
