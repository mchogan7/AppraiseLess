///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                      Search Bar Component                         //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: LandingPage.js

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
    return { address: "Enter address...", 
             autoResults: []
    };
  },

  //On change, if at least three characters have been entered...
  //call for some Autocomplete results
  handleChange: function(event) {
    this.setState({ address: event.target.value })
    var that = this
    if (event.target.value.length > 3) {
      helpers.getAutocomplete(event.target.value).then(function(autoResults) {
         that.setState({autoResults: autoResults})
      });   
    } else {
      that.setState({autoResults: []})
    }
  },

  //On submit, query DB for 100 search results
  handleSubmit: function(event) {
    event.preventDefault();
    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  },

  //Clears out the search bar when clicked.
  handleClick: function(event) {
    if(this.state.address === 'Enter address...'){
      this.setState({ address: "" });
    }
  },

  render: function() {
    var sendResults = this.props.sendResults
    var nav = this.props.nav
    var autoResults = this.state.autoResults.length > 0
    return (
      <div className="autoSearchBar">
        <input
          className='searchInput'
          value={this.state.address}
          type="text"
          id="address"
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <div className='autoCompleteHolder' style={autoResults ? {'paddingTop': '7px', 'backgroundColor' : 'rgb(225,225,225)' } : {'paddingTop': '0px'} }>
          {this.state.autoResults.map(function(result, i) {
            return (
              <AutocompleteResult key ={i} address={result} sendResults={sendResults} nav={nav}/>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;