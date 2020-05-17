import { CASH_ON_HAND,
    MARKET_GOODS,
    POPULATION,
    CARAVAN_ARRIVED,
    MAX_TRANSACTIONS_AVAILABLE,
    RESET_TRANSACTIONS,
    TRANSACTIONS_AVAILABLE,
    STATE
} from '../actions/InventoryActions'
import marketState from '../../data/marketState.json'

const initialState = marketState;

export default function InventoryReducer(state = initialState, action = {type: null}) {
    switch (action.type) {
        case STATE:
            return action.payload;
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