import React from 'react';
import { connect } from 'react-redux';
import { setCashOnHand, setMarketGoods, setCaravanArrived } from '../redux/actions/InventoryActions';
import { setTransactionsAvailable } from '../redux/actions/MarketplaceActions';
import { nextDay } from './dayFunctions';

let marketValue = props => {
    let modifier = 1 + ((props.demand - props.supply) / 100);
    if (modifier < 0.5) {modifier = 0.5};
    return Math.floor(props.base * modifier);
}

let goodsList = props => {
    let names = Object.keys(props.goods);
    let output = names.map(good => {
        let value = marketValue({base: props.goods[good].basePrice, supply: props.goods[good].supply, demand: props.goods[good].demand});
        return <tr key = {good}>
            <td>{good}</td>
            <td>{props.goods[good].inventory}</td>
            <td>{value}</td>
            <td>{props.goods[good].supply}</td>
            <td>{props.goods[good].demand}</td>
            <td><button type="button" onClick={() => {
                    if (props.transactionsAvailable > 0 && props.cashOnHand >= value && props.goods[good].supply > 0){
                        props.setCashOnHand(props.cashOnHand - value);
                        props.setTransactionsAvailable(props.transactionsAvailable - 1)
                        let newGoods = props.goods;
                        newGoods[good].inventory++;
                        props.setMarketGoods(newGoods);
                    }
                }}>buy!</button></td>
            <td><button type="button" onClick={() => {
                    if (props.transactionsAvailable > 0 && props.goods[good].inventory > 0){
                        props.setCashOnHand(props.cashOnHand + value);
                        props.setTransactionsAvailable(props.transactionsAvailable - 1)
                        let newGoods = props.goods;
                        newGoods[good].inventory--;
                        props.setMarketGoods(newGoods);
                    }
                }}>sell!</button></td>
        </tr>
    });
    return (output);
}

class TransactionManager extends React.Component {

    render() {

        return (
            <div>
                <table>
                    <thead><tr>
                        <th>Name</th>
                        <th>inventory</th>
                        <th>price</th>
                        <th>supply</th>
                        <th>demand</th>
                    </tr></thead>
                    <tbody>{goodsList({goods: this.props.marketGoods, 
                        transactionsAvailable: this.props.transactionsAvailable, 
                        cashOnHand: this.props.cashOnHand,
                        setCashOnHand: this.props.setCashOnHand, 
                        setTransactionsAvailable: this.props.setTransactionsAvailable,
                        setMarketGoods: this.props.setMarketGoods})}
                    </tbody>
                </table>
                <div>You have ${this.props.cashOnHand} and {this.props.transactionsAvailable} transactions available!</div> 
                <button type="button" onClick={() =>
                    nextDay({
                        population: this.props.population,
                        marketGoods: this.props.marketGoods, 
                        setCaravanArrived: this.props.setCaravanArrived,
                        setMarketGoods: this.props.setMarketGoods,
                        setTransactionsAvailable: this.props.setTransactionsAvailable}
                        )}>
                            Next Day
                </button>
                <br/>
                <br/>
                <br/>
                {this.props.caravanArrived ? "A Caravan has arrived bearing fresh goods!" : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      cashOnHand: state.inventory.cashOnHand,
      transactionsAvailable: state.market.transactionsAvailable,
      marketGoods: state.inventory.marketGoods,
      population: state.inventory.population,
      caravanArrived: state.inventory.caravanArrived
    }
  }
  
  const mapDispatchToProps = { 
      setCashOnHand, 
      setTransactionsAvailable, 
      setMarketGoods, 
      setCaravanArrived 
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionManager)