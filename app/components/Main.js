// Include React
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
 
 import { withRouter } from 'react-router'



var LandingPage = require("./LandingPage");
var ResultsPage = require("./ResultsPage");

// Main component. All data is passed through here.
var Main = React.createClass({

  getInitialState: function() {
    return { home: {}, 
            searchResults: [],
            searchCounter: 0,
            storeCounter: 0,
            savedCounter: 0,
            dismissedCounter: 0 };
  }, 

  //This function is passed as a prop to the landing page. It sets the home values and search results.
  sendSearchResults: function(home, results) {
  this.setState({
      home: home,
      searchResults: results});
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.searchCounter < 10) {
       for (var i = 0; i < this.state.searchResults.length; i++) {
           if (this.state.searchResults[i].status === "store" ) {
              this.state.searchResults[i].status = "search";
              this.setState({searchCounter: (this.state.searchCounter + 1)});
              if (this.state.searchCounter === 10) {i=this.state.searchResults.length};
           }
       }
    }
  },

  render: function() {
    return (
      <Router>
        <div>
          <Redirect to="/home"/>
          <Switch>
            {/* This is the main routes setup. You can pass props in the component after the render statement.*/}

            {/* Route for the landing page.*/}
            <Route path='/home' render={(props) => (
            <LandingPage sendResults={this.sendSearchResults} nav={this.navigateTo} {...props} />
            )} />

            {/* Route for the results page. The map and selection bar will be within this component*/}
            <Route path='/resultsPage' render={(props) => (
            <ResultsPage results={this.state.searchResults} 
                       home={this.state.home} {...props}
                       sendResults={this.sendSearchResults}
                       nav={this.navigateTo}
                        />
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
