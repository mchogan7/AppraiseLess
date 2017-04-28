///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                            Landing Page                           //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////

var React = require("react");
var SearchBar = require("./children/SearchBar");

var LandingPage = React.createClass({
  getInitialState: function() {
      return {
          searchTerm: "",
          results: [],
          history: []
      };
  },
  navigateTo: function() {
      this.props.history.push('/resultsPage')
  },
  render: function() {
  return ( < div className = 'searchContainer' >
      <
      img src = "./images/AppraiseLessHorz.svg"
      className = 'landingLogo' / >
      <
      h2 className = 'tagline' > Let us help you lower your property taxes. < /h2> < SearchBar sendResults = { this.props.sendResults }
      router = {
          this.props.router
      }
      nav = {
          this.navigateTo
      }
      /> < div className = 'footer' >
      AppraiseLess provides comparable properties to support your property tax protest. < br / > AppraiseLess makes no guarantees about the accuracy of the information(it is derived from TCAD 's database) or the success of your protest. < /div> < /div>);
      }
  });

module.exports = LandingPage;