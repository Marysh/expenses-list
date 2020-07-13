export const expenseActionTypes = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    SHOW_EXPENSE_LIST: 'SHOW_EXPENSE_LIST',
    REMOVE_EXPENSES: 'REMOVE_EXPENSES',
    GET_TOTAL_AMOUNT: 'GET_TOTAL_AMOUNT',
    SHOW_ERROR: 'SHOW_ERROR',
    SET_RATES: 'SET_RATES',
};


export function addExpense(expense) {
    return {type: expenseActionTypes.ADD_EXPENSE, expense}
}

export function showExpensesList() {
    return {type: expenseActionTypes.SHOW_EXPENSE_LIST}
}

export function removeExpenses(date) {
    return {type: expenseActionTypes.REMOVE_EXPENSES, date}
}

export function getTotalAmount(currency) {
    return {type: expenseActionTypes.GET_TOTAL_AMOUNT, currency}
}

export function showError(err) {
    return {type: expenseActionTypes.SHOW_ERROR, err}
}


export function setRates(rates) {
    return {type: expenseActionTypes.SET_RATES, rates}
}
