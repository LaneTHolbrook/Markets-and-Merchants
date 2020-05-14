export const TRANSACTIONS_AVAILABLE = "TRANSACTIONS_AVAILABLE"

export function setTransactionsAvailable(transactions) {
    return {
        type: TRANSACTIONS_AVAILABLE,
        payload: transactions
    }
}