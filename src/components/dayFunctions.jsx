export function rollD6(dice = 1) {
    let result = 0;
    var i;
    for (i = 0; i < dice; i++) {
        result += Math.floor(Math.random() * 6) + 1;
    }
        return result;
    }

export function calculateDemand(currentPop) {

    let result = currentPop;

    let roll = rollD6(3);

    switch(roll) {
        case 3: {
            result = currentPop * .25;
            break;
        }
        case 4: {
            result = currentPop * .35;
            break;
        }
        case 5: {
            result = currentPop * .45;
            break;
        }
        case 6: {
            result = currentPop * .55;
            break;
        }
        case 7: {
            result = currentPop * .65;
            break;
        }
        case 8: {
            result = currentPop * .75;
            break;
        }
        case 9: {
            result = currentPop * .85;
            break;
        }
        case 10: {
            result = currentPop * .95;
            break;
        }
        case 11: {
            result = currentPop * 1.05;
            break;
        }
        case 12: {
            result = currentPop * 1.15;
            break;
        }
        case 13: {
            result = currentPop * 1.25;
            break;
        }
        case 14: {
            result = currentPop * 1.35;
            break;
        }
        case 15: {
            result = currentPop * 1.45;
            break;
        }
        case 16: {
            result = currentPop * 1.55;
            break;
        }
        case 17: {
            result = currentPop * 1.65;
            break;
        }
        case 18: {
            result = currentPop * 1.75;
            break;
        }
        default: {
            result = currentPop;
        }
    }

    result = Math.round(result);

    return result;
    }

export function calculateSupply(currentPop) {  
    let result = currentPop;

    let roll = rollD6(3);

    switch(roll) {
        case 3: {
            result = currentPop * .15;
            break;
        }
        case 4: {
            result = currentPop * .12;
            break;
        };
        case 5: {
            result = currentPop * .10;
            break;
        }
        case 6: {
            result = currentPop * .09;
            break;
        }
        case 7: {
            result = currentPop * .08;
            break;
        }
        case 8: {
            result = currentPop * .07;
            break;
        }
        case 9: {
            result = currentPop * .06;
            break;
        }
        case 10: {
            result = currentPop * .05;
            break;
        }
        case 11: {
            result = currentPop * .05;
            break;
        }
        case 12: {
            result = currentPop * .04;
            break;
        }
        case 13: {
            result = currentPop * .03;
            break;
        }
        case 14: {
            result = currentPop * .02;
            break;
        }
        case 15: {
            result = currentPop * .01;
            break;
        }
        case 16: {
            result = 0;
            break;
        }
        case 17: {
            result = currentPop * -.02;
            break;
        }
        case 18: {
            result = currentPop * -.05;
            break;
        }
        default: {
            result = currentPop;
        }
    }
    return Math.floor(result);
}

export function caravan(props) {
    if (Math.floor(Math.random() * 20) == 0){
        props.setCaravanArrived(true);
        let roll = rollD6() + rollD6() + rollD6();
        let caravanSize = props.pop;
        let possibleGoods = Object.keys(props.marketGoods);

        switch(roll) {
            case 3: {
                caravanSize = props.pop * possibleGoods.length * .2;
                break;
            }
            case 4: {
                caravanSize = props.pop * possibleGoods.length * .4;
                break;
            };
            case 5: {
                caravanSize = props.pop * possibleGoods.length * .5;
                break;
            }
            case 6: {
                caravanSize = props.pop * possibleGoods.length * .6;
                break;
            }
            case 7: {
                caravanSize = props.pop * possibleGoods.length * .7;
                break;
            }
            case 8: {
                caravanSize = props.pop * possibleGoods.length * .8;
                break;
            }
            case 9: {
                caravanSize = props.pop * possibleGoods.length * .9;
                break;
            }
            case 10: {
                caravanSize = props.pop * possibleGoods.length;
                break;
            }
            case 11: {
                caravanSize = props.pop * possibleGoods.length;
                break;
            }
            case 12: {
                caravanSize = props.pop * possibleGoods.length * 1.1;
                break;
            }
            case 13: {
                caravanSize = props.pop * possibleGoods.length * 1.2;
                break;
            }
            case 14: {
                caravanSize = props.pop * possibleGoods.length * 1.3;
                break;
            }
            case 15: {
                caravanSize = props.pop * possibleGoods.length * 1.4;
                break;
            }
            case 16: {
                caravanSize = props.pop * possibleGoods.length * 1.5;
                break;
            }
            case 17: {
                caravanSize = props.pop * possibleGoods.length * 1.6;
                break;
            }
            case 18: {
                caravanSize = props.pop * possibleGoods.length * 1.7;
                break;
            }
            default: {
                caravanSize = props.pop;
            }
        }

        let newSupply = props.marketGoods;

        let remainingCaravanSpace = caravanSize;
        while (remainingCaravanSpace > 1) {

            let shipmentGood = Math.floor(Math.random() * possibleGoods.length);
            let shipmentSize = Math.floor(Math.random() * remainingCaravanSpace) + 1;

            if (remainingCaravanSpace < shipmentSize) {
                shipmentSize = remainingCaravanSpace;
            }
            
            newSupply[possibleGoods[shipmentGood]].supply = newSupply[possibleGoods[shipmentGood]].supply + shipmentSize;
            remainingCaravanSpace = remainingCaravanSpace - shipmentSize;
        }

        props.setMarketGoods(newSupply);
    }
}

export function nextDay(props) {
        props.setCaravanArrived(false);
        let names = Object.keys(props.marketGoods);
        let output = {};
        names.forEach(good => {
            let newSupply = props.marketGoods[good].supply - calculateSupply(props.population);
            if (newSupply < 0) {newSupply = 0};
            output[good] = {
                basePrice: props.marketGoods[good].basePrice,
                demand: calculateDemand(props.population),
                supply: newSupply,
                inventory: props.marketGoods[good].inventory
            }
        });

        props.setMarketGoods(output);
        caravan({
            marketGoods: props.marketGoods,
            pop: props.population,
            setMarketGoods: props.setMarketGoods,
            setCaravanArrived: props.setCaravanArrived
        });
        props.resetTransactionsAvailable();
    }