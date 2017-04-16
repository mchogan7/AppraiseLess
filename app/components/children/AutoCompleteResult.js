// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var LandingPage = require("../LandingPage");

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'






var AutoCompleteResult = React.createClass({



  handleClick: function(send, sendResults, nav) {
      helpers.getMainSearch(send).then(function(response) {
          //Sorting the search results in the SQL query is super slow for some reason. Handling it here:
          var results = response.data.sort(function(a, b) {
             return a.appraised_val - b.appraised_val;
            
          })

          console.log(results)
            sendResults(send, results)
            nav()
            
      })
       },




  // Here we describe this component's render method
  render: function() {
    var send = helpers.formatParams(this.props.address)
    return (
            <div className="autoSearchResult" onClick={() => {this.handleClick(send, this.props.sendResults, this.props.nav);}}>
            <div className='autoResultHolder'>
            <img src="./images/ArrowWlead.svg" className='autoResultArrow'/>
            <p className='autoText'>{this.props.address.address}</p>
            </div>
            </div>
    );
  }
});

// Export the component back for use in other files
module.exports = AutoCompleteResult;
