// Include React
var React = require("react");

var SearchBar = require("./children/SearchBar");

// Creating the Main component
var LandingPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
    return (
     <div>
     <SearchBar/>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = LandingPage;
