import React from 'react';
import {connect} from "react-redux";


class ExpensesList extends React.Component {

    render() {
        const expenses = Object.entries(this.props.expensesState.expensesByDate)
            .sort((a, b) => {
                return new Date(a[0]) - new Date(b[0]);
            });
        return (
            <div>
                {
                    expenses.map((expensesByMonth, index) => {
                            let expenses = expensesByMonth[1];
                            return (
                                <div key={expensesByMonth[0]}>
                                    {
                                        expenses.map((e, index) => {
                                            let result = `${e.date} ${e.price} ${e.currency} ${e.product}`;
                                            return (
                                                <div key={index} style={{marginBottom: "5px"}}>{result}</div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        expensesState: state.expensesState
    }

}

export default connect(mapStateToProps, null)(ExpensesList);
