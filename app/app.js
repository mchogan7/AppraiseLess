var React = require("react");
var ReactDOM = require("react-dom");
import {Router, Route} from 'react-router';


var routes = require("./config/routes");


//The magic happens in the routes file^
ReactDOM.render(routes, document.getElementById("app"));




