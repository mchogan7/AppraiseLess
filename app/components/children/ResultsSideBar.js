// Include React
var React = require("react");

var SideBarProperty = require("./SideBarProperty");
var SearchBarResultsPage = require("./SearchBarResultsPage");

// Creating the Main component
var ResultsSideBar = React.createClass({

  getInitialState: function() {
    return { searchActive: false };
  },

  blackify: function(bool){
    this.setState({searchActive: bool})
  },

  clearClick: function(){
    this.blackify(false)
  },

  render: function() {
  	var results = this.props.results
    var sendResults = this.props.sendResults
    return (
     <div className="sideBarContainer">
        {this.state.searchActive &&
        <div className='blackOut' onClick={() => this.clearClick()}></div>
      }
     
      <SearchBarResultsPage sendResults={sendResults} 
                            router={this.props.router} 
                            nav={null} 
                            blackout={this.blackify}
                            searchActive={this.state.searchActive}
                            />
         {results.map(function(result, i) {
                     return (
      
              <SideBarProperty key ={'sideresults' + i} info={result}/>
     
            );
          })}
  
     
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ResultsSideBar;
