// Include React
var React = require("react");

var ReportPage = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

    navigateTo: function(){
    this.props.history.push('/resultsPage')
  },

    handleClick: function(){
      this.navigateTo()
    },

  render: function() {
    return (
     <div className='searchContainer'>
     <h2 className='tagline'>Report Page</h2>
     <div className='testButton' onClick={() => this.handleClick()}>BUTTON</div>

     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ReportPage;
