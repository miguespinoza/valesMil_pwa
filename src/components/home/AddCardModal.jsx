import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import CardLocalService from '../../services/CardLocalService';

const styles = theme => ({
    paper: {
        position: "absolute",
        top: '40%',
        left: '40%',
        transform: 'translate(-40%, -40%)',
        width: theme.spacing.unit * 25,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
    margin: theme.spacing.unit,
    },

});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class AddCardModal extends React.Component {
    state = {
        cardName: '',
        cardNumber: '',
        cardPassword: '',
    };

    handleNameChange = e => this.setState({cardName: e.target.value});
    handleNumberChange = e => this.setState({cardNumber: e.target.value});
    handlePasswordChange = e => this.setState({cardPassword: e.target.value});
    clear = () => this.setState({
        cardName: '',
        cardNumber: '',
        cardPassword: '',
    });

    handleSave = () =>{
        console.debug('saving Card');
        const {cardName, cardNumber, cardPassword} = this.state;
        if (!!cardName && !!cardNumber && !! cardPassword) {
            CardLocalService.saveCard({
                id: uuidv4(),
                name: cardName,
                number: cardNumber,
                password: cardPassword,
            });
            console.debug('card saved');
        } else {
            console.debug('empty')
        }
        this.clear();
        this.props.refreshCards();
        this.props.close();
    }

    render() {
        const { classes, isOpen, close } = this.props;
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open = {isOpen}
                onClose={close}>
                <div className={classes.paper}>
                    <Typography variant="title" id="modal-title">
                        Register new Card
                    </Typography>
                    <Typography variant="subheading" id="simple-modal-description">
                        <div className = {classes.container}>
                            <TextField
                            id="name-input"
                            label="Name"
                            className={classes.textField}
                            type="text"
                            value = {this.state.cardName}
                            onChange={this.handleNameChange}
                            margin="normal"
                            />
                            <TextField
                            id="number-input"
                            label="Card number"
                            className={classes.textField}
                            type="text"
                            margin="normal"
                            value  = {this.state.cardNumber}
                            onChange={this.handleNumberChange}
                            />
                            <TextField
                            id="password-input"
                            label="Password"
                            className={classes.textField}
                            value  = {this.state.cardPassword}
                            onChange={this.handlePasswordChange} 
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            />
                            </div>
                    </Typography>
                    <Button onClick={this.handleSave}>Save</Button>
                </div>
            </Modal>
        );
    }
}

AddCardModal.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    refreshCards: PropTypes.func.isRequired,
};



export default  withStyles(styles)(AddCardModal);
