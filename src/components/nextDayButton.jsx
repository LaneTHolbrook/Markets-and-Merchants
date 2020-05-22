import React from 'react';
import { connect } from 'react-redux';
import { 
    setMarketGoods,
    setCaravanArrived,
    resetTransactionsAvailable,
    setDateToNextDay
 } from '../redux/actions/InventoryActions';
import {rollD6, marketValue} from '../utils'

class NextDayButton extends React.Component {

    nextDay = () => {
        this.props.setCaravanArrived(false);
        let output = {};
        let names = Object.keys(this.props.marketGoods);
        names.forEach(good => {
            let newDemand = this.calculateDemand(good);
            let newSupply = this.calculateSupply(good);
            let newPrice = marketValue({demand: newDemand, supply: newSupply, base: this.props.marketGoods[good].basePrice});
            if (newPrice > this.props.marketGoods[good].marketValue * 1.01) {
                newPrice = Math.floor(this.props.marketGoods[good].marketValue * 1.01);
            };
            if (newPrice < this.props.marketGoods[good].marketValue * .99) {
                newPrice = Math.floor(this.props.marketGoods[good].marketValue * .99);
            };
            output[good] = {
                ...this.props.marketGoods[good],
                marketValue: newPrice,
                demand: newDemand,
                supply: newSupply
            }
        });
        output = this.caravan(output);
        this.props.setMarketGoods(output);
        this.props.setDateToNextDay();
        this.props.resetTransactionsAvailable();
    }

    calculateDemand(good) {

        let demandChange = 0;
    
        let roll = rollD6(3);
    
        switch(roll) {
            case 3: {
                demandChange = this.props.population * -.35;
                break;
            }
            case 4: {
                demandChange = this.props.population * -.3;
                break;
            }
            case 5: {
                demandChange = this.props.population * -.25;
                break;
            }
            case 6: {
                demandChange = this.props.population * -.2;
                break;
            }
            case 7: {
                demandChange = this.props.population * -.15;
                break;
            }
            case 8: {
                demandChange = this.props.population * -.1;
                break;
            }
            case 9: {
                demandChange = this.props.population * -.05;
                break;
            }
            case 10: {
                demandChange = 0;
                break;
            }
            case 11: {
                demandChange = 0;
                break;
            }
            case 12: {
                demandChange = this.props.population * .05;
                break;
            }
            case 13: {
                demandChange = this.props.population * .1;
                break;
            }
            case 14: {
                demandChange = this.props.population * .15;
                break;
            }
            case 15: {
                demandChange = this.props.population * .2;
                break;
            }
            case 16: {
                demandChange = this.props.population * .25;
                break;
            }
            case 17: {
                demandChange = this.props.population * .3;
                break;
            }
            case 18: {
                demandChange = this.props.population * .35;
                break;
            }
            default: {
                demandChange = this.props.population;
            }
        }
    
        let result = this.props.marketGoods[good].demand + Math.round(demandChange);
    
        if (result < 0) result = 0;
    
        return result;
    }

