import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import DrawerMenu from "./DrawerMenu";
import {MenuRounded} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//image imports
import demoProfile from '../../images/demo_profile.png';
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        height:'48px'
    },

    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    backToAppsButton:{
        width:'100%'
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

export default function ApplicationDashboard() {
    const classes = useStyles();
    const theme = useTheme();
    // responsive: change drawer type when medium device
    const isMediumDevice = useMediaQuery(theme.breakpoints.down('md'));
    const [isDrawerOpen, setDrawerOpen] = React.useState(true);
    const [notifications, setNotifications] = React.useState(undefined);
    const changeDrawerState = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        //document.title='';

        console.log("componentDidMount");
        // todo load notifications from server
        setNotifications(['1','2']);

        // todo application route params
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="change drawer state"
                        onClick={changeDrawerState}
                        className={classes.menuButton}
                    >
                        {isDrawerOpen ? <ArrowBackRoundedIcon/> : <MenuRounded/>}
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Multimarket Statistics
                    </Typography>

                    {/*todo show notifications menu on click*/}
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications?.length} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>

                    {/*todo load profile picture from server*/}
                    <IconButton className={classes.profileIconButton} color='inherit'>
                    <Avatar className={classes.profileIcon} alt='Profile picture' src={demoProfile}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMediumDevice ? 'temporary' : 'permanent'}
                classes={{
                    paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
                }}
                anchor={'left'}
                open={isDrawerOpen}
                /*onClose={isMediumDevice ? setDrawerOpen(false) : null}*/>
                {
                    isMediumDevice
                        ? <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="change drawer state"
                            onClick={changeDrawerState}
                        >
                            {isDrawerOpen ? <ArrowBackRoundedIcon/> : <MenuRounded/>}
                        </IconButton>
                        : <div className={classes.appBarSpacer}/>
                }
                <Box mx={3} my={1.5} width={'auto'}>
                    <Button
                        className={classes.backToAppsButton}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<ArrowBackRoundedIcon/>}
                    >
                        Все приложения
                    </Button>
                </Box>
                <Divider/>
                <DrawerMenu/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart/>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Deposits/>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Orders/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}
