// Include React
var React = require("react");

var helpers = require("../utils/helpers");


// Creating the Main component
var SideBarProperty = React.createClass({
  getInitialState: function() {
    return { searchActive: false,
              toggleHeight: {height:'50px'},
              rotate: {transform: 'rotate(0deg)'}, 
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

  toggle: function(){
    if (this.state.toggle === true){
      this.setState({toggle:false, toggleHeight: {height:'50px'}, rotate: {transform: 'rotate(0deg)'} })
    } else {
      this.setState({toggle:true, toggleHeight: {height:'150px'}, rotate: {transform: 'rotate(90deg)'}})
    }
  },

  handleClick: function(){
    this.toggle()
  },

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
        <div className='numberHolder'>{circNumber + 1}</div>
        <h3>{helpers.toTitleCase(this.props.info.address)}</h3>
        
        <div className='propMarket'>
        Market: <span style={this.compare(propValue, homeValue)}>${(propValue).toLocaleString()}</span></div>
        
        <div className='oneThird propInfo'>Year Built:<span style={this.compare(homeYear, propYear)}> {propYear}</span></div>
        <div className='oneThirdish propInfo'>Sqft: <span style={this.compare(homeFeet, propFeet)}>{propFeet}</span></div>
        <div className='oneThird propInfo'><span style={this.compare(homeLot, propLot)}>Lot: {(propLot * .0001).toFixed(4)} acres</span></div>
        <img src="./images/Arrow.svg" className='propArrow' style={this.state.rotate}/>
         <div className='oneThird propInfo topSpacer'>Land: ${(this.props.info.land).toLocaleString()}</div>
         <div className='oneThird propInfo'>Building: ${(this.props.info.building).toLocaleString()}</div>
         <a className='tcadLink' href={'http://propaccess.traviscad.org/clientdb/Property.aspx?prop_id=' + this.props.info.PROP_ID + '&year=2017'} target="_blank">TCAD Link</a>
        <div className='dismissButton' onClick={() => this.handleSaveDismissClick('dismissed')}>DISMISS FOR NOW</div>
        <div className='saveButton' onClick={() => this.handleSaveDismissClick('saved')}>SAVE FOR PROTEST</div>
        </div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SideBarProperty;
