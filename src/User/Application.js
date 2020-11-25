import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

//image imports
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Orders from "../Dashboard/Orders";
import Deposits from "../Dashboard/Deposits";
import Chart from "../Dashboard/Chart";
import DrawerMenu from "../Dashboard/DrawerMenu";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";

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

export default function Application(props) {
    const classes = useStyles();

    const isDrawerOpen = props.isDrawerOpen;
    const username = props.username;

    const theme = useTheme();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <div className={classes.root}>
            <Drawer
                variant={'permanent'}
                classes={{
                    paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
                }}
                anchor={'left'}
                open={isDrawerOpen}
                /*onClose={isMediumDevice ? setDrawerOpen(false) : null}*/>
                <div className={classes.appBarSpacer}/>
                <Box mx={3} my={1.5} width={'auto'}>
                    <Button
                        className={classes.backToAppsButton}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<ArrowBackRoundedIcon/>}
                        component={RouterLink}
                        to={`/${HomepageUrl}/user/${username}/apps`}
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
                </Container>
            </main>
        </div>
    );
}