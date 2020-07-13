import React from 'react';
import {connect} from "react-redux";
import {addExpense, getTotalAmount, removeExpenses, showError, showExpensesList} from "../store/actionTypes";


class CommandLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.runCommand = this.runCommand.bind(this);
        this.chooseAction = this.chooseAction.bind(this);

        this.inputRef = React.createRef();

    }

    changeValue(e) {
        this.setState({
            value: e.target.value,
        });
    }

    runCommand() {
        const {value} = this.state;
        if (value) {
            this.chooseAction(value);
        }
        this.inputRef.current.value = "";
        this.setState({
            value: "",
        });

    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.runCommand();
        }
    }

    chooseAction(value) {
        let command = value.split(' ');
        let commandObj = {};
        switch (command[0]) {
            case 'add':
                if (!this.isValidDate(command[1]) ||
                    !this.isValidPrice(command[2]) ||
                    !this.isValidCurrency(command[3]) ||
                    !this.isValidProduct(command[4])) {
                    return;
                }
                commandObj.date = command[1];
                commandObj.price = +command[2];
                commandObj.currency = command[3];
                commandObj.product = command[4];
                return this.props.addExpense(commandObj);
            case 'list':
                return this.props.showExpensesList();
            case 'clear':
                if (!this.isValidDate(command[1])) {
                    return;
                }
                commandObj.date = command[1];
                return this.props.removeExpenses(commandObj.date);
            case'total':
                if (!this.isValidCurrency(command[1])) {
                    return;
                }
                commandObj.currency = command[1];
                return this.props.getTotalAmount(command[1]);
            default:
                return this.props.showError('This command ' + command[0] + ' is not supported');
        }
    }

    isValidDate(dataString) {
        if (!dataString) {
            this.props.showError(`please enter a date in the following format yyyy-mm-dd`);
            return false;
        }
        let testDate;
        testDate = dataString.split('-');
        if (testDate.length !== 3) {
            this.props.showError(`date should match the pattern yyyy-mm-dd`);
            return false;
        }
        testDate = new Date(dataString);
        if (isNaN(testDate.getTime())) {
            this.props.showError(`date should match the pattern yyyy-mm-dd`);
            return false;
        }
        return true;
    }

    isValidPrice(price) {
        if (isNaN(price)) {
            this.props.showError(`such ${price} price is not valid`);
            return false;
        }
        return true;
    }

    isValidCurrency(currency) {
        const {rates} = this.props.expensesState;
        if (!rates[currency]) {
            this.props.showError(`such ${currency} currency is not valid`);
            return false;
        }
        return true;
    }

    isValidProduct(product) {
        if (!product) {
            this.props.showError(`enter a product please`);
            return false
        }
        return true;
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Enter a command" ref={this.inputRef} onChange={
                    this.changeValue} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.runCommand} disabled={!this.state.value}>Run</button>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addExpense: (expense) => {
            dispatch(addExpense(expense))
        },
        showExpensesList: () => {
            dispatch(showExpensesList())
        },
        removeExpenses: (date) => {
            dispatch(removeExpenses(date))
        },
        getTotalAmount: (currency) => {
            dispatch(getTotalAmount(currency))
        },
        showError: (err) => {
            dispatch(showError(err))
        },
    }
}

function mapStateToProps(state) {
    return {
        expensesState: state.expensesState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);


