// Include React
var React = require("react");


// Creating the Main component
var ResultsPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
  	console.log(this.props)
    return (
     <div>
     WORKING!
  
     
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ResultsPage;
