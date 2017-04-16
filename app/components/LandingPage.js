// Include React
var React = require("react");

var SearchBar = require("./children/SearchBar");



var LandingPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

    navigateTo: function(){
    this.props.history.push('/resultsPage')
  },

  render: function() {
    return (
     <div className='searchContainer'>
     <img src="./images/AppraiseLessHorz.svg" className='landingLogo'/>
     <h2 className='tagline'>Let us help you lower your property taxes.</h2>
     <SearchBar sendResults={this.props.sendResults} router={this.props.router} nav={this.navigateTo}/>
     <div className='footer'>
     Will put some legal stuff down here. AppraiseLess 2017.
     </div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = LandingPage;
