import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Avatar from "@material-ui/core/Avatar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//image imports
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {MarketsInfo} from "../../Constants/MarketsInfo";
import MarketChipStyles from "../../Styles/MarketChipStyles";
import Container from "@material-ui/core/Container";
import FormSectionStyles from "../../Styles/FormSectionStyles";

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
    },

    fabBottom: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },

    paperNoPadding: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%',
    },

    paperContainer: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        width: '100%'
    },

    primaryRipple: {
        color: theme.palette.primary.light
    },

    appDescriptionContainer: {
        flexGrow: 1,
        textAlign: "left",
        color: theme.palette.text.primary,
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        paddingBottom: theme.spacing(1),
        width: '100%'
    },

    appIcon: {
        width: 128,
        height: 128
    },


    //search toolbar styles
    extraToolbar: {
        background: "transparent",
        color: theme.palette.text.primary
    },
    extraToolbarTitle: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.07),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.09),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
    },

}));
const useFormSectionStyles = makeStyles((theme) => FormSectionStyles(theme));
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function ApplicationDashboard(props) {
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

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
        setNotifications(['1', '2']);

        // todo application route params
    }, []);

    return (
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <Paper elevation={1}>
                    <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                        <Toolbar variant="dense" className={classes.extraToolbar}>
                            <Typography className={classes.extraToolbarTitleNoHide} variant="h6" noWrap>
                                Панель управления
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Paper>
            </Grid>

            {/* todo lg = {6} TEST   */}
            <Grid item xs={12}>
                {/* todo show app not found card when app not found */}
                {props.app &&
                <Paper className={classes.paperNoPadding}>
                    <div className={classes.appDescriptionContainer}>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item xs={3} sm={2} md={1}>
                                <img alt='app icon' src={props.app.icon}
                                     style={{maxWidth: "100%", maxHeight: '100%'}}/>
                            </Grid>
                            <Grid item xs={9} sm={10} md={11}>
                                <Typography component="h5" variant="h6">{props.app.title}</Typography>
                                <Typography component="p" variant="body1">
                                    {props.app.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider className={classes.fullWidthDivider}/>
                    <div className={marketClasses.marketsContainer}>
                        {
                            props.app.markets.map((market, index) => {
                                return <Chip variant="outlined"
                                             clickable
                                             component='a'
                                             label={MarketsInfo[index].name}
                                             href={market.link}
                                             target="_blank"
                                             rel='noreferrer'
                                             disabled={market.disabled}
                                             color={market.disabled ? "default" : "primary"}
                                             avatar={<Avatar className={marketClasses.transparentBg}
                                                             variant='square'
                                                             src={MarketsInfo[index].getIcon(market.disabled)}/>}/>
                            })
                        }
                    </div>
                </Paper>
                }
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={formClasses.paper}>
                    <div className={formClasses.cardContainer}>
                        <div className={formClasses.container}>
                            <Typography variant="h6">
                                Уведомления
                            </Typography>
                            <Typography variant="body2">
                                Уведомления о новых отзывах и оценках
                            </Typography>
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                        </Container>
                    </div>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={formClasses.paper}>
                    <div className={formClasses.cardContainer}>
                        <div className={formClasses.container}>
                            <Typography variant="h6">
                                Средняя оценка
                            </Typography>
                            <Typography variant="body2">
                                Как меняется средняя оценка приложения со временем
                            </Typography>
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                        </Container>
                    </div>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={formClasses.paper}>
                    <div className={formClasses.cardContainer}>
                        <div className={formClasses.container}>
                            <Typography variant="h6">
                                Отзывы
                            </Typography>
                            <Typography variant="body2">
                                Читайте и анализируйте отзывы о вашем приложении
                            </Typography>
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                        </Container>
                    </div>
                </Paper>
            </Grid>


            {/*  from dashboard template
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart/>
                </Paper>
            </Grid>
            {/* Recent Deposits
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Deposits/>
                </Paper>
            </Grid>
            {/* Recent Orders
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders/>
                </Paper>
            </Grid>*/}
        </Grid>
    );
}
