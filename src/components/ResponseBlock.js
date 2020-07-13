import React from 'react';
import {connect} from "react-redux";
import ExpensesList from "./ExpensesList";
import Total from "./Total";


class ResponseBlock extends React.Component {

    render() {
        const {responseType, error} = this.props.expensesState;
        return (
            <div className='response-block'>
                {responseType === "LIST" && <ExpensesList/>}
                {responseType === "TOTAL" && <Total/>}
                {
                    responseType === "ERROR" &&
                    <div>{error}</div>
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

export default connect(mapStateToProps, null)(ResponseBlock);
