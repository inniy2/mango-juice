import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import '../App.css';
import { useSelector } from 'react-redux';
import { fetchGrpcDiskSize, fetchGrpcTableDefinition, fetchGrpcGhostDryrun, fetchGrpcGhostExecute, fetchGrpcGhostInteractive, fetchGrpcGhostCutover,
         fetchLock, requireLock, releaseLock } from '../apicall';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { ghostStyles as styles } from '../styles'
import { Paper, Grid, TextField, Button, Snackbar } from '@material-ui/core';

//Alerts
import Alert from '@material-ui/lab/Alert';

const Ghost = ({classes}) => {
  const login = useSelector(state => state.loginReducer);
  const history = useHistory();

  const [ghostLock, setGhostLock] = useState([]);

  useEffect(() => {
    if(!login.isLogged)history.push('/login')
    fetchLock(setGhostLock)
  },[])
  
  
  const [form, setForm] = useState({
    ghosthost: '',
    dir: '',
    schemaname: '',
    tablename: '',
    statement: '',
    dryrun: false,
    ghostcommand: ''
  });

  const [isReserved, setReserve] = useState(false);
  const [diskSize, setDiskSize] = useState('');
  const [tableDefinition, setTableDefinition] = useState([]);
  const [dryrunResult, setDryrunResult] = useState('');
  const [executeResult, setExecuteResult] = useState('');
  const [interactiveResult, setInteractiveResult] = useState('');
  const [cutoverResult, setCutoverResult] = useState('');

  const handleReserve = e => {
    requireLock(form, login, setReserve, setGhostLock)
  }

  const handleRelease = e => {
    releaseLock(form, login, setReserve, setGhostLock)
  }

  const handleDryrun = e => {
    if(isReserved){
      fetchGrpcDiskSize(setDiskSize, form)
      fetchGrpcTableDefinition(setTableDefinition, form)
      fetchGrpcGhostDryrun(setDryrunResult, form)
      setForm(prevForm => {
        return {...form, dryrun: true};
      })
    }else{
      alert('Reserve the host first')
    }
  }

  const handleExecute = e => {
    form.dryrun ? fetchGrpcGhostExecute(setExecuteResult, form) : alert('Dry run first')
  }

  const handleInteractive = e => {
    fetchGrpcGhostInteractive(setInteractiveResult, form)
  }

  const handleCutover = e => {
    fetchGrpcGhostCutover(setCutoverResult, form) 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm(prevForm => {
      return {...form, [name]: value};
    })
  };


  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">
        <Grid container spacing={3}>
          {/*
            Ghost Host Grid
          */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              { login.isLogged ? '' : <Alert severity="warning"> Login Required</Alert>}
              {ghostLock.map((item, i) => {
                return <Alert severity="warning" key={i}>{item.ghost_host} is {item.lock_status} by {item.user_name} </Alert>
              })}
              <Paper className={classes.paper}>
                <TextField className={classes.textField} id="ghostHost" label="Ghost Host" name="ghosthost" onChange={handleChange}/><br/>
                <Button className={classes.button} color="primary" type='submit' onClick={handleReserve}>Reserve Host</Button>
                <Button className={classes.button} color="secondary" type='submit' onClick={handleRelease}>Release Host</Button>
              </Paper>
            </Paper>
          </Grid>
          {/*
            Dry Run and Execute Grid
          */}
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField id="dir" label="MySQL Directory" name='dir' onChange={handleChange}/><br/>
              <TextField className={classes.textField} id="schemaname" label="Schema Name" name="schemaname" onChange={handleChange}/><br/>
              <TextField className={classes.textField} id="tablename" label="Table Name" name="tablename" onChange={handleChange}/><br/>
              <TextField className={classes.textField} id="statement" label="Statement" name="statement" onChange={handleChange}/><br/>
              <Button className={classes.button} color="primary" type='submit' onClick={handleDryrun}>Test</Button>
              <Button className={classes.button} color="secondary" type='submit' onClick={handleExecute}>Alter</Button>
            </Paper>
          </Grid>
          {/*
            Interactive Grid
          */}
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField className={classes.textField} id="ghostcommand" label="Ghost Command" name="ghostcommand" onChange={handleChange}/><br/>
              <Button className={classes.button} color="primary" type='submit' onClick={handleInteractive}>Interactive</Button>
              <Button className={classes.button} color="secondary" type='submit' onClick={handleCutover}>Cut Over</Button>
            </Paper>
          </Grid>
          {/*
            Status Grid
          */}
          <Grid item xs={12}>
            <Paper className={classes.span}>
              { interactiveResult === '' ? '' : interactiveResult.map((item, i ) => {
                if(item.match(/error/gi) !== null){
                  return <span style={{color: "red"}} key={i}>{item}<br/></span>
                }else {
                  return <span key={i}>{item}<br/></span>
                }
              })}  
            </Paper>
          </Grid>
          {/*
            Disk Size Grid
          */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              { diskSize === '' ? '' : <li> Disk size is {diskSize} </li> } <br/>
            </Paper>
          </Grid>
          {/*
            Test Result Grid
          */}
          <Grid item xs={12}>
            <Paper className={classes.span}>
              { tableDefinition === '' ? '' : tableDefinition.map((item, i ) => {return <span key={i}>{item}<br/></span>}) }
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.span}>
            { dryrunResult === '' ? '' : dryrunResult.map((item, i ) => {
              if(item.match(/fatal/gi) !== null){
                return <span style={{color: "red"}} key={i}>{item}<br/></span>
              }else {
                return <span key={i}>{item}<br/></span>
              }
            })}
            </Paper>
          </Grid>
          

        </Grid>

      
      { form.ghosthost !== '' ? form.ghosthost : '' }      
      { executeResult !== '' ? executeResult : '' }
      { cutoverResult !== '' ? cutoverResult : '' }

        
      </form>
    </div>
  );

};

export default withStyles(styles)(Ghost);
