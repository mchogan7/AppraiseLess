///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                         Side Bar Component                        //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: ResultsPage.js

var React = require("react");
var SideBarProperty = require("./SideBarProperty");
var SideBarHome = require("./SideBarHome");
var SearchBarResultsPage = require("./SearchBarResultsPage");
import { Scrollbars } from 'react-custom-scrollbars';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

var blue = {color:'rgb(0,115,188)'}
var green = {color:'rgb(40,199,142)'}
var red = {color:'rgb(201,30,0)'}
var gray = {color:'rgb(189,189,189)'}

var ResultsSideBar = React.createClass({

  getInitialState: function() {
    return {searchActive: false};
  },

  //Used below, in clearClick()
  blackify: function(bool){
    this.setState({searchActive: bool})
  },

  //Uses blackify() to set searchActive to false
  clearClick: function(){
    this.blackify(false)
  },

  //Used to select from "Store," "Saved," and "Dismissed" tabs
  tabSelectorSlider: function(){
    if (this.props.tab === 'saved'){
      return {marginLeft: '33%', backgroundColor: 'rgb(40,199,142)'}
    }  else if (this.props.tab === 'dismissed'){
      return {marginLeft: '67%', backgroundColor: 'rgb(201,30,0)'}
    }  else {
      return {marginLeft: '0%', backgroundColor: 'rgb(0,115,188)'}
    }
  },

  //Used to move to the report page (as long as there are at least 3 saved properties)
  reportNavigate(sorted){
    if(sorted.length >= 3) {
      this.props.nav('/ReportPage')
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
        autoHeight = {true}
        autoHeightMax = {9000}
        >
        <div className='scrollContent'>
        <div className='tabSpacer'></div>
            
      {tab === 'search' &&

          <CSSTransitionGroup
          transitionName="slideOut"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>

         {sorted.search.map(function(result, i) {

                     return (
   
              <SideBarProperty key ={result.PROP_ID} 
                               info={result} 
                               home = {home} 
                               view = 'search'
                               indexNumber={i + 1} 
                               changeStatus={changeStatus}
                               color={{backgroundColor: 'rgb(0,115,188)'}}/>
                                  )
          
        }
        <div className='blackOut' onClick={() => this.clearClick()}></div>
  
        <SearchBarResultsPage sendResults={sendResults} 
                              router={this.props.router} 
                              nav={null} 
                              blackout={this.blackify}
                              searchActive={this.state.searchActive}
                              />

        <SideBarHome home = {this.props.home} />

        {/* All three tabs are generated here */}
        <div className= 'tabContainer'>
          <div onClick={() => this.props.tabSelect('search')} className='sideBarTab' style={tab === 'search' ? blue : gray}>SEARCH</div>
          <div onClick={() => this.props.tabSelect('saved')}className='sideBarTab' style={tab === 'saved' ? green : gray}>SAVED</div>
          <div onClick={() => this.props.tabSelect('dismissed')}className='sideBarTab' style={tab === 'dismissed' ? red : gray}>DISMISSED</div>
          <div className='tabSelector' style={this.tabSelectorSlider()}></div>
        </div>

        {/* Scrollbar component*/}
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={'calc(100vh - 247px)'}>

          <div className='tabSpacer'></div>
          
          {/* 'Search' tab selected*/}  
          {tab === 'search' &&

              <CSSTransitionGroup
              transitionName="slideOut"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>

              {sorted.search.map(function(result, i) {
                return (
                  <SideBarProperty key ={result.PROP_ID} 
                                   info={result} 
                                   home = {home} 
                                   view = 'search'
                                   indexNumber={i + 1} 
                                   changeStatus={changeStatus}
                                   color={{backgroundColor: 'rgb(0,115,188)'}}/>
                );
              })
            }
            </CSSTransitionGroup>
          }
          
          {/* 'Saved' tab selected*/}
          {tab === 'saved' &&

              <CSSTransitionGroup
              transitionName="slideOut"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>

              {sorted.saved.map(function(result, i) {
                return (
                  <SideBarProperty key ={result.PROP_ID} 
                                   info={result} 
                                   home = {home}
                                   view = 'saved'
                                   indexNumber={i + 1} 
                                   changeStatus={changeStatus}
                                   color={{backgroundColor: 'rgb(40,199,142)', color: 'white'}}/>
         
                );
              })
            }
            </CSSTransitionGroup>
          }

          {/* 'Dismissed' tab selected*/}
          {tab === 'dismissed' &&

            <CSSTransitionGroup
              transitionName="slideOut"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>

              {sorted.dismissed.map(function(result, i) {
                return (
                  <SideBarProperty key ={result.PROP_ID} 
                                   info={result} 
                                   home = {home} 
                                   indexNumber="-"
                                   view='dismissed'
                                   changeStatus={changeStatus}
                                   color={{backgroundColor: 'rgb(201,30,0)', color: 'white', fontSize: '40px', lineHeight: '25px'}}/>
         
                );
              })
            }
            </CSSTransitionGroup>
          }
        
        </Scrollbars>
        <div className='divider'></div>
        {/* 'Generate Protest' button */}
        <div className='reportButton' onClick={() => this.reportNavigate(sorted.saved)}>
          {sorted.saved.length < 3 && 
            <span> SAVE AT LEAST {3 - sorted.saved.length} MORE {sorted.saved.length > 1 ? 'PROPERTY' : 'PROPERTIES'}</span>}
          {sorted.saved.length >= 3 && 
            <span>GENERATE PROTEST</span>}
        </div>
      </div>
    );
  }
});

module.exports = ResultsSideBar;