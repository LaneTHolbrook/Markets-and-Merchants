import { CASH_ON_HAND,
    MARKET_GOODS,
    POPULATION,
    CARAVAN_ARRIVED,
    MAX_TRANSACTIONS_AVAILABLE,
    RESET_TRANSACTIONS,
    TRANSACTIONS_AVAILABLE,
    STATE,
    DATE
} from '../actions/InventoryActions'
import marketState from '../../data/marketState'
import {testing, marketValue} from '../../utils'

const initialState = {...marketState, date: new Date(marketState.date)}
const priceFlag = true;

export default function InventoryReducer(state = initialState, action = {type: null}) {
    switch (action.type) {
        case STATE:
            return action.payload;
        case DATE: {
            if (testing) {
                var newDate = new Date(state.date.getTime());
                if (priceFlag) {
                    state.analytics.silver.push({x: newDate, y: state.marketGoods.silver.marketValue});
                    state.analytics.corundum.push({x: newDate, y: state.marketGoods.corundum.marketValue});
                    state.analytics['star hazel'].push({x: newDate, y: state.marketGoods['star hazel'].marketValue});
                    state.analytics.cotton.push({x: newDate, y: state.marketGoods.cotton.marketValue});
                    state.analytics['phoenix feathers'].push({x: newDate, y: state.marketGoods['phoenix feathers'].marketValue});
                } else {
                    state.analytics.silver.push({x: newDate, y: state.marketGoods.silver.supply});
                    state.analytics.corundum.push({x: newDate, y: state.marketGoods.corundum.supply});
                    state.analytics['star hazel'].push({x: newDate, y: state.marketGoods['star hazel'].supply});
                    state.analytics.cotton.push({x: newDate, y: state.marketGoods.cotton.supply});
                    state.analytics['phoenix feathers'].push({x: newDate, y: state.marketGoods['phoenix feathers'].supply});
                }
            }
            state.date.setDate(state.date.getDate() + 1);
            return  {
                ...state,
            };
        }
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
        case MAX_TRANSACTIONS_AVAILABLE:
            return  {
                ...state,
                maxTransactions: action.payload
            };
        case TRANSACTIONS_AVAILABLE:
            return  {
                ...state,
                transactionsAvailable: action.payload
            };
        case RESET_TRANSACTIONS:
            return  {
                ...state,
                transactionsAvailable: state.maxTransactions
            };
        default: return {...state};
    }
}