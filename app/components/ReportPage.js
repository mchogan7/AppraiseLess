// Include React
var React = require("react");

var ResultChart = require("./children/ResultChart");
var helpers = require("./utils/helpers");

import CountUp from 'react-countup';
import CopyToClipboard from 'react-copy-to-clipboard';


  var ReportPage = React.createClass({

            getInitialState: function() {
                return {
                    modal: false,
                    email: 'Enter Email Address'
                };
            },

            handleChange: function(event) {
                this.setState({ email: event.target.value })
            },


            navigateTo: function() {
                this.props.history.push('/resultsPage')
            },

            handleClick: function() {
                this.navigateTo()
            },


            houseValue: function() {
                //These values are used for all of the calculations. 
                var protestIncrease = .0468
                var nonProtestIncrease = .1
                var taxRate = .022

                //The arrays to be exported:
                var protestedData = [parseInt(this.props.report.suggestedValue)]
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

            emailModal: function(bool) {
                this.setState({ modal: bool })
            },

            stopPropagation: function(e) {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
            },

            inputClick: function() {
                if (this.state.email === 'Enter Email Address') {
                    this.setState({ email: "" });
                }
            },

            emailClick: function(){
              helpers.sendReport(this.state.email, this.props.report.reportText)
              this.emailModal(false);
            },

            handleCopy: function(){
            var that = this
            this.setState({copied: true})
            setTimeout(function(){ 
              that.setState({copied: false})
            }, 3000);
            },



  render: function() {
    var data = this.houseValue()
    var suggestedValue = this.props.report.suggestedValue
    return (
     <div className='reportContainer'>
     <div className='reportTextContainer'>
     <h2 className='reportHeading'>YOUR PROTEST</h2>
     <p className='protestInst'>This report is a starting point for your protest. You will need to add your opinion of value if e-filing (this is optional for paper protests). A suggested opinion of value is ${(suggestedValue).toLocaleString()}. This is the average market value of the comparable properties you chose. As a general rule, however, you should write in the lowest opinion of value that you believe you can support.</p>
   
     <textarea className='reportTextInput'>{this.props.report.reportText}</textarea>
     
     <div className='buttonHolder'>
      <div className='reportPageButton' onClick={() => this.handleClick()}>BACK TO MAP</div>
      <div className='reportPageButton' onClick={() => this.emailModal(true)}>EMAIL TO ME</div>

      <CopyToClipboard text={this.props.report.reportText}
          onCopy={() => this.handleCopy()}>
          <div className='reportPageButton'>{this.state.copied ? 'COPIED!' : 'COPY TO CLIPBOARD'}</div>
        </CopyToClipboard>
        </div>

        {this.state.modal &&
        <div className='emailModal' onClick={() => this.emailModal(false)}>
        <div className='emailPanel'  onClick={this.stopPropagation}>
        <input className='emailInput' value={this.state.email} onChange={this.handleChange} onClick={this.inputClick}/>
        <div className='emailButton' onClick={this.emailClick}>SEND</div>
        </div>
        </div>
       }
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
