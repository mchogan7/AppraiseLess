// Include React
var React = require("react");

var SideBarProperty = require("./SideBarProperty");

// Creating the Main component
var ResultsSideBar = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  render: function() {
  	var results = this.props.results
    return (
     <div className="sideBarContainer">
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
