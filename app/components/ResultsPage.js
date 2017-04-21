// Include React
var React = require("react");

var ResultsSideBar = require("./children/ResultsSideBar");
var GoogleMap = require("./children/Map");


var ResultsPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
    return (
     <div>
     <ResultsSideBar results = {this.props.results}
                     sendResults={this.props.sendResults}
                     nav={this.nav}
                     home={this.props.home}
                     changeStatus={this.props.changeStatus}
                     sorted={this.props.sorted}
                     />
     <GoogleMap sorted={this.props.sorted} 
                home={this.props.home}
                />
     
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ResultsPage;
