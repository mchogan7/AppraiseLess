// Include React
var React = require("react");

var ResultChart = require("./children/ResultChart");

import CountUp from 'react-countup';

  


var ReportPage = React.createClass({

    navigateTo: function(){
    this.props.history.push('/resultsPage')
  },

    handleClick: function(){
      this.navigateTo()
    },

    houseValue: function() {
      //These values are used for all of the calculations. 
      var protestIncrease = .0468
      var nonProtestIncrease = .1
      var taxRate = .022

      //The arrays to be exported:
      var protestedData = [Math.round(this.props.home.assessed_val / 1.0468)]
      var nonProtestedData = [this.props.home.assessed_val]

      //2 loops to fill the arrays. 
      for (var i = 0; i < 9; i++) {
          protestedData.push(Math.round(protestedData[i] + (protestedData[i] * protestIncrease)))
      }

      for (var i = 0; i < 9; i++) {
          nonProtestedData.push(Math.round(nonProtestedData[i] + (nonProtestedData[i] * nonProtestIncrease)))
      }

      //calculate total tax paid for both data sets:
      var protestedTotal = protestedData.reduce(function(a, b) {
          return a + b;
      }, 0) * taxRate;

      var UnProtestedTotal = nonProtestedData.reduce(function(a, b) {
          return a + b;
      }, 0) * taxRate;

      var totalSavings = Math.round(UnProtestedTotal - protestedTotal)
      
      var calculated = {
          protested: protestedData,
          nonProtested: nonProtestedData,
          totalSavings: totalSavings
      }

      return calculated


  },


  render: function() {
    var data = this.houseValue()
    return (
     <div className='reportContainer'>
     <div className='reportTextContainer'>
     <h2 className='reportHeading'>Report Page</h2>
     <textarea className='reportTextInput'>Place Holder</textarea>
     <div className='reportPageButton' onClick={() => this.handleClick()}>BUTTON</div>
     </div>



     <div className='reportChartContainer'>
     <div className='reportHeader'>PROTEST YOUR<br />APPRAISAL EVERY YEAR</div>
     <div className='chartKey'>
     <span>POTENTIAL SAVINGS. </span><span className = 'boldText' style={{color:'rgb(0,115,188)'}}>PROTESTING </span>VS <span className = 'boldText' style={{color:'rgb(201,30,0)'}}>NOT PROTESTING</span>
     
     </div>
     <div className='chartDivider'></div>

     <ResultChart protested={data.protested} 
                  unprotested={data.nonProtested}
                  />
    <div className='chartDivider'></div>

    <div className='reportTotalContainer'>
     <div className='dataAverage'>
     <p className='reportTotalSmall'>YOU COULD SAVE</p>
     <p className='reportTotalLarge'>$<CountUp start={0} end={Math.round(data.totalSavings)} duration={.5} separator="," useGrouping={true}/></p>
     <p className='reportTotalSmall'>OVER 10 YEARS</p>
     </div>

     <div className='dataAverage'>
     <p className='reportTotalSmall'>YOU COULD SAVE</p>
     <p className='reportTotalLarge'>$<CountUp start={0} end={Math.round(data.totalSavings / 120)} duration={.5} separator="," useGrouping={true}/></p>
     <p className='reportTotalSmall'>ON AVERAGE PER MONTH</p>
     </div>
    </div>
 

     </div>
 

     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ReportPage;
