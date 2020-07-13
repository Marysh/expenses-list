import React from 'react';
import {connect} from "react-redux";


class Total extends React.Component {

    convertCurrency(amount, from) {
        const {rates} = this.props.expensesState;
        const {totalCurrency} = this.props.expensesState;
        const kFrom = rates[from];
        const kTo = rates[totalCurrency];

        return amount / kFrom * kTo;

    }

    render() {
        const expenses = Object.entries(this.props.expensesState.expensesByDate);
        let total = 0;
        expenses && expenses.forEach(date => {
            date[1].forEach(expense => {
                total += this.convertCurrency(expense.price, expense.currency);
            });
        });
        const {totalCurrency} = this.props.expensesState;


        return (
            <div>
                {total.toFixed(2) + ' ' + totalCurrency}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        expensesState: state.expensesState
    }

}

export default connect(mapStateToProps, null)(Total);
