import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

var Main = require("../components/Main");
var LandingPage = require("../components/LandingPage");


const routes = (
  <Router>
     <Main >
      <Route path="/" component={LandingPage} />
     </Main>
  </Router>
)








// Export the Routes
module.exports = routes