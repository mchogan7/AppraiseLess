///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                Search Bar Results Component for Sidebar           //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: ResultsSideBar.js

var React = require("react");
var helpers = require("../utils/helpers");
var AutocompleteResult = require("./AutocompleteResult");
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

var SearchBar = React.createClass({

  getInitialState: function() {
    return { address: "Start new search...", 
            autoResults: []
    };
  },

  // This function will respond to the user input
  handleChange: function(event) {
    var blackout = this.props.blackout
    this.setState({ address: event.target.value })

    var that = this
    if (event.target.value.length > 3) {
        helpers.getAutocomplete(event.target.value).then(function(autoResults) {
           that.setState({autoResults: autoResults})
           if(that.state.autoResults.length > 0){
            blackout(true)
           }
        });
    } else {
      that.setState({autoResults: []})
    }
  },

  //Clears out the search bar when clicked
  handleClick: function(event) {
    if(this.state.address === 'Start new search...'){
      this.setState({ address: "" });
    }
  },

  //Used below, in componentwillReceiveProps()
  resetSearch: function(){
    this.setState({ address: "Start new search..." , autoResults: []});
  },

  //Resets the search anytime the page changes
  componentWillReceiveProps(nextProps){
    if(nextProps.searchActive != this.props.searchActive){
      if (this.props.searchActive){this.resetSearch()}
    }
  },

  render: function() {
    var sendResults = this.props.sendResults
    var nav = this.props.nav
    var autoResults = this.state.autoResults.length > 0
    var reset = this.resetSearch
    var blackout = this.props.blackout

    return (
      <div className="autoSearchBarResults">
        <input
          className='searchInputResults'
          value={this.state.address}
          type="text"
          id="address"
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <div className='autoCompleteHolderResults' 
        //This adds padding when search results exist.
        style={autoResults ? {'paddingTop': '7px', 'backgroundColor' : 'rgb(225,225,225)' } : {'paddingTop': '0px'} }>
          {this.state.autoResults.map(function(result, i) {
            return (
              <AutocompleteResult key ={i} 
                                  address={result} 
                                  sendResults={sendResults} 
                                  nav={nav} 
                                  location='results'
                                  reset={reset}
                                  blackout={blackout}
              />
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;