import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

//Styles
import { navMateStyles as styles } from '../styles';
import { withStyles } from '@material-ui/core/styles';
import { Menu, AppBar, Toolbar, Typography, Button, IconButton,MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavMate = ({classes}) => {

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [title, setTitle] = useState('Login');

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    var name = event.target.name;
    var prevTitle = title;
    setAnchorEl(null);
    name !== undefined ? setTitle(name) : setTitle(title)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Fragment>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to='/login' name='Login'>Login</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/ghost' name='Ghost'>Ghost</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/ghost2' name='Ghost2'>Ghost2</MenuItem>
              </Menu>
          </Fragment>
          <Typography variant="h5" className={classes.title}>
            Mango Juice
          </Typography>
          <Link className={classes.link} to='/login'> 
            <Button  color="inherit" >Login</Button> 
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );

}


export default withStyles(styles)(NavMate);