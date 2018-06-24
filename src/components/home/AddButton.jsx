import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        position: 'absolute',
        right: '30px',
        bottom: '30px',
    },
    input: {
        display: "none"
    }
});

const AddButton = props => {
    const { classes, onClick } = props;
    return (
        <Button
            variant="fab"
            color="primary"
            aria-label="add"
            onClick = { onClick }
            className={classes.button}
        >
            <AddIcon />
        </Button>
    );
};

AddButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddButton);
