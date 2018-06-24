import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom'

import Home from './components/home/Home';
import Balance from './components/balance/Balance';
import Settings from './components/settings/Settings';
import cards from './components/home/BalanceCard';
const history = createBrowserHistory()

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content:{
    flexWrap: 'wrap',
    display: 'flex',
    padding: '15px',
  }
};
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router history={history}>
        <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Vales mil
            </Typography>
            <Link to = '/Settings' style={{color: '#fff'}}><SettingsIcon/> </Link>
          </Toolbar>
        </AppBar>
        <div className = {classes.content}>
          <Switch>
            <Route path="/" component={Home}/>
            <Route path="/Settings" component={Settings}/>
            <Route path="/Balance/:cardId" component={Balance}/>
          </Switch>
        </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
