// Include React
var React = require("react");

var helpers = require("../utils/helpers");


// Creating the Main component
var SideBarProperty = React.createClass({
  getInitialState: function() {
    return { searchActive: false };
  },
  
  compare: function(val1, val2){
    if (val1 < val2){
      return {color: "rgb(40,199,142)"}
    } else if (val1 > val2){
      return {color: "rgb(201,30,0)"}
    } else {
      return {color: "rgb(158,158,158)"}
    }
  },

  render: function() {
    var propValue = this.props.info.appraised_val
    var homeValue = this.props.home.appraised_val
    var propYear = this.props.info.yr_built
    var homeYear = this.props.home.yr_built
    var propFeet = this.props.info.sqFeet
    var homeFeet = this.props.home.sqFeet
    var propLot = this.props.info.legal_acreage
    var homeLot = this.props.home.legal_acreage
    return (
     <div className='sideBarPropHolder'>
        <div className='sideBarProp'>
        <div className='numberHolder'>1</div>
        <h3>{helpers.toTitleCase(this.props.info.address)}</h3>
        
        <div className='propMarket'>
        Market: <span style={this.compare(propValue, homeValue)}>${(propValue).toLocaleString()}</span></div>
        
        <div className='oneThird propInfo'>Year Built:<span style={this.compare(homeYear, propYear)}> {propYear}</span></div>
        <div className='oneThirdish propInfo'>Sqft: <span style={this.compare(homeFeet, propFeet)}>{propFeet}</span></div>
        <div className='oneThird propInfo'><span style={this.compare(homeLot, propLot)}>Lot: {(propLot * .0001).toFixed(4)} acres</span></div>
        <img src="./images/Arrow.svg" className='propArrow'/>
        </div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SideBarProperty;
