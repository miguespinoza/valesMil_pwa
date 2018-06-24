import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

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



class DeleteModal extends React.Component {

    delete = () => {
        const {card} = this.props;
        CardLocalService.deleteCard(this.props.card.id);
        this.props.refreshCards();
        this.props.close();
    }
    cancel = () => {
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
                    <Button variant="contained" color="secondary" onClick={this.delete}>Delete</Button>
                    <Button variant="contained" onClick={this.cancel}>Cancel</Button>
                </div>
            </Modal>
        );
    }
}

DeleteModal.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    card: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        balance: PropTypes.number,
    }).isRequired,
};



export default  withStyles(styles)(DeleteModal);
