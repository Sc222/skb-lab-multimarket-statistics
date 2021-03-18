import React, {useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Redirect, Route, Switch as RouteSwitch, useLocation, useParams} from "react-router-dom";
import {HomepageUrl} from "../../App";
import Apps from "./Apps";
import AppSection from "./App/AppSection";
import NewApplication from "./NewApp";
import Profile from "./Profile";
import {getNotifications} from "../../Api/ApiNotification";
import {getUser} from "../../Api/ApiUser";
import {getDefaultUser} from "../../Api/Helpers/ApiUserHelper";
import {getCookieUserId, isCookieTokenExpired, isUserLoggedIn} from "../../Helpers/CookieHelper";
import WrongUser from "./WrongUser";
import StatusAlert from "../../Components/StatusAlert";
import {ErrorUnauthorized} from "../../Api/Helpers/ApiHelper";
import ServiceNameAndLogo from "../../Components/ServiceNameAndLogo";
import LoggedInUserToolbarMenu from "../../Components/LoggedInUserToolbarMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    }
}));

export default function UserSection() {
    let {userId} = useParams();
    let currentUrl = useLocation(); //used to redirect when token cookie expires
    const statusAlert = useRef();

    const classes = useStyles();

    const [isTokenExpired, setIsTokenExpired] = React.useState(isCookieTokenExpired());
    const [notifications, setNotifications] = React.useState(undefined);
    const [user, setUser] = React.useState(getDefaultUser());

    React.useEffect(() => {
        if (!isTokenExpired)
            setIsTokenExpired(isCookieTokenExpired());
    }, [currentUrl]);

    const updateUserNotifications = (newNotifications) => {
        setNotifications(newNotifications);
    };

    const showStatusAlert = (message, severity) => {
        statusAlert.current?.show(message, severity);
    };

    function updateIsTokenExpired(message) {
        if (!isTokenExpired && message.endsWith(ErrorUnauthorized)) {
            console.log("TOKEN IS EXPIRED: " + message);
            setIsTokenExpired(true);
        }
    }

    useEffect(() => {
        console.log(userId);

        Promise.all([getNotifications(userId), getUser(userId)])
            .then(([notifications, user]) => {
                console.log("load notifications");
                console.log(notifications);
                setNotifications(notifications);
                setUser(user);
            })
            .catch(err => {
                showStatusAlert("Не удалось получить данные", "error");
                updateIsTokenExpired(err.message);
                console.log(err.message);
            });
    }, []);

    return (
        <RouteSwitch>
            {/*redirect to login if userId exists but no token*/}
            {(isTokenExpired || !isUserLoggedIn()) &&
            <Redirect to={{pathname: `${HomepageUrl}/login`, search: `?referer=${currentUrl.pathname}`}}/>}

            {/*redirect to current user if wrong user*/}
            {isUserLoggedIn() && getCookieUserId() !== userId && <WrongUser/>}

            <div className={classes.root}>
                <AppBar position="absolute">
                    <Toolbar variant="dense">
                        <ServiceNameAndLogo/>
                        <LoggedInUserToolbarMenu
                            userId={userId}
                            user={user}
                            notifications={notifications}
                            updateIsTokenExpired={updateIsTokenExpired}
                            showStatusAlert={showStatusAlert}
                            updateUserNotifications={updateUserNotifications}
                        />
                    </Toolbar>
                </AppBar>
                <StatusAlert ref={statusAlert}/>
                <main className={classes.content}>
                    <RouteSwitch>
                        <Route exact path={`${HomepageUrl}/user/:userId/apps`}>
                            <Apps userId={userId}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/new-app`}>
                            <NewApplication updateIsTokenExpired={updateIsTokenExpired} userId={userId}
                                            showStatusAlert={showStatusAlert}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/profile`}>
                            <Profile updateIsTokenExpired={updateIsTokenExpired} userId={userId}
                                     updatePopoverUser={setUser} showStatusAlert={showStatusAlert}/>
                        </Route>
                        <Route path={`${HomepageUrl}/user/:userId/app/:appId`}>
                            <AppSection updateIsTokenExpired={updateIsTokenExpired} userId={userId}
                                        showStatusAlert={showStatusAlert}
                                        updateUserNotifications={updateUserNotifications}/>
                        </Route>
                        <Redirect to={`${HomepageUrl}/user/${userId}/apps`}/>
                    </RouteSwitch>
                </main>
            </div>
        </RouteSwitch>
    );
}