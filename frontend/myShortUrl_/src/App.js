import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import './App.css';

import axios from 'axios';
axios.defaults.baseURL= "http://localhost:8000/";


const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'right',
    margin : 0
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 800,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }  
});

class App extends Component { 
  constructor(props) {
    super(props)
    this.shortenLink = this.shortenLink.bind(this);
    this.changeLink = this.changeLink.bind(this);
    this.state = {
      original_link :'',
      hashcode : ''
    }
  }

  changeLink = (event) =>{
    this.setState({
      original_link: event.target.value
    });
  }

  shortenLink = () => {
    if(this.state.original_link.length > 500 ) 
      alert('The link is too big - MAX 500')
    else{
      const options = {
        method: 'POST',
        data: this.state,
        url: 'shorten/',
      };
      axios(options)
        .then((resp) =>{
          this.setState({ ...this.state,
            hashcode: resp.data.hashcode
          });
        })          
        .catch(error => {
            console.error("error to shorten the link - "+ error)
        });   
    }     
  }

  render() {
    const { classes } = this.props;    
    return (
      <div className="App">
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                My Short URL
              </Typography>
            </Toolbar>
          </AppBar>          
        </div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>              
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>                  
                  <Grid item>                  
                    <TextField
                      id="outlined-email-input"
                      label="Paste a link to shorten it"
                      className={classes.textField}
                      style={{ margin: 8 }}
                      type="link"
                      name="link"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={this.changeLink}
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.shortenLink}>
                      Send
                      <SendIcon className={classes.rightIcon} />
                    </Button>
                  </Grid>
                </Grid>                
              </Grid>
            </Grid>
          </Paper>
        </div>
        { this.state.hashcode ?
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>              
              <Grid item xs={12} sm container>                
              <Typography variant="h6" color="inherit">
                <a href={"localhost:8000/short/"+this.state.hashcode} >{"localhost:8000/short/"+this.state.hashcode}</a>
              </Typography>       
              </Grid>
            </Grid>
          </Paper>
        </div>
        : ""}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
