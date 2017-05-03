///////////////////////////////////////////////////////////////////////
//                                                                   //
//                                                                   //
//                      Map Marker Component                         //
//                                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
//USED BY: Map.js

var React = require("react");

var MapMarker = React.createClass({
    render: function() {
    	return (
		    <div className='mapMarkerContainer'>
			    <span className='mapMarkerNumber' style={this.props.color}>{this.props.indexNumber + 1}</span>
			    <img src={this.props.marker} className='mapMarker'/>
		    </div>
    	);
  	}
});

module.exports = MapMarker;