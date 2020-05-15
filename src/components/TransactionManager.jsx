import React from 'react';
import { connect } from 'react-redux';
import { setCashOnHand, setMarketGoods } from '../redux/actions/InventoryActions';
import { setTransactionsAvailable } from '../redux/actions/MarketplaceActions';
import { nextDay } from './dayFunctions';

let marketValue = props => {
    let modifier = 1 + ((props.demand - props.supply) / 100);
    return props.base * modifier
}

let goodsList = goods => {
    let names = Object.keys(goods);
    let output = names.map(good => 
        <tr key = {good}>
            <td>{good}</td>
            <td>{goods[good].inventory}</td>
            <td>{marketValue({base: goods[good].basePrice, supply: goods[good].supply, demand: goods[good].demand})}</td>
        </tr>
    );
    return (output);
}

class TransactionManager extends React.Component {

    render() {

        return (
            <div>
                <table>
                    <thead><tr><th>Name</th><th>inventory</th><th>price</th></tr></thead>
                    <tbody>{goodsList(this.props.marketGoods)}</tbody>
                </table>
                <div>You have ${this.props.cashOnHand} and {this.props.transactionsAvailable} transactions available!</div> 
                <button type="button" onClick={() => {
                    if (this.props.transactionsAvailable > 0){
                        this.props.setCashOnHand(this.props.cashOnHand + 1);
                        this.props.setTransactionsAvailable(this.props.transactionsAvailable - 1)
                    }
                }}>sell!</button>
                {/* <button type="button" onClick={
                    nextDay({
                        marketGoods: this.props.marketGoods, 
                        setMarketGoods: this.props.setMarketGoods,
                        setTransactionsAvailable: this.props.setTransactionsAvailable}
                        )}>
                            Next Day
                </button> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      cashOnHand: state.inventory.cashOnHand,
      transactionsAvailable: state.market.transactionsAvailable,
      marketGoods: state.inventory.marketGoods
    }
  }
  
  const mapDispatchToProps = { setCashOnHand, setTransactionsAvailable, setMarketGoods }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionManager)