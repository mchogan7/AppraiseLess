// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var config = require('./config.js')

var mysql = require("mysql");

var connection = mysql.createConnection(config);




// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

//The Query for the auto complete
var autoQuery = 'SELECT prop.prop_id, prop.legal_acreage, prop.land_hstd_val, prop.imprv_hstd_val, prop.imprv_non_hstd_val, prop.appraised_val, prop.assessed_val, prop.address, prop.hs_exempt, prop.ov65_exempt, coords.xcoord, coords.ycoord, building.yr_built, prop.land_non_hstd_val, building.sqFeet FROM appraiseless.prop JOIN coords ON coords.PROP_ID = prop.prop_id JOIN building ON building.prop_id = prop.prop_id WHERE address LIKE ? LIMIT 5;'


app.get("/autocomplete", function(req, res) {
    console.log(req.query.search)
    connection.query(autoQuery, [req.query.search], function(error, results, fields) {
        console.log(results)
        res.send(results)
    });
});

//The main query. The parameters are calculated client side before being sent over.

//xcoord, ycoord, xcoord, valueLow, valueHigh, feetLow, feetHigh, landLow, landHigh
var mainQuery = 'SELECT coords.PROP_ID, coords.xcoord, prop.imprv_hstd_val, prop.land_hstd_val, coords.ycoord, prop.legal_acreage, prop.imprv_non_hstd_val, prop.land_non_hstd_val, prop.appraised_val, prop.assessed_val, prop.address, building.yr_built, building.sqFeet, ( 3959 * acos( cos( radians(?) ) * cos( radians( coords.ycoord ) ) * cos( radians( coords.xcoord ) - radians(?) ) + sin( radians(?) ) * sin(radians(coords.ycoord)) ) )AS distance FROM coords LEFT JOIN prop ON coords.PROP_ID = prop.prop_id LEFT JOIN building ON coords.PROP_ID = building.prop_id HAVING distance < 1 AND appraised_val BETWEEN ? AND ? AND sqFeet BETWEEN ? AND ? AND legal_acreage BETWEEN ? AND ? ORDER BY distance LIMIT 1 , 100;'


app.get("/mainSearch", function(req, res) {
    var sent = JSON.parse(req.query.search)
    var params = [
    	sent.ycoord,
        sent.xcoord,
        sent.ycoord,
        sent.valueLow,
        sent.valueHigh,
        sent.feetLow,
        sent.feetHigh,
        sent.landLow,
        sent.landHigh
    ]
    console.log(params)
      connection.query(mainQuery, params, function(error, results, fields) {
      res.send(results)
      if(error){
      console.log(error)
  }
});
});





//Autocomplete will return results with the address 
//and the coordinates that will then be plugged into this crazy query:

//Avg property Tax .0198

// SELECT *, ( 3959 * acos( cos( radians(30.34275) ) * 
// cos( radians( coords.ycoord ) ) * 
// cos( radians( coords.xcoord ) - 
// radians(-97.78425) ) + 
// sin( radians(30.34275) ) * 
// sin(radians(coords.ycoord)) ) )
// AS distance 
// FROM coords
// LEFT JOIN prop ON coords.PROP_ID = prop.prop_id
// LEFT JOIN building ON coords.PROP_ID = building.prop_id
// HAVING distance < 1 
// AND appraised_val BETWEEN 350000 AND 450000
// AND sqFeet BETWEEN 1500 AND 3000
// AND land_acres BETWEEN 1000 AND 3000
// ORDER BY distance
// LIMIT 1 , 100;

// SELECT prop.prop_id, 
// prop.legal_acreage, 
// prop.appraised_val, 
// prop.assessed_val, 
// prop.address,
// prop.hs_exempt,
// prop.ov65_exempt, 
// coords.xcoord, 
// coords.ycoord, 
// building.yr_built, 
// building.sqFeet 
// FROM appraiseless.prop 
// JOIN coords ON coords.PROP_ID = prop.prop_id
// JOIN building ON building.prop_id = prop.prop_id
// WHERE address LIKE '4810 p%'
// LIMIT 5;


// Listener
app.get('*', function(req, res) {
    res.redirect('/');
});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
