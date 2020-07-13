import {expensesReducer} from "./reducer";

export const initialState = {
    expensesState: {
        expensesByDate: {},
        responseType: null,
        totalCurrency: null,
        error: null,
        rates: null
    }
};


export function reducers(state = initialState, action) {
    return {
        expensesState: expensesReducer(state.expensesState, action)
    }
}
