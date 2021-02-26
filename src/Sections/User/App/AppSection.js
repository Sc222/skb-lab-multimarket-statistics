import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, Route, Switch as RouteSwitch, useParams} from "react-router-dom";
import AppDashboard from "./AppDashboard";
import AppSettings from "./AppSettings";
import AppRatingsSection from "./AppRatingsSection";
import AppReviewsSection from "./AppReviewsSection";
import {HomepageUrl} from "../../../App";
import {getApp} from "../../../Api/ApiApp";
import {NoContent} from "../../../Api/Helpers/ApiHelper";

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        height: '48px'
    },

    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    backToAppsButton: {
        width: '100%'
    },

    mobileDrawerButtonsContainer: {
        position: "relative",
    },

    closeDrawerButton: {
        position: "absolute",
        top: theme.spacing(0.25),
        right: theme.spacing(0.5)
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    drawerPaper: {
        zIndex: theme.zIndex.drawer,

        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    profileIconButton: {
        marginLeft: theme.spacing(1.5),
        padding: 0
    },
    profileIcon: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    }

}));

export default function AppSection(props) {
    const classes = useStyles();

    let {appId} = useParams();

    const userId = props.userId;
    const [app, setApp] = React.useState(undefined);
    const [appExists, setAppExists] = React.useState(true);

    function updateAppInSection(newApp) {
        console.log("update app from settings")
        console.log(newApp);
        setApp(newApp);
    }

    useEffect(() => {
        getApp(userId, appId)
            .then(app => {
                console.log("load app");
                console.log(app);
                setApp(app);
            })
            .catch(err => {
                if (err.message === NoContent)
                    setAppExists(false);
                console.log(err.message);
            });
    }, [userId, appId]);

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <RouteSwitch>
                        {!appExists && <Redirect to={`${HomepageUrl}/user/${userId}/apps/`}/>}
                        <Route exact path={`${HomepageUrl}/user/:userId/app/:appId/`}>
                            <AppDashboard userId={userId} app={app} appId={appId}
                                          updateIsTokenExpired={props.updateIsTokenExpired}
                                          updateUserNotifications={props.updateUserNotifications}
                                          showStatusAlert={props.showStatusAlert}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/app/:appId/ratings`}>
                            <AppRatingsSection userId={userId} app={app} appId={appId}
                                               updateIsTokenExpired={props.updateIsTokenExpired}
                                               showStatusAlert={props.showStatusAlert}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/app/:appId/reviews`}>
                            <AppReviewsSection userId={userId} app={app} appId={appId}
                                               updateIsTokenExpired={props.updateIsTokenExpired}
                                               showStatusAlert={props.showStatusAlert}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/app/:appId/settings`}>
                            <AppSettings userId={userId} app={app} appId={appId}
                                         showStatusAlert={props.showStatusAlert}
                                         updateAppInSection={updateAppInSection}
                                         updateIsTokenExpired={props.updateIsTokenExpired}
                                         updateUserNotifications={props.updateUserNotifications}/>
                        </Route>
                        <Redirect to={`${HomepageUrl}/user/${userId}/app/${appId}/`}/>
                    </RouteSwitch>
                </Container>
            </main>
        </div>
    );
}