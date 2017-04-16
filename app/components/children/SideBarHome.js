// Include React
var React = require("react");

var helpers = require("../utils/helpers");


// Creating the Main component
var SideBarHome = React.createClass({


  render: function() {
    return (
     <div className='sideBarPropHolder'>
        <div className='sideBarProp'>
        <div className='numberHolderHome'>1</div>
        <h3>{helpers.toTitleCase(this.props.info.address)}</h3>
        <div className='propMarket'>Market: ${(this.props.info.appraised_val).toLocaleString()}</div>
        <div className='oneThird propInfo'>Year Built: {this.props.info.yr_built}</div>
        <div className='oneThirdish propInfo'>Sqft: {this.props.info.sqFeet}</div>
        <div className='oneThird propInfo'>Lot: {(this.props.info.legal_acreage * .0001).toFixed(4)} acres</div>
        <img src="./images/Arrow.svg" className='propArrow'/>
        </div>
     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SideBarHome;
