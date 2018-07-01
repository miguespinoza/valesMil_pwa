import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import BalanceCard from './BalanceCard';
import AddButton from './AddButton';
import AddCardModal from './AddCardModal';
import CardDbService from '../../services/CardDbService';
import DeleteModal from './DeleteModal';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            isAddModalOpen: false,
            isCardModalOpen: false,
            selectedCard: null,
        };
        CardDbService.onDbOpened = this.refreshCards;
        CardDbService.init();
    }

    refreshCards = () => {
        CardDbService.getAllCards(event => {
            console.log(event);
            const cards = event.target.result;
            this.setState({cards})
        });
    }

    handleAddButton = () => this.setState({isAddModalOpen: !this.state.isAddModalOpen});
    openCardModal = card => this.setState({selectedCard: card, isCardModalOpen: true});
    closeCardModal = () => this.setState({isCardModalOpen: false, selectedCard: null});

    render(){
        const {selectedCard, isCardModalOpen, isAddModalOpen, cards } = this.state;
        return (
            <React.Fragment>
                <AddButton onClick = {this.handleAddButton}/>
                {
                    cards.map( c =>
                        <BalanceCard openCardModal = {this.openCardModal} key = {c.id} card = {c}/>)
                }
                <DeleteModal
                    card = {selectedCard}
                    isOpen = {isCardModalOpen}
                    close = {this.closeCardModal}
                    refreshCards = {this.refreshCards}
                />
                <AddCardModal
                    refreshCards = {this.refreshCards}
                    isOpen = {isAddModalOpen}
                    close  = {this.handleAddButton}/>
            </React.Fragment>
        )

    }
}

const styles = {

}

export default Home;