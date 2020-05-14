import React from 'react';
import { connect } from 'react-redux';
import { setCashOnHand } from '../redux/actions/InventoryActions';
import { setTransactionsAvailable } from '../redux/actions/MarketplaceActions';


class TransactionManager extends React.Component {

    render() {

        return (
            <div>
                <div>You have ${this.props.cashOnHand} and {this.props.transactionsAvailable} transactions available!</div> 
                <button type="button" onClick={() => {
                    if (this.props.transactionsAvailable > 0){
                        this.props.setCashOnHand(this.props.cashOnHand + 1);
                        this.props.setTransactionsAvailable(this.props.transactionsAvailable - 1)
                    }
                }}>sell!</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      cashOnHand: state.inventory.cashOnHand,
      transactionsAvailable: state.market.transactionsAvailable
    }
  }
  
  const mapDispatchToProps = { setCashOnHand, setTransactionsAvailable }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionManager)