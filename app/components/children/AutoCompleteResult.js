// Include React
var React = require("react");
var helpers = require("../utils/helpers");




var AutoCompleteResult = React.createClass({

  handleClick: function(send, sendResults) {
      helpers.getMainSearch(send).then(function(response) {
          //Sorting the search results in the SQL query is super slow for some reason. Handling it here:
          var results = response.data.sort(function(a, b) {
              a.appraised_val - b.appraised_val;
            
          })
            console.log(results)
            sendResults(send, results)
      })
       },



  // Here we describe this component's render method
  render: function() {
    var send = helpers.formatParams(this.props.address)
    return (
            <div className="autoSearchResult" onClick={() => {this.handleClick(send, this.props.sendResults);}}>
            <p>{this.props.address.address}</p>
            <p>{this.props.address.xcoord}</p>
            </div>
    );
  }
});

// Export the component back for use in other files
module.exports = AutoCompleteResult;
