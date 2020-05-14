import { TRANSACTIONS_AVAILABLE } from '../actions/MarketplaceActions'

const initialState = {
    transactionsAvailable: 5,
}

export default function MarketplaceReducer(state = initialState, action = {type: null}) {
    switch (action.type) {
        case TRANSACTIONS_AVAILABLE:
            return  {
                ...state,
                transactionsAvailable: action.payload
            };
            default: return {...state};
    }
}