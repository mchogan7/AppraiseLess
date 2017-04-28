///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                              Results Page                         //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////

var React = require("react");
var ResultsSideBar = require("./children/ResultsSideBar");
var GoogleMap = require("./children/Map");

var ResultsPage = React.createClass({
  getInitialState: function() {
    return { view: "search"};
  },

  //Sets view to selected tab
  tabSelect: function(selected){
    this.setState({view: selected})
  },

  navigateTo: function(url){
    this.props.history.push(url)
  },

  render: function() {
    return (
      <div>
        <ResultsSideBar results = {this.props.results}
                        sendResults={this.props.sendResults}
                        nav={this.navigateTo}
                        home={this.props.home}
                        changeStatus={this.props.changeStatus}
                        sorted={this.props.sorted}
                        tab={this.state.view}
                        tabSelect={this.tabSelect}
                        />

        <GoogleMap sorted={this.props.sorted} 
                   home={this.props.home}
                   tab={this.state.view}
                   />    
      </div>
    );
  }
});

module.exports = ResultsPage;