import React, { Component } from 'react'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        const cards = JSON.parse(localStorage.getItem('cards'));
        this.state = {
            card: cards ? cards.card : '',
            password: cards ? cards.password : '',
        };
    }
    onCardChange = (event) => {
        this.setState({card: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    onSave = () => {
        localStorage.setItem('cards', JSON.stringify({
            card: this.state.card,
            password: this.state.password,
        }));
    }
    render() {
        const {card, password} = this.state;
        return (
        <div>
            <input type="text"
            value = {card}
            onChange = {this.onCardChange}/>
            <input type="text"
            value = {password}
            onChange = {this.onPasswordChange}/>/>
            <button onClick = {this.onSave} >Guardar</button>
        </div>
        )
    }
}
