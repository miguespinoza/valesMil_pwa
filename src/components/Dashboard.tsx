import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { balanceRequested, cardCreated } from "../actions";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import BalanceCard from "./BalanceCard";
import Card from "../types/card";
import balanceService from "../services/balanceService"

type Props = {};

const useStyles = makeStyles(theme => ({
  
  cardsContainer: {
    display: "flex",
  },
  title: {
    fontSize: 14
  },
  fab: {
    margin: theme.spacing(1),
    position: "fixed",
    right: "20px",
    bottom: "20px"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Dashboard: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const balance = useSelector(
    (state: any) => state.balance["6273181142637946"]
  );
  const isLoading = useSelector(
    (state: any) => state.isLoading["6273181142637946"]
  );
  const [open, setOpen] = React.useState(false);
  const [cardId, setCardId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const cards = useSelector((state: any) => state.cards);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCardId("");
    setPassword("");
    setCardName("");
    setOpen(false);
  };

  const handleSaveCard = () => {
    dispatch(cardCreated({ id: cardId, password, name: cardName }));
    setCardId("");
    setPassword("");
    setCardName("");
    setOpen(false);
  };

  useEffect(()=>{
    dispatch({
      type: "balance_REQUEST_CYCLE",
      payload: {
        request: balanceService.makeBalanceRequest({card: 11551515, password: "password"})
      }
    })
  })

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <h2>The Vales mil</h2>
        </Toolbar>
      </AppBar>
      <Button onClick={handleOpen}>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Button>
      <div className={classes.cardsContainer}>
        {Object.values(cards).map((card: any) => (
          <BalanceCard cardName={card.name} cardId={card.id} />
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To see the balance add your card. The password is the same you use
            to access the efectivale site.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={e => setCardName(e.target.value)}
            value={cardName}
            label="Card Name"
            fullWidth
          />
          <TextField
            onChange={e => setCardId(e.target.value)}
            value={cardId}
            label="Card Number"
            fullWidth
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            label="Password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveCard} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && "is Loading..."}
      {balance}
    </div>
  );
};

export default Dashboard;
