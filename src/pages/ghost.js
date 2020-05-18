import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
//import '../App.css';

import { fetchGrpcDiskSize, fetchGrpcTableDefinition, fetchGrpcGhostDryrun, fetchGrpcGhostExecute, fetchGrpcGhostInteractive, fetchGrpcGhostCutover,
fetchGrpcIbdSize, fetchGrpcRowCount,
fetchGrpcGhostPutPanicFlag, fetchGrpcGhostCleanUp,
fetchLock, requireLock, releaseLock, executeLock } from '../apicall';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { ghostStyles as styles } from '../styles'
import { Paper, Grid, TextField, Button, Modal, DialogContent, Collapse, IconButton, Snackbar, FormControl } from '@material-ui/core';
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
    document.title = "Ghost"
    !login.isLogged? history.push('/login') : fetchLock(setGhostLock)
  },[])


  const [form, setForm] = useState({
    ghosthost: '',
    dir: '',
    datadir: '',
    schemaname: '',
    tablename: '',
    statement: '',
    dryrun: false,
    ghostcommand: ''
  });

  const [muliAlertOpen, setMuliAlertOpen] = useState({
    isOpen: false,
    severity: '',
    message: ''
  })

  const [isReserved, setReserve] = useState(false);
  const [diskSize, setDiskSize] = useState('');
  const [ibdSize, setIbdSize] = useState('');
  const [rowCount, setRowCount] = useState('');
  const [tableDefinition, setTableDefinition] = useState([]);
  const [dryrunResult, setDryrunResult] = useState('');
  const [executeResult, setExecuteResult] = useState('');
  const [interactiveResult, setInteractiveResult] = useState('');
  const [cutoverResult, setCutoverResult] = useState('');
  const [panicflagResult, setPanicFlagResult] = useState('');



  const handleReserve = e => {
    requireLock({form, login, setReserve, setGhostLock, setGrpcPort, setAlertOpen})
  }

  const handleRelease = e => {
    //releaseLock(form, login, setReserve, setGhostLock)
    if(isReserved) setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "handleRelease", message: 'You request to Release.'}})
  }

  const handleDryrun = e => {
    if(isReserved){
      fetchGrpcDiskSize(setDiskSize, form, grpcPort)
      fetchGrpcTableDefinition(setTableDefinition, form, grpcPort)
      fetchGrpcGhostDryrun({setDryrunResult, form, grpcPort, setMuliAlertOpen})
      //to-do ibdsize
      fetchGrpcIbdSize({setIbdSize, form, grpcPort})
      //to-do table_rows
      fetchGrpcRowCount({ setRowCount, form, grpcPort })
      setForm(prop => {
        return {...prop, dryrun: true};
      })
    }else{
      setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleDryrun" , message: "Reserve the host first"}})
    }
  }

  const handleExecute = e => {
    isReserved && form.dryrun? setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "handleExecute", message: 'You request to ALTER.'}}) :
      setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleDryrun" , message: "Run test first before execute"}})
      //alert('Run test first before execute')
  }

  const handleInteractive = e => {
    isReserved? fetchGrpcGhostInteractive(setInteractiveResult, form, grpcPort) : setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleInteractive" , message: "Reserve the host first"}})
  }

  const handleCutover = e => {
    //fetchGrpcGhostCutover({setCutoverResult, form, grpcPort, setMuliAlertOpen})
    isReserved? setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "handleCutover", message: 'You request to CUTOVER.'}}) : setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleCutover" , message: "Reserve the host first"}})
  }

  const handleAbort = e => {
    //fetchGrpcGhostPutPanicFlag( { setPanicFlagResult, grpcPort, setMuliAlertOpen })
    isReserved? setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "handleAbort", message: 'You request to ABORT.'}}) : setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleAbort" , message: "Reserve the host first"}})
  }

  const handleCleanup = e => {
    isReserved? setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "handleCleanup", message: 'You request to Clean up.'}}) : setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "handleCleanup" , message: "Reserve the host first"}})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  const handleChange = (e) => {
    const { name, value }  = e.target
    setReserve(false)
    setForm(prop => {
      return {...prop, [name]: value, dryrun: false};
    })
  };



  const handleClose = e => {
    setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen, handlerName: "", message: ''}})
  }

  const handleProceed = e => {
    setModalOpen(prop => {return { ...prop, isOpen : !prop.isOpen,}})
    if (modal.handlerName === "handleExecute" ) {
      fetchGrpcGhostExecute({setExecuteResult, setMuliAlertOpen, form, grpcPort, modal, dispatch})
      executeLock({form, login, setReserve, setGhostLock})
    } else if (modal.handlerName === "handleRelease") {
      releaseLock({form, login, setReserve, setGhostLock})
      setReserve(false)
      setForm(prop => {
        return {...prop, dryrun: false};
      })
    }
    else if (modal.handlerName === "handleAbort") { fetchGrpcGhostPutPanicFlag( { setPanicFlagResult, grpcPort, setMuliAlertOpen })}
    else if (modal.handlerName === "handleCleanup") { fetchGrpcGhostCleanUp( { grpcPort, setMuliAlertOpen })}
    else if (modal.handlerName === "handleCutover") { fetchGrpcGhostCutover( { grpcPort, setMuliAlertOpen })}
  }

  const MuliAlert = props => {
    return <Alert elevation={6} variant="filled" {...props} />;
  }

  const handleMuliAlerClose = (event, reason) => {
    if (reason === 'clickaway') {
      setMuliAlertOpen( prop => {
        return {...prop,
          isOpen: false,
        }
      });
    }
    setMuliAlertOpen( prop => {
      return {...prop,
        isOpen: false,
      }
    });

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
                return <Alert severity="info" key={i}>{item.ghost_host} is {item.lock_status} by {item.user_name} </Alert>
              })}
              { isReserved? '' : <Alert severity="warning"> Please lock action before click any buttons.</Alert>}
              <Paper className={classes.paper}>
                <TextField className={classes.textField} id="ghostHost" label="Ghost Host" name="ghosthost" onChange={handleChange}/><br/>
                <Button className={classes.button} color="primary" type='submit' onClick={handleReserve}>Lock Operation</Button>
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
              <TextField id="datadir" label="MySQL Data Directory" name='datadir' onChange={handleChange}/><br/>
              <TextField className={classes.textField} id="schemaname" label="Schema Name" name="schemaname" onChange={handleChange}/><br/>
              <TextField className={classes.textField} id="tablename" label="Table Name" name="tablename" onChange={handleChange}/><br/>
              <Button className={classes.button} color="primary" type='submit' onClick={handleDryrun}>Test</Button>
              <Button className={classes.button} color="secondary" type='submit' name="execute" onClick={handleExecute}>Alter</Button>
            </Paper>
          </Grid>
          {/*
            Interactive Grid
          */}
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FormControl fullWidth className={classes.margin}>
                <TextField className={classes.textField} id="statement" label="Statement" name="statement" onChange={handleChange}/><br/>
                <TextField className={classes.textField} id="ghostcommand"  label="Ghost Command" name="ghostcommand" onChange={handleChange}/><br/>
              </FormControl>
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
                }else if(item.match(/cut-over;/gi) !== null) {
                  return <span style={{color: "blue"}} key={i}>{item}<br/></span>
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
              { diskSize === '' ? '' : <li> Available disk size is {diskSize} </li> } <br/>
              { ibdSize  === '' ? '' : <li> Ibd size is {ibdSize} </li> } <br/>
              { rowCount  === '' ? '' : <li> Row count is {rowCount} </li> } <br/>
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


      {
        //form.ghosthost !== '' ? form.ghosthost : ''
        //panicflagResult !== '' ? panicflagResult : ''
        //executeResult !== '' ? executeResult : ''
      }

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
      <Snackbar open={muliAlertOpen.isOpen} autoHideDuration={6000} onClose={handleMuliAlerClose}>
        <MuliAlert onClose={handleMuliAlerClose} severity={muliAlertOpen.severity}>{muliAlertOpen.message}</MuliAlert>
      </Snackbar>
    </div>
  );

};

export default withStyles(styles)(Ghost);
