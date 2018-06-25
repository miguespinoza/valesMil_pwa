import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import SyncIcon from '@material-ui/icons/Sync';

import BalanceService from '../../services/BalanceService';
import CardLocalService from '../../services/CardLocalService';


const styles = ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    card: {
        minWidth: 275,
        maxWidth: 400,
        margin: 20,

    },
    media: {
        height: 0,
        paddingTop: '15%', // 16:9
    },
});

class BalanceCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            balance: 0,
            isLoading: true,
        };
    }


    componentDidMount = () => {
        const { card } = this.props;
        this.setState({ isLoading: true });
        const balanceRequest = CardLocalService.updateCardBalance(card);
        balanceRequest.then(balance => 
            this.setState({
            balance,
            isLoading: false,
            })
        );
    }

    render () {
        const { classes, card, openCardModal } = this.props;
        const { isLoading, balance } = this.state;
        return (
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="./card2.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {card.name}
                        </Typography>
                        <Typography component="p">
                            Balance: { isLoading ? card.balance : balance }
                        </Typography>
                        {isLoading && <SyncIcon/>}
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Statistics
                        </Button>
                        <IconButton onClick = {() => openCardModal(card)}>
                            <SettingsIcon/> 
                        </IconButton>
                    </CardActions>
                </Card>
        );
    }
}

BalanceCard.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        balance: PropTypes.number,
    }).isRequired,
    openCardModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(BalanceCard);