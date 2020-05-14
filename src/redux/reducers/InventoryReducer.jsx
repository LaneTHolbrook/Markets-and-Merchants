import { CASH_ON_HAND } from '../actions/InventoryActions'

const initialState = {
    cashOnHand: 0,
}

export default function InventoryReducer(state = initialState, action = {type: null}) {
    switch (action.type) {
        case CASH_ON_HAND:
            return  {
                ...state,
                cashOnHand: action.payload
            };
            default: return {...state};
    }
}