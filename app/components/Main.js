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
var ReportPage = require("./ReportPage");

// Main component. All data is passed through here.
var Main = React.createClass({

  getInitialState: function() {
    return { home: {}, 
            searchResults: []
            };
  }, 

  //This function is passed as a prop to the landing page. It sets the home values and search results.
  sendSearchResults: function(home, results) {
  this.setState({
      home: home,
      searchResults: results});
  },

  updateReport: function(event){
      this.setState({ report: event.target.value })
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

 generateReport: function() {
     var saved = this.sorter().saved
     var reportText = ''
     var home = this.state.home
     reportText += 'My Property: \r\n'
     reportText += home.address + '\r\n'
     reportText += 'Property ID: ' + (home.prop_id) + '\r\n'
     reportText += 'Market Value: $' + (home.appraised_val).toLocaleString() + '\r\n'
     reportText += 'Assessed Value: $' + (home.assessed_val).toLocaleString() + '\r\n'
     reportText += 'Square Feet: ' + (home.sqFeet) + ' ft. \r\n'
     reportText += 'Lot Size: ' + (home.legal_acreage * .0001).toFixed(4) + ' acres \r\n'
     reportText += 'Year Built: ' + (home.yr_built) + '\r\n'
     reportText += '\r\n'
     reportText += 'Based on the comparisons below, I believe my property should be valued at $' + Math.round((home.appraised_val / 1.0468)).toLocaleString() + '\r\n'
     reportText += '\r\n'
     reportText += 'Comparable Properties:\r\n'
     reportText += '\r\n'


     for (var i = 0; i < saved.length; i++) {
         reportText += 'Comparable Property #' + (i + 1) + '\r\n'
         reportText += saved[i].address + '\r\n'
         reportText += 'Property ID: ' + (saved[i].PROP_ID) + '\r\n'
         reportText += 'Market Value: $' + (saved[i].appraised_val).toLocaleString() + '\r\n'
         reportText += 'Assessed Value: $' + (saved[i].assessed_val).toLocaleString() + '\r\n'
         reportText += 'Square Feet: ' + (saved[i].sqFeet) + ' ft. \r\n'
         reportText += 'Lot Size: ' + (saved[i].legal_acreage * .0001).toFixed(4) + ' acres \r\n'
         reportText += 'Year Built: ' + (saved[i].yr_built) + '\r\n'
         reportText += '\r\n'

         if (saved[i].appraised_val < home.appraised_val) {
             reportText += 'This property is appraised $' + (home.appraised_val - saved[i].appraised_val).toLocaleString() + ' less. '
         }


         if (saved[i].sqFeet > home.sqFeet) {
             reportText += 'It is ' + (saved[i].sqFeet - home.sqFeet) + ' square feet larger. '
         }

         if (saved[i].yr_built > home.yr_built) {
             var difference = saved[i].yr_built - home.yr_built
             if (difference > 1) {
                 reportText += 'It is ' + difference + ' years newer. '
             } else {
                 reportText += 'It is one year newer.'
             }
         }

         if (saved[i].legal_acreage > home.legal_acreage) {
             var percentDif = Math.round((saved[i].legal_acreage - home.legal_acreage) / home.legal_acreage * 100)
             if (percentDif > 1) {
                 reportText += 'The lot size is ' + percentDif + "% larger."
             }

         }

         reportText += '\r\n'
         reportText += '\r\n'
     }
     return reportText
 }
,

  render: function() {
    return (

      <Router>
        <div>
          <Redirect to="/home"/>
          <Switch>
            {/* This is the main routes setup. You can pass props in the component after the render statement.*/}

            {/* Route for the landing page.*/}
            <Route path='/home' render={(props) => (
            <LandingPage sendResults={this.sendSearchResults} {...props} />
            )} />

            {/* Route for the results page. The map and selection bar will be within this component*/}
            <Route path='/resultsPage' render={(props) => (
            <ResultsPage results={this.state.searchResults} 
                       home={this.state.home} {...props}
                       sendResults={this.sendSearchResults}
                       changeStatus={this.changeStatus}
                       sorted={this.sorter()}
                        />
            )} />

            <Route path='/ReportPage' render={(props) => (
            <ReportPage updateReport={this.updateReport}
                       home={this.state.home} {...props}
                       saved={this.sorter().saved}
                       report={this.generateReport()}
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
