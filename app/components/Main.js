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
            };
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

      //I don't think we need to call componentUpdate functions at all in this case.
  // componentWillUpdate() {
  //   
  //     this.sorter();
  // },


  //When the state gets changed React will rerender the entire component based on changes.
  //If this function is anywhere in the render: function, then it will update.
  //And it will only update AFTER state has been set, so we don't have to worry about any async issues.
  sorter: function() {

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
   var searchResults = this.state.searchResults.slice(); //Added a slice so it duplicates the array instead of modifying it by reference
   //store[], search[], saved[], and dismissed[] are populated using the .filter() method.
   var store = searchResults.filter(isStore);
   var search = searchResults.filter(isSearch);
   var saved = searchResults.filter(isSaved);
   var dismissed = searchResults.filter(isDismissed);



   //Here, we check to see if we need to fill up search[], i.e., if it contains fewer than 10 objects
   //If it does, we take the appropriate number of "store" objects and make them "search" objects
   //This function should work when search[] has zero objects and when it has 9
   if (search.length < 10) {
     var i = 10 - search.length;
     console.log("i = " + i);
     while (i > 0) {
       console.log("Pop from store, push to search, swap a status");
       //Go ahead and decrement i
       i--;
       //Pop from store[], push to search[]
       var newSearchEntry = store.shift(); //Should we be using "dequeue" instead of "pop"???
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


   //At this point, the goal is for all five of our arrays to be accurate
   //Here, we set the state using our five arrays
 

  //Instead of updating state, we have the function return an object.
  //This can then be passed down as a prop to wherever it needs to go. (I think)
  //I have not tried to pass this down as a prop yet, but i think it will work.
   var sorted = {
       search: search, 
       saved: saved, 
       dismissed: dismissed, 
       store: store
              }
    
              return sorted

        //somehow this doesn't cause an infinite loop.
        this.setState({searchResults: searchResults})      
  
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
                       sorted={this.sorter()}
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
