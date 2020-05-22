import React from 'react';
import { connect } from 'react-redux';
import { setCashOnHand,
    setMarketGoods,
    setTransactionsAvailable,
    setState
 } from '../redux/actions/InventoryActions';
import NextDayButton from './NextDayButton';
import {testing} from '../utils';
import { Line } from 'react-chartjs-2';

// import CanvasJSReact from '../canvasjs.react';
// //var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
            let value = this.props.marketGoods[good].marketValue;
            return <tr key = {good}>
                <td>{good}</td>
                <td>{this.props.marketGoods[good].inventory}</td>
                <td>{value}</td>
                {testing ? <td>{this.props.marketGoods[good].supply}</td> : null}
                {testing ? <td>{this.props.marketGoods[good].demand}</td> : null}
                <td><button type="button" onClick={() => {
                        if (this.props.transactionsAvailable > 0 && this.props.cashOnHand >= value){
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
        var chartData
        if(testing) {
            console.log(this.props.analytics.date);
            chartData = {
                labels: Object.keys(this.props.analytics.date),
                datasets: [
                {
                    label: 'silver',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'blue',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.analytics.silver
                },
                {
                    label: 'corundum',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'green',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.analytics.corundum
                },
                {
                    label: 'star hazel',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'yellow',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.analytics['star hazel']
                },
                {
                    label: 'cotton',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'orange',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.analytics.cotton
                },
                {
                    label: 'phoenix feathers',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'red',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.analytics['phoenix feathers']
                },
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
                    <Line data={chartData}/>
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