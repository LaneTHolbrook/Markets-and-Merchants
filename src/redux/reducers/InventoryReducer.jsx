import { CASH_ON_HAND, MARKET_GOODS } from '../actions/InventoryActions'

const initialState = {
    cashOnHand: 0,
    marketGoods: {
        apples: {
            basePrice: 100,
            demand: 50,
            supply: 50
        },
        bananas: {
            basePrice: 200,
            demand: 25,
            supply: 50
        },
        cinnamon: {
            basePrice: 300,
            demand: 50,
            supply: 25
        },
        dates: {
            basePrice: 400,
            demand: 25,
            supply: 100
        },
        eggs: {
            basePrice: 500,
            demand: 100,
            supply: 50
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
        default: return {...state};
    }
}