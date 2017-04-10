// Include React
var React = require("react");
var helpers = require("../utils/helpers");




var AutoCompleteResult = React.createClass({

  handleClick: function(send){
    helpers.getMainSearch(send)
  },


  // Here we describe this component's render method
  render: function() {
    var send = helpers.formatParams(this.props.address)
    console.log(send)
    return (
            <div className="autoSearchResult" onClick={() => {this.handleClick(send);}}>
            <p>{this.props.address.address}</p>
            <p>{this.props.address.xcoord}</p>
            </div>
    );
  }
});

// Export the component back for use in other files
module.exports = AutoCompleteResult;
