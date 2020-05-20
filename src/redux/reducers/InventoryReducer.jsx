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
                    state.analytics.silk.push({x: newDate, y: marketValue({supply: state.marketGoods.silk.supply, demand: state.marketGoods.silk.demand, base: state.marketGoods.silk.basePrice})});
                    state.analytics.cotton.push({x: newDate, y: marketValue({supply: state.marketGoods.cotton.supply, demand: state.marketGoods.cotton.demand, base: state.marketGoods.cotton.basePrice})});
                    state.analytics.stone.push({x: newDate, y: marketValue({supply: state.marketGoods.stone.supply, demand: state.marketGoods.stone.demand, base: state.marketGoods.stone.basePrice})});
                    state.analytics.chickens.push({x: newDate, y: marketValue({supply: state.marketGoods.chickens.supply, demand: state.marketGoods.chickens.demand, base: state.marketGoods.chickens.basePrice})});
                    state.analytics.pigs.push({x: newDate, y: marketValue({supply: state.marketGoods.pigs.supply, demand: state.marketGoods.pigs.demand, base: state.marketGoods.pigs.basePrice})});
                } else {
                    state.analytics.silk.push({x: newDate, y: state.marketGoods.silk.supply});
                    state.analytics.cotton.push({x: newDate, y: state.marketGoods.cotton.supply});
                    state.analytics.stone.push({x: newDate, y: state.marketGoods.stone.supply});
                    state.analytics.chickens.push({x: newDate, y: state.marketGoods.chickens.supply});
                    state.analytics.pigs.push({x: newDate, y: state.marketGoods.pigs.supply});
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