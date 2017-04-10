var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  getAutocomplete: function(search) {
    return axios.get('/autocomplete', {
      params: {
        search: search + '%'
      }
    }).then(function(response) {
        return response.data
    });
  },
    getMainSearch: function(search) {
      console.log('send')
    return axios.get('/mainSearch', {
      params: {
        search
      }
    }).then(function(response) {
       var searchResults = response.data.sort(function(a, b) {
    return a.appraised_val - b.appraised_val;
});

        console.log(searchResults)
    });
  },
  //xcoord, ycoord, xcoord, valueLow, valueHigh, feetLow, feetHigh, landLow, landHigh
  formatParams: function(object){
    var formatted = {
      xcoord: object.xcoord,
      ycoord: object.ycoord,
      valueLow: Math.floor(object.appraised_val * .65),
      valueHigh: Math.floor(object.appraised_val *1.2),
      feetLow: Math.floor(object.sqFeet * .7),
      feetHigh: Math.floor(object.sqFeet * 1.5),
      landLow: Math.floor(object.legal_acreage * .3),
      landHigh: Math.floor(object.legal_acreage * 2)
    }
    return formatted
  }

};


module.exports = helper;
