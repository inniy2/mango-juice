import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchUser } from '../apicall';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { loginStyles as styles } from '../styles'
import { Paper, Grid, TextField, Button, Snackbar } from '@material-ui/core';

//Alerts
import MuiAlert from '@material-ui/lab/Alert';

const Login = ({classes}) => {
  const login = useSelector(state => state.loginReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Login"
  }, []);

  const [open, setOpen] = useState({
    isOpen: false,
    severity: '',
    message: ''
  })

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen( prop => {
        return {...prop,
          isOpen: false,
        }
      });
    }
    setOpen( prop => {
      return {...prop,
        isOpen: false,
      }
    });

  };


  const handleChange = e => {
    const { name, value } = e.target
    setForm(prop => {
      return {...prop,
        [name]: value
      }
    });
  };


  const handleSubmit = e => {
    e.preventDefault()
    fetchUser(form, open, setOpen, history, dispatch)
  };


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Paper className={classes.paper}>
            { login.isLogged ? <h3>Loggedin</h3> : <h3>Login requried</h3> }
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField className={classes.textfield} id="username" label="User Name" name='username' onChange={handleChange}  /><br/>
              <TextField className={classes.textfield} id="password" label="Password" type='password' name='password' onChange={handleChange}/><br/>
              <Button className={classes.button} color="primary" type='submit'>Login</Button>
            </form>
            <Snackbar open={open.isOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={open.severity}>{open.message}</Alert>
            </Snackbar>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default withStyles(styles)(Login);