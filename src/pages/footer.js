import React from 'react';

//Styles
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import { footerStyles as styles } from '../styles'
import { Paper, Grid, Typography } from '@material-ui/core';

const Footer = ({classes}) => {

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <Typography className={classes.text} >Moombbu Juice</Typography>
                        <Typography variant="caption" gutterBottom>@copyright SRE 2020</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

}

export default withStyles(styles)(Footer)