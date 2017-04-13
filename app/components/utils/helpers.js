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
  //this function sends the search parameters to the server to run the query.
    getMainSearch: function(search) {
    return axios.get('/mainSearch', {
      params: {
        search
      }
    })
},
  //xcoord, ycoord, xcoord, valueLow, valueHigh, feetLow, feetHigh, landLow, landHigh
  formatParams: function(object){
    var formatted = {
      address: object.address,
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
  },

  //This is a shameless Stackoverflow copy-paste job.
  toTitleCase: function(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

};


module.exports = helper;
