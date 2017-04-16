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



  handleClick: function(send, sendResults, nav, location, reset, blackout) {
      helpers.getMainSearch(send).then(function(response) {
          //Sorting the search results in the SQL query is super slow for some reason. Handling it here:
          var results = response.data.sort(function(a, b) {
             return a.appraised_val - b.appraised_val;
            
          })

          console.log(results)
            sendResults(send, results)
            if (!location){nav()}
            //This handles the behavior if it is on the results page.
            if (location === 'results'){
              reset()
              blackout(false)

            }
            
      })
       },




  // Here we describe this component's render method
  render: function() {
    var send = helpers.formatParams(this.props.address)
    var location = this.props.location
    var reset = this.props.reset
    var blackout = this.props.blackout
    return (
            <div className="autoSearchResult" 
            onClick={() => {this.handleClick(send, this.props.sendResults, this.props.nav, location, reset, blackout);}}>
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
