import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//image imports
import demoAppIcon from "../images/demo_app_icon.png";

import {fade} from "@material-ui/core";
import {AddRounded, SearchRounded} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link as RouterLink} from "react-router-dom";
import MarketChipStyles from "../Styles/MarketChipStyles";
import {MarketsInfo} from "../Constants/MarketsInfo";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({

    fabBottom: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },

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
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%',
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
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function Applications(props) {
    let username = props.username;
    const [apps, setApps] = React.useState(undefined);

    const classes = useStyles();
    const marketClasses = useMarketChipStyles();

    useEffect(() => {
        //todo use iuliia-js to transliterate app name into id

        // todo load info by username
        console.log(username);
        // todo if username !== logged in username => redirect



        // todo load applications list by username from server
        // todo more complex classes in json
        const apps = {
            'sc222': [
                {
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
                {
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
                {
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
                {
                    icon: demoAppIcon,
                    title: "One Ring",
                    id: "one-ring",
                    description: "Integrate your One Ring device with Samsung SmartThings smart home system",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                },
            ],
            'neoezop': [
                {
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
                {
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
                {
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
                {
                    icon: demoAppIcon,
                    title: "Название приложения 4",
                    id: "nazvanie-prilozhenia-4",
                    description: "Достаточно длинное описание приложение длиной в две строки",
                    markets: [
                        {disabled: false, link: "https://play.google.com/store/apps"},
                        {disabled: false, link: "https://www.apple.com/app-store/"},
                        {disabled: false, link: "https://appgallery.huawei.com/"}
                    ]
                },
            ],
            'refusedguy': [],
            'yakiy_pes': [],
        };

        if (apps[username] !== undefined) {
            console.log(apps[username]);
        }
        setApps(apps);
        //todo show "add new apps menu if no apps"


        // todo application route params
    }, []);

    function getApplicationsByUsername() {
        // todo move to separate class and add loading indicator

        if (apps === undefined) {
            return (
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.paperContainer}>
                            <Typography component="h2" variant="h6" color="primary">
                                Загрузка
                            </Typography>
                            <Typography variant="body1">
                                Загрузка списка приложений с сервера...
                            </Typography>
                        </div>
                    </Paper>
                </Grid>);
        } else if (apps[username] !== undefined && apps[username].length === 0) {
            return (
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.paperContainer}>
                            <Typography component="h2" variant="h6" color="primary">У Вас еще нет приложений</Typography>
                            <Typography component="p" variant="body1">
                                Нажмите на кнопку 'добавить' для того, чтобы создать новое приложение
                            </Typography>
                        </div>
                    </Paper>
                </Grid>);
            //todo check if logged in username == username in link
        } else if (apps[username] !== undefined && apps[username].length !== 0) {
            return apps[username].map(app => {
                return (<Grid key={app.id} item xs={12} md={6}>
                        <Paper className={classes.paperNoPadding}>
                            <ButtonBase className={classes.primaryRipple} component={RouterLink}
                                        to={`./app/${app.id}`}>

                                <div className={classes.appDescriptionContainer}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item xs={3} sm={2} md={3}>
                                            <img alt='app icon' src={app.icon}
                                                 style={{maxWidth: "100%", maxHeight: '100%'}}/>
                                        </Grid>
                                        <Grid item xs={9} sm={10} md={9}>
                                            <Typography component="h5" variant="h6">{app.title}</Typography>
                                            <Typography component="p" variant="body1">
                                                {app.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </ButtonBase>
                            <Divider className={classes.fullWidthDivider}/>
                            <div className={marketClasses.marketsContainer}>
                                {
                                    app.markets.map((market, index) => {
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
                    </Grid>
                );
            })
        }
        // todo if apps[username] undefined - redirect (IN USER SECTION)
    }

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer}/>
            <Grid container spacing={3}>
                {/* App search toolbar */}
                <Grid item xs={12}>
                    <Paper elevation={1}>
                        <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                            <Toolbar variant="dense" className={classes.extraToolbar}>
                                <Typography className={classes.extraToolbarTitle} variant="h6" noWrap>
                                    Приложения
                                </Typography>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchRounded color='action'/>
                                    </div>
                                    {/* todo filter apps list by search name*/}
                                    <InputBase
                                        placeholder="Поиск…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </div>
                            </Toolbar>
                        </AppBar>
                    </Paper>
                </Grid>

                {getApplicationsByUsername()}

            </Grid>

            <Hidden smDown>
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    component={RouterLink}
                    to={`./new-app`}
                >
                    <AddRounded className={classes.extendedIcon}/>
                    Добавить
                </Fab>
            </Hidden>

            <Hidden mdUp>
                <Fab
                    variant="round"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    component={RouterLink}
                    to={`./new-app`}
                >
                    <AddRounded/>
                </Fab>
            </Hidden>

        </Container>
    );
}