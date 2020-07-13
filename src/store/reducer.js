import {expenseActionTypes} from "./actionTypes";


export function expensesReducer(state, action) {
    switch (action.type) {
        case expenseActionTypes.ADD_EXPENSE:
            let expensesForMonth = state.expensesByDate[action.expense.date];
            if (!expensesForMonth) {
                state.expensesByDate[action.expense.date] = [action.expense];
            } else {
                expensesForMonth.push(action.expense);
            }
            state.responseType = 'LIST';
            state.error = null;
            return {...state};
        case expenseActionTypes.SHOW_EXPENSE_LIST:
            state.responseType = 'LIST';
            state.error = null;
            return {...state};
        case expenseActionTypes.REMOVE_EXPENSES:
            state.responseType = 'LIST';
            state.error = null;
            delete state.expensesByDate[action.date];
            return {...state};

        case expenseActionTypes.GET_TOTAL_AMOUNT:
            state.responseType = 'TOTAL';
            state.totalCurrency = action.currency;
            state.error = null;
            return {...state};

        case expenseActionTypes.SHOW_ERROR:
            state.responseType = 'ERROR';
            state.error = action.err;
            return {...state};

        case expenseActionTypes.SET_RATES:
            state.rates = action.rates;
            return {...state};

        default:
            return state
    }
}
