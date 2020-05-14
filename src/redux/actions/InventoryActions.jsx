export const CASH_ON_HAND = "CASH_ON_HAND"

export function setCashOnHand(cash) {
    return {
        type: CASH_ON_HAND,
        payload: cash
    }
}