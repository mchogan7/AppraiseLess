// Include React
var React = require("react");
var helpers = require("../utils/helpers");
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'


var AutocompleteResult = require("./AutocompleteResult");

var SearchBar = React.createClass({

  

  getInitialState: function() {
    return { address: "", autoResults: [] };
  },

  // This function will respond to the user inpu
  handleChange: function(event) {
      this.setState({ address: event.target.value })
      console.log(event.target.value)
      var that = this
      if (event.target.value.length > 3) {
          helpers.getAutocomplete(event.target.value).then(function(autoResults) {
              console.log(autoResults)
             that.setState({autoResults: autoResults})
          });
          
         
      } else {
        that.setState({autoResults: []})
      }


  },

  handleSubmit: function(event) {

    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  },

  render: function() {
    var sendResults = this.props.sendResults
    var nav = this.props.nav
    return (
            <div className="autoSearchBar">
              <input
                value={this.state.term}
                type="text"
                id="address"
                onChange={this.handleChange}
                required
              />
              <br />
              <div className='autoCompleteHolder'>
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



// Export the component back for use in other files
module.exports = SearchBar;
