import { CASH_ON_HAND, MARKET_GOODS, POPULATION, CARAVAN_ARRIVED } from '../actions/InventoryActions'

const initialState = {
    caravanArrived: false,
    cashOnHand: 0,
    population: 500,
    marketGoods: {
        apples: {
            basePrice: 100,
            demand: 500,
            supply: 500,
            inventory: 5
        },
        bananas: {
            basePrice: 200,
            demand: 500,
            supply: 500,
            inventory: 5
        },
        cinnamon: {
            basePrice: 300,
            demand: 500,
            supply: 500,
            inventory: 5
        },
        dates: {
            basePrice: 400,
            demand: 500,
            supply: 500,
            inventory: 5
        },
        eggs: {
            basePrice: 500,
            demand: 500,
            supply: 500,
            inventory: 5
        }
    }
}

export default function InventoryReducer(state = initialState, action = {type: null}) {
    switch (action.type) {
        case CASH_ON_HAND:
            return  {
                ...state,
                cashOnHand: action.payload
            };
        case MARKET_GOODS:
            return {
                ...state,
                marketGoods: action.payload
            }
        case POPULATION:
            return {
                ...state,
                population: action.payload
            }
        case CARAVAN_ARRIVED:
            return {
                ...state,
                caravanArrived: action.payload
            }
        default: return {...state};
    }
}