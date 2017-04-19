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
        	store: [],
        	search: [],
        	saved: [],
        	dismissed: []};
  }, 

  //This function is passed as a prop to the landing page. It sets the home values and search results.
  sendSearchResults: function(home, results) {
  this.setState({
      home: home,
      searchResults: results});
  },

  changeStatus: function (id, newStatus){

      //Grab the search results array so we can modify it.
    var newArray = this.state.searchResults
      
      //Gives the findIndex function a target
      function idMatch(element) {
      return element.PROP_ID === id
      }

      //define the index for readabilty
      var index = newArray.findIndex(idMatch); 

      //update the entry at the found index
      newArray[index].status = newStatus 

      //write the new array as search results
      this.setState({searchResults: newArray})  
      },

  componentDidUpdate: function(prevProps, prevState) {
   //componentDidUpdate()

   //These functions are necessary for array.filter()
   function isStore(value) {
     return value.status === "store";
   };
   function isSearch(value) {
     return value.status === "search";
   };
   function isSaved(value) {
     return value.status === "saved";
   };
   function isDismissed(value) {
     return value.status === "dismissed";
   };

   //Here, we create our variables
   //searchResults[] is merely a copy of this.state.searchResults.
   var searchResults = this.state.searchResults;
   //store[], search[], saved[], and dismissed[] are populated using the .filter() method.
   var store = this.state.searchResults.filter(isStore);
   var search = this.state.searchResults.filter(isSearch);
   var saved = this.state.searchResults.filter(isSaved);
   var dismissed = this.state.searchResults.filter(isDismissed);
   //somethingChanged is marked true if a new search entry must be created
   var somethingChanged = false;


   //Here, we check to see if we need to fill up search[], i.e., if it contains fewer than 10 objects
   //If it does, we take the appropriate number of "store" objects and make them "search" objects
   //This function should work when search[] has zero objects and when it has 9
   if (search.length < 10) {
     somethingChanged = true;
     var i = 10 - search.length;
     console.log("i = " + i);
     while (i > 0) {
       console.log("Pop from store, push to search, swap a status");
       //Go ahead and decrement i
       i--;
       //Pop from store[], push to search[]
       var newSearchEntry = store.pop(); //Should we be using "dequeue" instead of "pop"???
       search.push(newSearchEntry);
       //Find the first "store" object in searchResults[], change its status to "search"
       for (var j = 0; j < searchResults.length; j++) {
         if (searchResults[j].status === "store") {
           searchResults[j].status = "search";
           j = searchResults.length;
         }
       }
     }
   }

   console.log("somethingChanged = " + somethingChanged);
   console.log("searchResults, store, search, saved, and dismissed...");
   console.log(searchResults);
   console.log(store);
   console.log(search);
   console.log(saved);
   console.log(dismissed);


   //At this point, the goal is for all five of our arrays to be accurate
   //Here, we set the state using our five arrays
   if (somethingChanged) {
     this.setState((prevState) => {
       return {search: search, saved: saved, dismissed: dismissed, searchResults: searchResults, store: store};
     });
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
                       changeStatus={this.changeStatus}
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
