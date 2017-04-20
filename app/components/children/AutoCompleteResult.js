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



  handleClick: function(send, sendResults, nav, location, reset, blackout, home) {
      helpers.getMainSearch(send).then(function(response) {
        
          //Sorting the search results in the SQL query is super slow for some reason. Handling it here:
          var results = response.data.sort(function(a, b) {
             return a.appraised_val - b.appraised_val;
            
          })

          for (var i = 0; i < results.length; i++) {
            results[i].status = 'store'
            //Each property will only have 1 set of land/building values.
            if(results[i].imprv_hstd_val > results[i].imprv_non_hstd_val){
              results[i].building = results[i].imprv_hstd_val 
            } else {
              results[i].building = results[i].imprv_non_hstd_val 
            }

              if(results[i].land_hstd_val > results[i].land_non_hstd_val){
              results[i].land = results[i].land_hstd_val
            } else {
              results[i].land = results[i].land_non_hstd_val 
            }

        }
            
            sendResults(home, results)
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
    var home = this.props.address
    var location = this.props.location
    var reset = this.props.reset
    var blackout = this.props.blackout
    return (
            <div className="autoSearchResult" 
            onClick={() => {this.handleClick(send, this.props.sendResults, this.props.nav, location, reset, blackout, home);}}>
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
