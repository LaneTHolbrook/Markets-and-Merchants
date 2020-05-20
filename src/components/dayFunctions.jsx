export function rollD6(dice = 1) {
    let result = 0;
    var i;
    for (i = 0; i < dice; i++) {
        result += Math.floor(Math.random() * 6) + 1;
    }
        return result;
}

export function calculateDemand(props) {

    let demandChange = 0;

    let roll = rollD6(3);

    switch(roll) {
        case 3: {
            demandChange = props.currentPop * -.35;
            break;
        }
        case 4: {
            demandChange = props.currentPop * -.3;
            break;
        }
        case 5: {
            demandChange = props.currentPop * -.25;
            break;
        }
        case 6: {
            demandChange = props.currentPop * -.2;
            break;
        }
        case 7: {
            demandChange = props.currentPop * -.15;
            break;
        }
        case 8: {
            demandChange = props.currentPop * -.1;
            break;
        }
        case 9: {
            demandChange = props.currentPop * -.05;
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
            demandChange = props.currentPop * .05;
            break;
        }
        case 13: {
            demandChange = props.currentPop * .1;
            break;
        }
        case 14: {
            demandChange = props.currentPop * .15;
            break;
        }
        case 15: {
            demandChange = props.currentPop * .2;
            break;
        }
        case 16: {
            demandChange = props.currentPop * .25;
            break;
        }
        case 17: {
            demandChange = props.currentPop * .3;
            break;
        }
        case 18: {
            demandChange = props.currentPop * .35;
            break;
        }
        default: {
            demandChange = props.currentPop;
        }
    }

    let result = props.currentDemand + Math.round(demandChange);

    if (result < 0) result = 0;

    return result;
    }

export function calculateSupplyChange(props) {
    let result;

    let roll = rollD6(3);
    switch(roll + props.availability) {
        case -2: {
            result = props.pop * -.25;
            break;
        }
        case -1: {
            result = props.pop * -.23;
            break;
        }
        case 0: {
            result = props.pop * -.21;
            break;
        }
        case 1: {
            result = props.pop * -.19;
            break;
        }
        case 2: {
            result = props.pop * -.17;
            break;
        }
        case 3: {
            result = props.pop * -.15;
            break;
        }
        case 4: {
            result = props.pop * -.13;
            break;
        }
        case 5: {
            result = props.pop * -.11;
            break;
        }
        case 6: {
            result = props.pop * -.09;
            break;
        }
        case 7: {
            result = props.pop * -.07;
            break;
        }
        case 8: {
            result = props.pop * -.05;
            break;
        }
        case 9: {
            result = props.pop * -.03;
            break;
        }
        case 10: {
            result = props.pop * -.01;
            break;
        }
        case 11: {
            result = props.pop * .01
            break;
        }
        case 12: {
            result = props.pop * .03;
            break;
        }
        case 13: {
            result = props.pop * .05
            break;
        }
        case 14: {
            result = props.pop * .07
            break;
        }
        case 15: {
            result = props.pop * .09;
            break;
        }
        case 16: {
            result = props.pop * .11;
            break;
        }
        case 17: {
            result = props.pop * .13;
            break;
        }
        case 18: {
            result = props.pop * .15;
            break;
        }
        case 19: {
            result = props.pop * .17;
            break;
        }
        case 20: {
            result = props.pop * .19;
            break;
        }
        case 21: {
            result = props.pop * .21;
            break;
        }
        case 22: {
            result = props.pop * .23;
            break;
        }
        case 23: {
            result = props.pop * .25;
            break;
        }
        default: {
            result = 0;
        }
    }

    return Math.ceil(result);
}

export function caravan(props) {
    if (Math.floor(Math.random() * 20) === 0){
        let possibleGoods = Object.keys(props.marketGoods);
        let caravanSize = possibleGoods.length;

        let newSupply = props.marketGoods;

        var i;
        //for each good
        for (i = 0; i < caravanSize; i++) {

            let shipmentGood = possibleGoods[i];

            let shipmentSize = getShipmentSize({supply: newSupply[shipmentGood].supply, demand: newSupply[shipmentGood].demand, pop: props.pop});

            
            newSupply[shipmentGood].supply = newSupply[shipmentGood].supply + shipmentSize;
        }

        props.setCaravanArrived(true);
        return newSupply;
        
    } else { return props.marketGoods };
}

function getShipmentSize(props) {

    let baseSize = props.demand - props.supply;
    if (baseSize > props.pop) baseSize = props.pop;
    if (baseSize < -props.pop) baseSize = -props.pop;
    let finalSize = props.pop;

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

export function nextDay(props) {
    props.setCaravanArrived(false);
    let output = {};
    let names = Object.keys(props.marketGoods);
    names.forEach(good => {
        let newSupply = props.marketGoods[good].supply + calculateSupplyChange({availability: props.marketGoods[good].availability, pop: props.population});
        if (newSupply < Math.floor(props.population * .1)) {newSupply = Math.floor(props.population * .1)};
        output[good] = {
            ...props.marketGoods[good],
            demand: calculateDemand({currentDemand: props.marketGoods[good].demand, currentPop: props.population}),
            supply: newSupply,
        }
    });
    output = caravan({      
        marketGoods: output,
        pop: props.population,
        setCaravanArrived: props.setCaravanArrived
    });
    props.setMarketGoods(output);
    props.resetTransactionsAvailable();
    props.setDateToNextDay();
}