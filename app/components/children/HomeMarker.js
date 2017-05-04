///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                     Home Marker Component                         //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: Map.js

var React = require("react");

var HomeMarker = React.createClass({
    render: function() {
	    return (
		    <div className='mapMarkerContainer'>
		    <img src="./images/WhiteHouse.svg" className='mapHomeMarker'/>
		    <img src="./images/GreenMarker.svg" className='mapMarker'/>
		    </div>
	    );
    }
});

module.exports = HomeMarker;