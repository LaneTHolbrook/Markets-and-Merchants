export const CASH_ON_HAND = "CASH_ON_HAND"
export const MARKET_GOODS = "MARKET_GOODS"
export const POPULATION = "POPULATION"
export const CARAVAN_ARRIVED = "CARAVAN_ARRIVED"
export const MAX_TRANSACTIONS_AVAILABLE = "MAX_TRANSACTIONS_AVAILABLE"
export const RESET_TRANSACTIONS = "RESET_TRANSACTIONS"
export const TRANSACTIONS_AVAILABLE = "TRANSACTIONS_AVAILABLE"
export const STATE = "STATE"

export function setState(state) {
    return {
        type: STATE,
        payload: state
    }
}

export function setMaxTransactions(transactions) {
    return {
        type: MAX_TRANSACTIONS_AVAILABLE,
        payload: transactions
    }
}

export function setTransactionsAvailable(transactions) {
    return {
        type: TRANSACTIONS_AVAILABLE,
        payload: transactions
    }
}

export function resetTransactionsAvailable() {
    return {
        type: RESET_TRANSACTIONS,
        payload: null
    }
}

export function setCashOnHand(cash) {
    return {
        type: CASH_ON_HAND,
        payload: cash
    }
}

export function setMarketGoods(goods) {
    return {
        type: MARKET_GOODS,
        payload: goods
    }
}

export function setPopulation(pop) {
    return {
        type: POPULATION,
        payload: pop
    }
}

export function setCaravanArrived(bool) {
    return {
        type: CARAVAN_ARRIVED,
        payload: bool
    }
}