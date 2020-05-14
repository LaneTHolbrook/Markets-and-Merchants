export const CASH_ON_HAND = "CASH_ON_HAND"
export const MARKET_GOODS = "MARKET_GOODS"

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