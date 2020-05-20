export default function getInitialState() {
    let startPop = 500;

    var marketState =  {
        analytics: {silk: [], cotton: [], stone: [], chickens: [], pigs: []},
        date: new Date(1523, 5, 11),
        caravanArrived: false,
        cashOnHand: 0,
        transactionsAvailable: 5,
        maxTransactions: 5,
        population: startPop,
        marketGoods: {
            silk: {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: -2
            },
            wool: {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: -4
            },
            cotton: {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: -1
            },
            linen: {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: -2
            },
            gold: {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: -1
            },
            glass: {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            gemstones: {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 1
            },
            coffee: {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 2
            },
            chickens: {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 3
            },
            goats: {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 4
            },
            pigs: {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 5
            },
            'exotic animals': {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            wood: {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            stone: {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            copper: {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            iron: {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            'winter mint': {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            'summer spice': {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            'harvest truffle': {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            'spring down': {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            swords: {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            knives: {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            bows: {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            polearms: {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            shields: {
                basePrice: 100,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            leathers: {
                basePrice: 200,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            chainmail: {
                basePrice: 300,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 0
            },
            platemail: {
                basePrice: 400,
                demand: 500,
                supply: 500,
                inventory: 0,
                availability: 5
            }
        }
    };

    return (marketState);
};