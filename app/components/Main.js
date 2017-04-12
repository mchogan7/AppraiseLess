// Include React
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

var LandingPage = require("./LandingPage");
var ResultsPage = require("./ResultsPage");

// Main component. All data is passed through here.
var Main = React.createClass({

  getInitialState: function() {
    return { home: {}, 
            searchResults: [] };
  }, 

    //This function is passed as a prop to the landing page. It sets the home values and search results.
    sendSearchResults: function(home, results) {
    this.setState({
        home: home,
        searchResults: results});
  },

  render: function() {
    return (
      <Router>
    <div>
     <Switch>

   {/* This is the main routes setup. You can pass props in the component after the render statement.*/}

 {/* Route for the landing page.*/}
     <Route path='/' render={(props) => (
    <LandingPage sendResults={this.sendSearchResults} {...props} />
    )} />

 {/* Route for the results page. The map and selection bar will be within this component*/}
     <Route path='/resultsPage' render={(props) => (
    <ResultsPage results={this.state.searchResults} home={this.state.home} {...props} />
    )} />

  
       </Switch>
   
   
     </div>
       
       </Router>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
