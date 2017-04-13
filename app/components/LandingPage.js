// Include React
var React = require("react");

var SearchBar = require("./children/SearchBar");

// Creating the Main component
var LandingPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

    navigateTo: function(){
    this.props.history.push('/resultsPage')
  },

  render: function() {
    return (
     <div>
     <SearchBar sendResults={this.props.sendResults} router={this.props.router} nav={this.navigateTo}/>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = LandingPage;
