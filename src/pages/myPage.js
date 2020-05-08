import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { updatePassword } from '../apicall';
import { useSelector } from 'react-redux';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { loginStyles as styles } from '../styles'
import { Paper, Grid, TextField, Button, Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


//Alerts
import Alert from '@material-ui/lab/Alert';


const MyPage = ({classes}) => {
    
    const login = useSelector(state => state.loginReducer);
    const history = useHistory();

    const [open, setOpen] = useState({isOpen : false, severity : "warning", message : ""});
    const [form, setForm] = useState({
        password: '',
        new_password: '',
        confirm_password: ''
    })

    useEffect(() => {
        if(!login.isLogged) history.push('/login')
    },[])

    const handleChange = e => {
        const  { name, value } = e.target
        setForm(prop => { return { ...prop, [name]: value }})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        updatePassword({form, login, setOpen})
    }
    

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Paper className={classes.paper}>
                    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField className={classes.textfield} id="password"         label="Password"              type='password' name='password'         onChange={handleChange}/><br/>
                        <TextField className={classes.textfield} id="new_password"     label="Type New Password"     type='password' name='new_password'     onChange={handleChange}/><br/>
                        <TextField className={classes.textfield} id="confirm_password" label="Confirm New Password"  type='password' name='confirm_password' onChange={handleChange}/><br/>
                        <Button className={classes.button} color="primary" type='submit'>Change password</Button>
                    </form>
                    <Collapse in={open.isOpen}>
                        <Alert severity={open.severity} action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(prop =>{return{...prop, isOpen: false,}});}}> <CloseIcon fontSize="inherit" /> </IconButton>}>
                            {open.message}
                        </Alert>
                    </Collapse>
                </Paper>    
            </Grid>
        </Grid>
    )
}
export default withStyles(styles)(MyPage);