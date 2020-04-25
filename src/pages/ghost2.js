import React, { useState, useEffect } from 'react';
//import '../App.css';
import { useSelector } from 'react-redux';
import { fetchGrpcDiskSize, fetchGrpcTableDefinition, fetchGrpcGhostDryrun, fetchGrpcGhostExecute, fetchGrpcGhostInteractive, fetchGrpcGhostCutover,
         fetchLock } from '../apicall';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ghostStyles as styles } from '../styles';

const Ghost2 = ( {classes, title } ) => {
  const login = useSelector(state => state.loginReducer);

  const [ghostLock, setGhostLock] = useState([]);

  useEffect(() => {
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
  const [tableDefinition, setTableDefinition] = useState('');
  const [dryrunResult, setDryrunResult] = useState('');
  const [executeResult, setExecuteResult] = useState('');
  const [interactiveResult, setInteractiveResult] = useState('');
  const [cutoverResult, setCutoverResult] = useState('');

  const handleReserve = e => {
    setReserve(true)
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



/*
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>lock_id</th>
              <th>ghost_host</th>
              <th>user_name</th>
              <th>lock_status</th>
            </tr>
          </thead>
          {ghostLock.map((item, i) => {
            return <tbody key={i}>
                    <tr>
                      <td>{item.lock_id}</td>
                      <td>{item.ghost_host}</td>
                      <td>{item.user_name}</td>
                      <td>{item.lock_status}</td>
                    </tr>
                   </tbody>
          })}
        </table>
      </div>
      { login.isLogged ? <h3>Loggedin</h3> : <h3>Login requried</h3> }
      <form onSubmit={handleSubmit}>
        <p><label htmlFor='ghosthost'>Ghost host:</label></p>
        <p><input type='text' placeholder="Ghost host" name='ghosthost' onChange={handleChange}></input></p>
      { form.ghosthost !== '' ? form.ghosthost : '' }
        <p><label htmlFor='dir'>Directory:</label></p>
        <p><input type='text' placeholder="Directory" name='dir' onChange={handleChange}></input></p>
      { diskSize !== '' ? diskSize : '' }
        <p><label htmlFor='schemaname'>Schema Name:</label></p>
        <p><input type='text' placeholder="Schema Name" name='schemaname' onChange={handleChange}></input></p>
        <p><label htmlFor='tablename'>Schema Name:</label></p>
        <p><input type='text' placeholder="Table Name" name='tablename' onChange={handleChange}></input></p>
      { tableDefinition !== '' ? tableDefinition : '' }
        <p><label htmlFor='statement'>Schema Name:</label></p>
        <p><input type='text' placeholder="Statement" name='statement' onChange={handleChange}></input></p>
      { dryrunResult !== '' ? dryrunResult : '' }
        <p><input type='text' placeholder="Ghost Command" name='ghostcommand' onChange={handleChange}></input></p>
        <p><input type='submit' name='reserve' value='Reserve' onClick={handleReserve}></input></p>
        <p><input type='submit' name='dryrun' value='Dry Run' onClick={handleDryrun}></input></p>
        <p><input type='submit' name='execute' value='Execute' onClick={handleExecute}></input></p>
        <p><input type='submit' name='interactive' value='interactive' onClick={handleInteractive}></input></p>
        <p><input type='submit' name='cutover' value='cutover' onClick={handleCutover}></input></p>
      </form>
      <p>dir:{ form.dir }</p>
      <p>schemaname:{ form.schemaname }</p>
      <p>tablename:{ form.tablename }</p>
      { executeResult !== '' ? executeResult : '' }
      { interactiveResult !== '' ? interactiveResult : '' }
      { cutoverResult !== '' ? cutoverResult : '' }
    </div>
  );*/


  /*
  const GhostBreakpoints = withStyles(styles)(({ classes }) => (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3 {form.ghosthost}
          <p><label htmlFor='ghosthost'>Ghost host:</label></p>
        <p><input type='text' placeholder="Ghost host" name='ghosthost' onChange={handleChange}></input></p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3</Paper>
        </Grid>
      </Grid>
    </div>
  ));
  return (<GhostBreakpoints/>);

  */


  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3 {form.ghosthost}
          <p><label htmlFor='ghosthost'>Ghost host:</label></p>
        <p><input type='text' placeholder="Ghost host" name='ghosthost' onChange={handleChange}></input></p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=6 md=3</Paper>
        </Grid>
      </Grid>

      Title: {title}
    </div>
  );


};

export default withStyles(styles)(Ghost2)