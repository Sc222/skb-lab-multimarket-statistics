import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//todo move to separate class
const useStyles = makeStyles((theme) => ({
    titleCentered: {
        flexGrow: 1,
        textAlign: "center"
    }
}));

export default function SimpleToolbar() {
    const classes = useStyles();
    return (
        <AppBar position="absolute">
            <Toolbar variant="dense">
                <Typography component="h1" variant="h6" color="inherit" noWrap
                            className={classes.titleCentered}>
                    Multimarket Statistics
                </Typography>
            </Toolbar>
        </AppBar>);
}