    calculateSupply(good) {
        let result;
    
        let roll = rollD6(3);
        switch(roll + this.props.marketGoods[good].availability) {
            case -2: {
                result = this.props.population * -.25;
                break;
            }
            case -1: {
                result = this.props.population * -.23;
                break;
            }
            case 0: {
                result = this.props.population * -.21;
                break;
            }
            case 1: {
                result = this.props.population * -.19;
                break;
            }
            case 2: {
                result = this.props.population * -.17;
                break;
            }
            case 3: {
                result = this.props.population * -.15;
                break;
            }
            case 4: {
                result = this.props.population * -.13;
                break;
            }
            case 5: {
                result = this.props.population * -.11;
                break;
            }
            case 6: {
                result = this.props.population * -.09;
                break;
            }
            case 7: {
                result = this.props.population * -.07;
                break;
            }
            case 8: {
                result = this.props.population * -.05;
                break;
            }
            case 9: {
                result = this.props.population * -.03;
                break;
            }
            case 10: {
                result = this.props.population * -.01;
                break;
            }
            case 11: {
                result = this.props.population * .01
                break;
            }
            case 12: {
                result = this.props.population * .03;
                break;
            }
            case 13: {
                result = this.props.population * .05
                break;
            }
            case 14: {
                result = this.props.population * .07
                break;
            }
            case 15: {
                result = this.props.population * .09;
                break;
            }
            case 16: {
                result = this.props.population * .11;
                break;
            }
            case 17: {
                result = this.props.population * .13;
                break;
            }
            case 18: {
                result = this.props.population * .15;
                break;
            }
            case 19: {
                result = this.props.population * .17;
                break;
            }
            case 20: {
                result = this.props.population * .19;
                break;
            }
            case 21: {
                result = this.props.population * .21;
                break;
            }
            case 22: {
                result = this.props.population * .23;
                break;
            }
            case 23: {
                result = this.props.population * .25;
                break;
            }
            default: {
                result = 0;
            }
        }

        let newSupply = this.props.marketGoods[good].supply + result;
    
        if (newSupply < 1) newSupply = 1;//Math.floor(this.props.population * .1)) {newSupply = Math.floor(this.props.population * .1)};

        return Math.ceil(newSupply);
    }

    caravan(marketGoods) {
        if (Math.floor(Math.random() * 20) === 0){
            let possibleGoods = Object.keys(marketGoods);
            let caravanSize = possibleGoods.length;
    
            let newSupply = marketGoods;
    
            var i;
            //for each good
            for (i = 0; i < caravanSize; i++) {
    
                let shipmentGood = possibleGoods[i];
    
                let shipmentSize = this.getShipmentSize(shipmentGood);
    
                
                newSupply[shipmentGood].supply = newSupply[shipmentGood].supply + shipmentSize;
            }
    
            this.props.setCaravanArrived(true);
            return newSupply;
            
        } else { return marketGoods };
    }

    getShipmentSize(good) {

        let baseSize = this.props.marketGoods[good].demand - this.props.marketGoods[good].supply;
        if (baseSize > this.props.population) baseSize = this.props.population;
        if (baseSize < -this.props.population) baseSize = -this.props.population;
        let finalSize = this.props.population;
    
        switch(rollD6(3)) {
            case 3: {
                finalSize = Math.floor(baseSize * .3);
                break;
            }
            case 4: {
                finalSize = Math.floor(baseSize * .4);
                break;
            }
            case 5: {
                finalSize = Math.floor(baseSize * .5);
                break;
            } 
            case 6: {
                finalSize = Math.floor(baseSize * .6);
                break;
            }
            case 7: {
                finalSize = Math.floor(baseSize * .7);
                break;
            }
            case 8: {
                finalSize = Math.floor(baseSize * .8);
                break;
            }
            case 9: {
                finalSize = Math.floor(baseSize * .9);
                break;
            }
            case 10: {
                finalSize = Math.floor(baseSize);
                break;
            }
            case 11: {
                finalSize = Math.floor(baseSize);
                break;
            }
            case 12: {
                finalSize = Math.floor(baseSize * 1.1);
                break;
            } 
            case 13: {
                finalSize = Math.floor(baseSize * 1.2);
                break;
            }
            case 14: {
                finalSize = Math.floor(baseSize * 1.3);
                break;
            }
            case 15: {
                finalSize = Math.floor(baseSize * 1.4);
                break;
            }
            case 16: {
                finalSize = Math.floor(baseSize * 1.5);
                break;
            }
            case 17: {
                finalSize = Math.floor(baseSize * 1.6);
                break;
            }
            case 18: {
                finalSize = Math.floor(baseSize * 1.7);
                break;
            }
            default: {
                finalSize = 1;
            }
        }
    
        return finalSize;
    }

    render() {
        return (<button type="button" onClick={() => this.nextDay()}>Next Day</button>);
    }
}

const mapStateToProps = (state) => {
    return {
      marketGoods: state.marketGoods,
      population: state.population,
    }
  }
  
  const mapDispatchToProps = {
      resetTransactionsAvailable,
      setMarketGoods,
      setCaravanArrived,
      setDateToNextDay
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NextDayButton)