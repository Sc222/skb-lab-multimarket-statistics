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
import demoAppIcon from "../../images/demo_app_icon.png";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import {CloseRounded} from "@material-ui/icons";

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
        /*textAlign:"center" todo toolbar title styles here*/
    },

    /*TODO FIX SMOOTH PERSISTENT DRAWER OPEN ANIMATION*/
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

    let {appname} = useParams();

    const username = props.username;
    const [app, setApp] = React.useState(undefined);

    useEffect(() => {

        // todo temporary
        const apps = {
            'sc222': {
                "pixel-fishing": {
                    icon: demoAppIcon,
                    title: "Pixel Fishing",
                    id: "pixel-fishing",
                    description: "Clicker game where you need to catch fish very fast",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: true, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                },
                "sesc-schedule": {
                    icon: demoAppIcon,
                    title: "Sesc Schedule",
                    id: "sesc-schedule",
                    description: "Application with class timetable of Specialized Educational Scientific Centre",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: true, link: "https://appgallery.huawei.com/"}
                    ]
                },
                "volume-manager": {
                    icon: demoAppIcon,
                    title: "Volume Manager",
                    id: "volume-manager",
                    description: "Application to automate volume changes of your device",
                    markets: [
                        {disabled: true, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                },
                "one-ring": {
                    icon: demoAppIcon,
                    title: "One Ring",
                    id: "one-ring",
                    description: "Integrate your One Ring device with Samsung SmartThings smart home system",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                }
            },
            'neoezop': {
                "nazvanie-prilozhenia-1": {
                    icon: demoAppIcon,
                    title: "Название приложения 1",
                    id: "nazvanie-prilozhenia-1",
                    description: "Достаточно длинное описание приложение длиной в две строки",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: true, link: "https://www.apple.com/app-store/"},
                        {disabled: true, link: "https://appgallery.huawei.com/"}
                    ]
                },
                "nazvanie-prilozhenia-2": {
                    icon: demoAppIcon,
                    title: "Название приложения 2",
                    id: "nazvanie-prilozhenia-2",
                    description: "Достаточно длинное описание приложение длиной в две строки",
                    markets: [
                        {disabled: true, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: true, link: "https://appgallery.huawei.com/"}
                    ]
                },
                "nazvanie-prilozhenia-3": {
                    icon: demoAppIcon,
                    title: "Название приложения 3",
                    id: "nazvanie-prilozhenia-3",
                    description: "Достаточно длинное описание приложение длиной в две строки",
                    markets: [
                        {disabled: true, link: "https://play.google.com/store/apps"},
                        {disabled: true, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                },
                "nazvanie-prilozhenia-4": {
                    icon: demoAppIcon,
                    title: "Название приложения 4",
                    id: "nazvanie-prilozhenia-4",
                    description: "Достаточно длинное описание приложение длиной в две строки",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                }
            },
            'refusedguy': [],
            'yakiy_pes': []
        };

        console.log(apps[username][appname]);
        console.log(username + "" + appname);

        setApp(apps[username][appname]);

    }, []);

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
                            to={`${HomepageUrl}/user/${username}/apps`}
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
                            to={`${HomepageUrl}/user/${username}/apps`}
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
                        <Route path={`${HomepageUrl}/user/:username/app/:appname/dashboard`}>
                            <ApplicationDashboard username={username} app={app}/>
                        </Route>
                        {/*<Route path={`${HomepageUrl}/user/:username/app/:appname/settings`}>
                                <Applications username={username}/>
                            </Route>*/}
                    </RouteSwitch>
                </Container>
            </main>
        </div>
    );
}