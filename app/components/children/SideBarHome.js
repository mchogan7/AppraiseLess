// Include React
var React = require("react");

var helpers = require("../utils/helpers");


// Creating the Main component
var SideBarHome = React.createClass({


  render: function() {
    return (
     <div className='sideBarHomeHolder'>
        <div className='sideBarProp'>
        <div className='numberHolderHome'>1</div>
        <h3>{helpers.toTitleCase(this.props.home.address)}</h3>
        <div className='propMarket'>Market: ${(this.props.home.appraised_val).toLocaleString()}</div>
        <div className='oneThird propInfo'>Year Built: {this.props.home.yr_built}</div>
        <div className='oneThirdish propInfo'>Sqft: {this.props.home.sqFeet}</div>
        <div className='oneThird propInfo'>Lot: {(this.props.home.legal_acreage * .0001).toFixed(4)} acres</div>
        <img src="./images/Arrow.svg" className='propArrow'/>
        </div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SideBarHome;
