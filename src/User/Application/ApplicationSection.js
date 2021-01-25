import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

//image imports
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import DrawerMenu from "./DrawerMenu";
import {Link as RouterLink, Route, Switch as RouteSwitch, useParams} from "react-router-dom";
import {HomepageUrl} from "../../App";
import ApplicationDashboard from "./ApplicationDashboard";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import {CloseRounded} from "@material-ui/icons";
import {getApp} from "../../Api/ApiApp";

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

export default function ApplicationSection(props) {
    const classes = useStyles();

    let {appId} = useParams();

    const userId = props.userId;
    const [app, setApp] = React.useState(undefined);

    useEffect(() => {
        console.log(userId);
        console.log(appId);
        getApp(userId,appId)
            .then(app => {
                console.log("load app");
                console.log(app);
                setApp(app);
                //TODO IF APP 204 -> REDIRECT TO CURRENT USER
            })
            .catch(err => console.log(err.message)); //todo if app is wrong -> redirect to homepage
    }, [userId, appId]);

    return (
        <div className={classes.root}>
            <Hidden smUp>
                <Drawer
                    variant='temporary'
                    classes={{
                        paper: clsx(classes.drawerPaper, !props.isDrawerOpen && classes.drawerPaperClose),
                    }}
                    anchor={'left'}
                    open={props.isDrawerOpen}
                    onClose={props.changeDrawerState}>
                    <Box ml={1} pr={5} my={1.5} width={'auto'} className={classes.mobileDrawerButtonsContainer}>
                        <Button
                            className={classes.backToAppsButton}
                            variant="outlined"
                            color="primary"
                            size="medium"
                            startIcon={<ArrowBackRoundedIcon/>}
                            component={RouterLink}
                            to={`${HomepageUrl}/user/${userId}/apps`}
                        >
                            Все приложения
                        </Button>
                        <IconButton className={classes.closeDrawerButton} size='small'
                                    onClick={props.changeDrawerState}>
                            <CloseRounded/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    <DrawerMenu/>
                </Drawer>
            </Hidden>
            <Hidden xsDown>
                <Drawer
                    variant='permanent'
                    classes={{
                        paper: clsx(classes.drawerPaper, !props.isDrawerOpen && classes.drawerPaperClose),
                    }}
                    open={props.isDrawerOpen}>
                    <div className={classes.appBarSpacer}/>
                    <Box mx={3} my={1.5} width={'auto'}>
                        <Button
                            className={classes.backToAppsButton}
                            variant="outlined"
                            color="primary"
                            size="medium"
                            startIcon={<ArrowBackRoundedIcon/>}
                            component={RouterLink}
                            to={`${HomepageUrl}/user/${userId}/apps`}
                        >
                            Все приложения
                        </Button>
                    </Box>
                    <Divider/>
                    <DrawerMenu/>
                </Drawer>
            </Hidden>

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>

                    <RouteSwitch>
                        <Route path={`${HomepageUrl}/user/:userId/app/:appId/dashboard`}>
                            <ApplicationDashboard userId={userId} app={app}/>
                        </Route>
                        {/*<Route path={`${HomepageUrl}/user/:userId/app/:appId/settings`}>
                                <Applications userId={userId}/>
                            </Route>*/}
                        {/*TODO ADD REDIRECT TO APP DASHBOARD IF WRONG ROUTE*/}
                    </RouteSwitch>
                </Container>
            </main>
        </div>
    );
}