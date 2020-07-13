import React from 'react';
import './App.css';
import CommandLine from "./components/CommandLine";
import ResponseBlock from "./components/ResponseBlock";
import {setRates} from "./store/actionTypes";
import {connect} from "react-redux";

class App extends React.Component {

    constructor(props) {
        super(props);
        fetch('http://data.fixer.io/api/latest?access_key=2cef6f6f3911a9b6000f950dd4126f02')
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.props.setRates(res.rates);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container">
                <CommandLine/>
                <ResponseBlock/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRates: (rates) => {
            dispatch(setRates(rates))
        }
    }
}

export default connect(null, mapDispatchToProps)(App)
