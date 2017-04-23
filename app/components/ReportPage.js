// Include React
var React = require("react");

var ResultChart = require("./children/ResultChart");
var helpers = require("./utils/helpers");

import CountUp from 'react-countup';
import CopyToClipboard from 'react-copy-to-clipboard';

  


var ReportPage = React.createClass({

    navigateTo: function(){
    this.props.history.push('/resultsPage')
  },

    handleClick: function(){
      this.navigateTo()
    },

      handleChange: function(event) {
      this.props.updateReport(event)
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
     <textarea className='reportTextInput' onChange={this.handleChange} value={this.props.report}></textarea>
     <div className='buttonHolder'>
      <div className='reportPageButton' onClick={() => this.handleClick()}>BACK TO MAP</div>
      <div className='reportPageButton' onClick={() => helpers.sendReport('test')}>EMAIL TO ME</div>

      <CopyToClipboard text={this.props.report}
          onCopy={() => this.setState({copied: true})}>
          <div className='reportPageButton'>COPY TO CLIPBOARD</div>
        </CopyToClipboard>
      
      </div>
     </div>



     <div className='reportChartContainer'>
     <div className='reportHeader'>PROTEST YOUR<br />APPRAISAL EVERY YEAR</div>
     <div className='chartKey'>
     <span>POTENTIAL SAVINGS - </span><span className = 'boldText' style={{color:'rgb(0,115,188)'}}>PROTESTING </span>VS <span className = 'boldText' style={{color:'rgb(201,30,0)'}}>NOT PROTESTING</span>
     
     </div>
     <div className='chartDivider'></div>

     <ResultChart protested={data.protested} 
                  unprotested={data.nonProtested}
                  />
    <div className='chartDivider'></div>

    <div className='reportTotalContainer'>
     <div className='dataAverage'>
     <p className='reportTotalTen'>OVER 10 YEARS</p>
     <p className='reportTotalSmall'>YOU COULD SAVE</p>
     <p className='reportTotalLarge'>$<CountUp start={0} end={Math.round(data.totalSavings)} duration={.5} separator="," useGrouping={true}/></p>
     <p className='reportTotalSmall'>TOTAL</p>
     </div>

     <div className='dataAverage'>
     <p className='reportTotalTen'>OVER 10 YEARS</p>
     <p className='reportTotalSmall'>YOU COULD SAVE</p>
     <p className='reportTotalLarge'>$<CountUp start={0} end={Math.round(data.totalSavings / 120)} duration={.5} separator="," useGrouping={true}/></p>
     <p className='reportTotalSmall'>PER MONTH AVG.</p>
     </div>
    </div>
    <div className='disclaimerText'>
    <p>These are estimates only. Un-protested values assume a homestead exemption and 10% value increase year over year. Displayed protested values increase 4.68% year over year. The estimated tax rate is 2.2%. This may not reflect your situation and is only a general estimate. Your savings could be higher or lower than displayed. </p>
    </div>

     </div>
 

     </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ReportPage;
