import React, { Component } from 'react'

import BalanceService from '../../services/BalanceService';

export default class Balance extends Component {
    constructor(props){
        super(props);
        this.state = {
            saldoDespensa: 0,
        }
    }

    componentDidMount = () => {
        const card = JSON.parse(localStorage.getItem('cards'));
        BalanceService.getBalance({
            ...card
        })
        .then(text => {
            console.log(text);
            this.setState({ saldoDespensa: text });
        })
    }
    
    render() {
        return (
            <div>
            {this.state.saldoDespensa}
            </div>
        )
    }
}
