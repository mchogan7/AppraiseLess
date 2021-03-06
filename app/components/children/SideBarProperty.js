///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                     Property Component for Sidebar                //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: ResultsSideBar.js

var React = require("react");
var helpers = require("../utils/helpers");

var SideBarProperty = React.createClass({
  getInitialState: function() {
    return { searchActive: false,
              toggleHeight: {height:'50px'},
              rotate: 'propArrow', 
              toggle: false};
  },
  //Functions compares two values and returns a color.
  compare: function(val1, val2){
    if (val1 < val2){
      return {color: "rgb(40,199,142)"}
    } else if (val1 > val2){
      return {color: "rgb(201,30,0)"}
    } else {
      return {color: "rgb(158,158,158)"}
    }
  },

  //Used below, in handleClick()
  toggle: function(){
    if (this.state.toggle === true){
      this.setState({toggle:false, toggleHeight: {height:'50px'}, rotate: 'propArrow' })
    } else {
      this.setState({toggle:true, toggleHeight: {height:'150px'}, rotate: 'propArrow arrowDown'})
    }
  },

  //When a sidebar property item is clicked, it either expands or contracts
  handleClick: function(){
    this.toggle()
  },

  //When a sidebar property item is saved or dismissed, the status is changed here
  handleSaveDismissClick: function(status){
    this.props.changeStatus(this.props.info.PROP_ID, status)
  },
  
  render: function() {
    //Declared these as vars to improve readabilty.
    var propValue = this.props.info.appraised_val
    var homeValue = this.props.home.appraised_val
    var propYear = this.props.info.yr_built
    var homeYear = this.props.home.yr_built
    var propFeet = this.props.info.sqFeet
    var homeFeet = this.props.home.sqFeet
    var propLot = this.props.info.legal_acreage
    var homeLot = this.props.home.legal_acreage
    var circNumber = this.props.indexNumber

    return (
     <div className='sideBarPropHolder'>
        <div className='sideBarProp' style={this.state.toggleHeight} onClick={() => this.handleClick()}>
          <div className='numberHolder' style={this.props.color}>{circNumber}</div>
          <h3>{helpers.toTitleCase(this.props.info.address)}</h3>
          
          <div className='propMarket'>
            Market: <span style={this.compare(propValue, homeValue)}>${(propValue).toLocaleString()}</span>
          </div>
          
          <div className='oneThird propInfo'>Year Built:<span style={this.compare(homeYear, propYear)}> {propYear}</span></div>
          <div className='oneThirdish propInfo'>Sqft: <span style={this.compare(homeFeet, propFeet)}>{propFeet}</span></div>
          <div className='oneThird propInfo'>Lot: <span style={this.compare(homeLot, propLot)}>{(propLot * .0001).toFixed(4)} acres</span></div>
          <img src="./images/Arrow.svg" className={this.state.rotate}/>
          <div className='oneThird propInfo topSpacer'>Land: ${(this.props.info.land).toLocaleString()}</div>
          <div className='oneThird propInfo'>Building: ${(this.props.info.building).toLocaleString()}</div>
          <a className='tcadLink' href={'http://propaccess.traviscad.org/clientdb/Property.aspx?prop_id=' + this.props.info.PROP_ID + '&year=2017'} target="_blank">TCAD Link</a>

          {this.props.view === "saved" &&
            <div className='dismissButton' onClick={() => this.handleSaveDismissClick('dismissed')}>DISMISS FOR NOW</div>
          }
        
          {this.props.view === "dismissed" &&
            <div className='saveButton' onClick={() => this.handleSaveDismissClick('saved')}>SAVE FOR PROTEST</div>
          }

          {/* This is a horrible quick fix, will fix after presentation. */}
          {this.props.view === "search" &&
            <div className='saveButton' onClick={() => this.handleSaveDismissClick('saved')}>SAVE FOR PROTEST</div>
          }

          {this.props.view === "search" &&
            <div className='dismissButton' onClick={() => this.handleSaveDismissClick('dismissed')}>DISMISS FOR NOW</div>
          }
        </div>
      </div>
    );
  }
});

module.exports = SideBarProperty;