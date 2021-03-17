import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Redirect, Route, Switch as RouteSwitch, useLocation} from 'react-router-dom';
import {HomepageUrl} from "../../App";
import {useFormSectionStyles} from "../../Styles/FormSectionStyles";
import Login from "./Login";
import Register from "./Register";
import ServiceNameAndLogo from "../../Components/ServiceNameAndLogo";
import {getCookieUserId, isUserLoggedIn} from "../../Helpers/CookieHelper";

export default function FormsSection() {
    const urlQueryParams = new URLSearchParams(useLocation().search);
    const referer = urlQueryParams.get("referer");

    const classes = useFormSectionStyles();

    const [user, setUser] = React.useState(undefined);

    useEffect(() => {
        console.log("MOUNT FORMS");
    }, []);

    function setLoggedInUser(user) {
        console.log(user);
        setUser(user);
    }

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar variant="dense">
                    <ServiceNameAndLogo centered/>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Container maxWidth="sm" className={classes.containerWithYPadding}>
                    <div className={classes.appBarSpacer}/>
                    <Paper elevation={2} className={classes.paper}>
                        <RouteSwitch>
                            {isUserLoggedIn() &&
                            <Redirect to={referer ? referer : `${HomepageUrl}/user/${getCookieUserId()}/apps`}/>}
                            {console.log("WE ARE IN FORM SECTIONS")}
                            {user && console.log("redirect to apps")}
                            {user && <Redirect to={referer? referer : `${HomepageUrl}/user/${user.id}/apps`}/>}

                            <Route exact path={`${HomepageUrl}/login`}>
                                <Login setLoggedInUser={setLoggedInUser}/>
                            </Route>
                            <Route exact path={`${HomepageUrl}/register`}>
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
