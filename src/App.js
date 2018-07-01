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
    justifyContent: 'center',
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
          </Toolbar>
        </AppBar>
        <div className = {classes.content}>
          <Switch>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
