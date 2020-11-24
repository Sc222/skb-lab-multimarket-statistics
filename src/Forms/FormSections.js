import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {Route, Switch as RouteSwitch} from 'react-router-dom';

import {HomepageUrl} from "../App";
import FormSectionStyles from "../Styles/FormSectionStyles";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function FormSections() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar variant="dense">
                    <Typography component="h1" variant="h6" color="inherit" noWrap
                                className={classes.titleCentered}>
                        Multimarket Statistics
                    </Typography>
                </Toolbar>
            </AppBar>
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth="sm">
                <Paper elevation={2} className={classes.paper}>
                    <RouteSwitch>
                        <Route path={`/${HomepageUrl}/login/`}>
                            <Login/>
                        </Route>
                        <Route path={`/${HomepageUrl}/register/`}>
                            <Register/>
                        </Route>
                        <Route path={`/${HomepageUrl}/password-reset/`}>
                            <PasswordReset/>
                        </Route>
                    </RouteSwitch>
                </Paper>
            </Container>
        </main>
        </div>
    );
}
