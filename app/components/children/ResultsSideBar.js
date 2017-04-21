// Include React
var React = require("react");

var SideBarProperty = require("./SideBarProperty");
var SideBarHome = require("./SideBarHome");
var SearchBarResultsPage = require("./SearchBarResultsPage");
import { Scrollbars } from 'react-custom-scrollbars';

var blue = {color:'rgb(0,115,188)'}
var green = {color:'rgb(40,199,142)'}
var red = {color:'rgb(201,30,0)'}
var gray = {color:'rgb(189,189,189)'}


// Creating the Main component
var ResultsSideBar = React.createClass({

  getInitialState: function() {
    return { searchActive: false
                 };
  },

  blackify: function(bool){
    this.setState({searchActive: bool})
  },

  clearClick: function(){
    this.blackify(false)
  },

  tabSelectorSlider: function(){
    if (this.props.tab === 'saved'){
      return {marginLeft: '33%', backgroundColor: 'rgb(40,199,142)'}
    }  else if (this.props.tab === 'dismissed'){
      return {marginLeft: '67%', backgroundColor: 'rgb(201,30,0)'}
    }  else {
      return {marginLeft: '0%', backgroundColor: 'rgb(0,115,188)'}
    }
  },

  render: function() {
    var tab = this.props.tab  
  	var results = this.props.results
    var sendResults = this.props.sendResults
    var home = this.props.home
    var changeStatus = this.props.changeStatus
    var sorted = this.props.sorted
    return (
     <div className="sideBarContainer">
        {this.state.searchActive &&
        <div className='blackOut' onClick={() => this.clearClick()}></div>
      }
     
      <SearchBarResultsPage sendResults={sendResults} 
                            router={this.props.router} 
                            nav={null} 
                            blackout={this.blackify}
                            searchActive={this.state.searchActive}
                            />

              <SideBarHome home = {this.props.home} />
              <div className= 'tabContainer'>
              <div onClick={() => this.props.tabSelect('search')} className='sideBarTab' style={tab === 'search' ? blue : gray}>SEARCH</div>
              <div onClick={() => this.props.tabSelect('saved')}className='sideBarTab' style={tab === 'saved' ? green : gray}>SAVED</div>
              <div onClick={() => this.props.tabSelect('dismissed')}className='sideBarTab' style={tab === 'dismissed' ? red : gray}>DISMISSED</div>
              <div className='tabSelector' style={this.tabSelectorSlider()}></div>
              </div>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={'calc(100vh - 247px)'}>

        <div className='tabSpacer'></div>

      {tab === 'search' &&
         sorted.search.map(function(result, i) {
                     return (
              <SideBarProperty key ={result.PROP_ID} 
                               info={result} 
                               home = {home} 
                               indexNumber={i + 1} 
                               changeStatus={changeStatus}
                               color={{backgroundColor: 'rgb(0,115,188)'}}/>
     
            );
          })
      }

      {tab === 'saved' &&
         sorted.saved.map(function(result, i) {
                     return (
              <SideBarProperty key ={result.PROP_ID} 
                               info={result} 
                               home = {home} 
                               indexNumber={i + 1} 
                               changeStatus={changeStatus}
                               color={{backgroundColor: 'rgb(40,199,142)', color: 'white'}}/>
     
            );
          })
      }

      {tab === 'dismissed' &&
         sorted.dismissed.map(function(result, i) {
                     return (
              <SideBarProperty key ={result.PROP_ID} 
                               info={result} 
                               home = {home} 
                               indexNumber="×"
                               changeStatus={changeStatus}
                               color={{backgroundColor: 'rgb(201,30,0)', color: 'white', fontSize: '25px'}}/>
     
            );
          })
      }
      
      </Scrollbars>
      <div className='divider'></div>
     <div className='reportButton'>GENERATE PROTEST</div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ResultsSideBar;
