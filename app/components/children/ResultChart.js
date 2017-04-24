// Include React
var React = require("react");

var LineChart = require("react-chartjs").Line;

var chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
     scaleLabel : "<%= value > 999 ? (value/1000).toFixed(0) + 'K' : value   %>",
     multiTooltipTemplate: "<%= '$' + value.toLocaleString() %>"
}




 

//Average annual increase: 4.68% for protested
//Assumes HS exempt, will increase by 10% for unprotested
//unprotested values += 10% previous value
//protested values += 4.68% previous value
//tax rate will be 2.2% for both
//savings = Total unprotested - Total protested

var ResultsChart = React.createClass({

  render: function() {
    var chartData = {
            labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
            datasets: [{
                label: "Not Protested",
                fillColor: "rgba(201,30,0,0.2)",
                strokeColor: "rgba(201,30,0,1)",
                pointColor: "rgba(201,30,0,1)",
                pointStrokeColor: "rgba(201,30,0,0.2)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.props.unprotested
            },{
                label: "Protested",
                fillColor: "rgba(0,115,188,0.2)",
                strokeColor: "rgba(0,115,188,1)",
                pointColor: "rgba(0,115,188,1)",
                pointStrokeColor: "rgba(0,115,188,1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: this.props.protested
            }
            ]
        }

    return (
      <div className='chartHolder'>
      <LineChart data={chartData} options={chartOptions}/>
      </div>
      )
  }
});


module.exports = ResultsChart;
