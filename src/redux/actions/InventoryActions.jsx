export const CASH_ON_HAND = "CASH_ON_HAND"
export const MARKET_GOODS = "MARKET_GOODS"
export const POPULATION = "POPULATION"
export const CARAVAN_ARRIVED = "CARAVAN_ARRIVED"

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