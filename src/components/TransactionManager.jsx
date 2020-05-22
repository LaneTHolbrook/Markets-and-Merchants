import React from 'react';
import { connect } from 'react-redux';
import { setCashOnHand,
    setMarketGoods,
    setTransactionsAvailable,
    setState
 } from '../redux/actions/InventoryActions';
import NextDayButton from './nextDayButton';
import {testing, marketValue} from '../utils'

import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TransactionManager extends React.Component {

    download(state, fileName, contentType) {
        let content = {...state, date: state.date.toJSON()}
        content = JSON.stringify(content);
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    onFileChange = event => {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                let newState = JSON.parse(event.target.result);
                newState = {...newState, date: new Date(newState.date)}
                this.props.setState(newState);
            });
            reader.readAsText(event.target.files[0]);
            event.target.value = "";
    };

    goodsList = () => {
        let names = Object.keys(this.props.marketGoods);
        let output = names.map(good => {
            let value = marketValue({base: this.props.marketGoods[good].basePrice, supply: this.props.marketGoods[good].supply, demand: this.props.marketGoods[good].demand});
            return <tr key = {good}>
                <td>{good}</td>
                <td>{this.props.marketGoods[good].inventory}</td>
                <td>{value}</td>
                <td>{testing ? this.props.marketGoods[good].supply : null}</td>
                <td>{testing ? this.props.marketGoods[good].demand : null}</td>
                <td><button type="button" onClick={() => {
                        if (this.props.transactionsAvailable > 0 && this.props.cashOnHand >= value && this.props.marketGoods[good].supply > 0){
                            this.props.setCashOnHand(this.props.cashOnHand - value);
                            this.props.setTransactionsAvailable(this.props.transactionsAvailable - 1)
                            let newGoods = this.props.marketGoods;
                            newGoods[good].inventory++;
                            this.props.setMarketGoods(newGoods);
                        }
                    }}>buy!</button></td>
                <td><button type="button" onClick={() => {
                        if (this.props.transactionsAvailable > 0 && this.props.marketGoods[good].inventory > 0){
                            this.props.setCashOnHand(this.props.cashOnHand + value);
                            this.props.setTransactionsAvailable(this.props.transactionsAvailable - 1)
                            let newGoods = this.props.marketGoods;
                            newGoods[good].inventory--;
                            this.props.setMarketGoods(newGoods);
                        }
                    }}>sell!</button></td>
            </tr>
        });
        return (output);
    }

    render() {
        var chartOptions = {}
        if (testing) {
            chartOptions = {
                theme: "light2",
                title: {
                    text: "price of goods at various rarities over time"
                },
                axisY: {
                    title: "dollar value per unit",
                    prefix: "$",
                    includeZero: true
                },
                legend: {
                    fontColor: 'green'
                },
                data: [{
                        type: "line",
                        lineColor: 'blue',
                        xValueFormatString: "MMM YYYY",
                        yValueFormatString: "$#,##0.00",
                        name: "silver",
                        dataPoints: this.props.analytics.silver
                    },
                    {
                        type: "line",
                        lineColor: 'green',
                        xValueFormatString: "MMM YYYY",
                        yValueFormatString: "$#,##0.00",
                        name: "corundum",
                        dataPoints: this.props.analytics.corundum
                    },
                    {
                        type: "line",
                        lineColor: 'yellow',
                        xValueFormatString: "MMM YYYY",
                        yValueFormatString: "$#,##0.00",
                        name: "star hazel",
                        dataPoints: this.props.analytics['star hazel']
                    },
                    {
                        type: "line",
                        lineColor: 'orange',
                        xValueFormatString: "MMM YYYY",
                        yValueFormatString: "$#,##0.00",
                        name: "cotton",
                        dataPoints: this.props.analytics.cotton
                    },
                    {
                        type: "line",
                        lineColor: 'red',
                        xValueFormatString: "MMM YYYY",
                        yValueFormatString: "$#,##0.00",
                        name: "phoenix feathers",
                        dataPoints: this.props.analytics['phoenix feathers']
                    }
                ]
            }
        }

        return (
            <div>
                <div>Today is {this.props.date.toDateString()}</div>
                <table>
                    <thead><tr>
                        <th>Name</th>
                        <th>inventory</th>
                        <th>price</th>
                        {testing ? <th>supply</th> : null}
                        {testing ? <th>demand</th> : null}
                    </tr></thead>
                    <tbody>{this.goodsList()}
                    </tbody>
                </table>
                <div>You have ${this.props.cashOnHand} and {this.props.transactionsAvailable} transactions available!</div> 
                <NextDayButton/>
                <br/>
                <br/>
                <br/>   
                <button className="file-io-button" type="button" onClick={() => this.download(this.props.state, 'marketState.json', 'application/json')}>
                    Download market state
                </button>
                <br/>
                <br/>
                <label htmlFor="file-upload" className="file-io-button">
                    <input id="file-upload" type="file" onChange={this.onFileChange}/> 
                    Upload previous market state
                </label>
                <br/>
                <br/>
                {this.props.caravanArrived ? "A caravan has arrived bearing fresh goods!" : null}
                <br/>
                <br/>
                <br/>
                {testing ? <div>
                    <CanvasJSChart options = {chartOptions} ref={this.chart}
                        // onRef = {ref => this.chart = ref}
                    />
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      cashOnHand: state.cashOnHand,
      transactionsAvailable: state.transactionsAvailable,
      marketGoods: state.marketGoods,
      caravanArrived: state.caravanArrived,
      date: state.date,
      state: state,
      analytics: state.analytics
    }
  }
  
  const mapDispatchToProps = { 
      setCashOnHand,
      setTransactionsAvailable, 
      setMarketGoods,
      setState
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionManager)