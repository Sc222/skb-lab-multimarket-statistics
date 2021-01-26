import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {Route,Redirect, Switch as RouteSwitch} from 'react-router-dom';

import {HomepageUrl} from "../App";
import FormSectionStyles from "../Styles/FormSectionStyles";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function FormSections() {
    const classes = useStyles();

    const [user, setUser] = React.useState(undefined);

    {/*TODO !!! CHANGE LOGIN/REGISTER REDIRECT WHEN AUTH ADDED*/}
    function setLoggedInUser(user) {
        setUser(user);
    }

    /* todo add same height appbar spacer as in user section */

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
                <Container maxWidth="sm" className={classes.containerWithYPadding}>
                    <div className={classes.appBarSpacer}/>
                    <Paper elevation={2} className={classes.paper}>
                        <RouteSwitch>
                            {/*TODO !!! CHANGE LOGIN/REGISTER REDIRECT WHEN AUTH ADDED*/}
                            {user && <Redirect to={`${HomepageUrl}/user/${user.id}/apps`}/>}

                        <Route path={`${HomepageUrl}/login/`}>
                            <Login setLoggedInUser={setLoggedInUser}/>
                        </Route>
                            <Route path={`${HomepageUrl}/register/`}>
                                <Register setLoggedInUser={setLoggedInUser}/>
                            </Route>

                            {/* TODO: PASSWORD-RESET IN DEVELOPMENT
                            <Route path={`${HomepageUrl}/password-reset/`} component={PasswordReset}/>
                            */}
                        </RouteSwitch>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}
