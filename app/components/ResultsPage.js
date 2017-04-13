// Include React
var React = require("react");

var ResultsSideBar = require("./children/ResultsSideBar");
// Creating the Main component
var ResultsPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
  	console.log(this.props)
    return (
     <div>
     <ResultsSideBar results = {this.props.results}/>
  
     
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ResultsPage;
