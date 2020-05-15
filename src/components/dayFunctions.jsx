export function rollD6() {
        return Math.random() * Math.floor(6);
    }

export function calculateDemand(currentDemand) {
        let roll = rollD6() + rollD6() + rollD6();

        switch(roll) {
            case 3: {
                return currentDemand * .6;
            };
            case 4: {
                return currentDemand * .65;
            }
            case 5: {
                return currentDemand * .7;
            }
            case 6: {
                return currentDemand * .75;
            }
            case 7: {
                return currentDemand * .8;
            }
            case 8: {
                return currentDemand * .85;
            }
            case 9: {
                return currentDemand * .9;
            }
            case 10: {
                return currentDemand * .95;
            }
            case 11: {
                return currentDemand * 1.05;
            }
            case 12: {
                return currentDemand * 1.1;
            }
            case 13: {
                return currentDemand * 1.15;
            }
            case 14: {
                return currentDemand * 1.2;
            }
            case 15: {
                return currentDemand * 1.25;
            }
            case 16: {
                return currentDemand * 1.3;
            }
            case 17: {
                return currentDemand * 1.35;
            }
            case 18: {
                return currentDemand * 1.4;
            }
        }
    }

export function calculateSupply(currentSupply) {
        let roll = rollD6() + rollD6() + rollD6();

        switch(roll) {
            case 3: {
                return currentSupply * .75
            }
            case 4: {
                return currentSupply * .8;
            };
            case 5: {
                return currentSupply * .8;
            }
            case 6: {
                return currentSupply * .85;
            }
            case 7: {
                return currentSupply * .85;
            }
            case 8: {
                return currentSupply * .9;
            }
            case 9: {
                return currentSupply * .9;
            }
            case 10: {
                return currentSupply * .95;
            }
            case 11: {
                return currentSupply * .95;
            }
            case 12: {
                return currentSupply * 1;
            }
            case 13: {
                return currentSupply * 1;
            }
            case 14: {
                return currentSupply * 1.05;
            }
            case 15: {
                return currentSupply * 1.05;
            }
            case 16: {
                return currentSupply * 1.1;
            }
            case 17: {
                return currentSupply * 1.1;
            }
            case 18: {
                return currentSupply * 1.15;
            }
        }
    }

export function nextDay(props) {
        let names = Object.keys(props.marketGoods);
        let output = {};
        names.forEach(good => {
            output[good] = {
                basePrice: props.marketGoods[good].basePrice,
                demand: calculateDemand(props.marketGoods[good].demand),
                supply: calculateSupply(props.marketGoods[good].supply),
                inventory: props.marketGoods[good].inventory
            }
        });

        props.setMarketGoods(output);
        props.setTransactionsAvailable(5);
    }