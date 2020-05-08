import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
//import '../App.css';

import { fetchGrpcDiskSize, fetchGrpcTableDefinition, fetchGrpcGhostDryrun, fetchGrpcGhostExecute, fetchGrpcGhostInteractive, fetchGrpcGhostCutover, confirmClick, 
         fetchLock, requireLock, releaseLock } from '../apicall';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { ghostStyles as styles } from '../styles'
import { Paper, Grid, TextField, Button, Modal, DialogContent, Collapse, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//Alerts
import Alert from '@material-ui/lab/Alert';

const Ghost = ({classes}) => {
  const login = useSelector(state => state.loginReducer);
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [ghostLock, setGhostLock] = useState([]);
  const [grpcPort, setGrpcPort] = useState('');
  
  const [modal, setModalOpen] = useState({ isOpen: false, handlerName: '', message: ''})
  const [alert, setAlertOpen] = useState({ isOpen: false, handlerName: '', message: ''})

  useEffect(() => {
    !login.isLogged? history.push('/login') : fetchLock(setGhostLock)
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
    requireLock({form, login, setReserve, setGhostLock, setGrpcPort, setAlertOpen})
  }

  const handleRelease = e => {
    releaseLock(form, login, setReserve, setGhostLock)
  }

  const handleDryrun = e => {
    if(isReserved){
      fetchGrpcDiskSize(setDiskSize, form, grpcPort)
      fetchGrpcTableDefinition(setTableDefinition, form, grpcPort)
      fetchGrpcGhostDryrun(setDryrunResult, form, grpcPort)
      setForm(prevForm => {
        return {...form, dryrun: true};
      })
    }else{
      setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleDryrun" , message: "Reserve the host first"}})
    }
  }

  const handleExecute = e => {
    form.dryrun ? setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "handleExecute", message: 'You request to ALTER.'}}) : alert('Run test first before execute')
  }

  const handleInteractive = e => {
    fetchGrpcGhostInteractive(setInteractiveResult, form, grpcPort)
  }

  const handleCutover = e => {
    fetchGrpcGhostCutover(setCutoverResult, form, grpcPort)
  }

  const handleAbort = e => {
    //to-do
  }

  const handleCleanup = e => {
    //to-do
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  const handleChange = (e) => {
    const { name, value }  = e.target
    setForm(prop => {
      return {...prop, [name]: value};
    })
  };



  const handleClose = e => {
    setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "", message: ''}})
  }

  const handleProceed = e => {
    setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen,}})
    if (modal.handlerName === "handleExecute" ) { fetchGrpcGhostExecute({setExecuteResult, form, grpcPort, modal, dispatch}) }
  }


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
                return <Alert severity="info" key={i}>{item.ghost_host} is {item.lock_status} by {item.user_name} </Alert>
              })}
              <Collapse in={alert.isOpen}>
                <Alert severity="warning" action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setAlertOpen(prop =>{return{...prop, isOpen: false,}});}}> <CloseIcon fontSize="inherit" /> </IconButton>}>
                  {alert.message}
                </Alert>
              </Collapse>
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
              <Button className={classes.button} color="secondary" type='submit' name="execute" onClick={handleExecute}>Alter</Button>
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
              <Button className={classes.button} color="secondary" type='submit' onClick={handleAbort}>Abort</Button>
              <Button className={classes.button} color="secondary" type='submit' onClick={handleCleanup}>Clean Up</Button>
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
      <Modal open={modal.isOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <DialogContent>
        <div className={classes.modal}>
          <p id="simple-modal-title"> {modal.message}</p>
          <p id="simple-modal-description"> Are you sure?</p>
          <Button className={classes.button} color="primary"   type='submit' onClick={handleClose}>  Cancel </Button>
          <Button className={classes.button} color="secondary" type='submit' onClick={handleProceed}>Proceed</Button>
        </div>
        </DialogContent>
      </Modal>
    </div>
  );

};

export default withStyles(styles)(Ghost);
