import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import cardImage from "./credit-card-gold.svg";

interface Props {
  cardName: string;
  cardId: string;
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    minWidth: 275,
    margin: "15px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

const BalanceCard: React.FC<Props> = ({ cardName, cardId }) => {
  const classes = useStyles();

  const cardBalance = useSelector((state: any)=> state.balance[cardId])

  return (
    <Card className={classes.card}>
      <CardHeader
        title={cardName}
        subheader={new Date().toLocaleDateString()}
      />
      <CardMedia className={classes.media} image={cardImage} title="card" />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {cardBalance}
        </Typography>
      </CardContent>
      
    </Card>
  );
};

export default BalanceCard;
