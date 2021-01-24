import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import update from 'immutability-helper';

import {fade} from "@material-ui/core";
import {DoneRounded, SearchRounded} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import {Link as RouterLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import FormSectionStyles from "../Styles/FormSectionStyles";
import MarketChipStyles from "../Styles/MarketChipStyles";
import {MarketsInfoHelper} from "../Helpers/MarketsInfoHelper";

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

    extraToolbarButtonBack: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
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
    paperNoBottomPadding: {
        display: 'flex',
        paddingTop: theme.spacing(1.5),
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
        height: theme.spacing(4.5)
    },


    //search toolbar styles
    extraToolbar: {
        background: "transparent",
        color: theme.palette.text.primary
    },
    extraToolbarTitleNoHide: {
        flexGrow: 1,
        display: 'block',
    },
    searchCard: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(1.5),
        position: 'relative',
        backgroundColor: fade(theme.palette.common.black, 0.07),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.09),
        },

        [theme.breakpoints.up('sm')]: {
            display: 'inline-block',
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
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '45ch'
        },
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
    },

    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    }

}));
const useFormSectionStyles = makeStyles((theme)=> FormSectionStyles(theme));
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function NewApplications(props) {
    let userId = props.userId;
    const [selectedMarkets, setSelectedMarkets] = React.useState([false, false, false]);

    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    function addNewApp() {
        //todo validate input and check if app name is unique,
        //todo  make post request to add new app and redirect to apps section if everything is ok
        //todo use iuliia-js to transliterate app name into id
        console.log('add new app');
    }

    function toggleMarket(index) {
        console.log('toggle market: ' + index);
        const newSelectedMarkets = update(selectedMarkets, {[index]: {$set: !selectedMarkets[index]}});
        setSelectedMarkets(newSelectedMarkets);
    }

    useEffect(() => {
        // todo load info by userId
        console.log(userId);
    }, []);


    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer}/>
            <Grid container spacing={3}>
                {/* App search toolbar */}
                <Grid item xs={12}>
                    <Paper elevation={1}>
                        <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                            <Toolbar variant="dense" className={classes.extraToolbar} disableGutters>
                                <IconButton
                                    edge="start"
                                    aria-label="back to apps"
                                    component={RouterLink}
                                    to={'./apps'}
                                    className={classes.extraToolbarButtonBack}
                                >
                                    {<ArrowBackRoundedIcon color="action"/>}
                                </IconButton>
                                <Typography className={classes.extraToolbarTitleNoHide} variant="h6" noWrap>
                                    Добавить приложение
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Информация о приложении
                                </Typography>
                                <Typography variant="body2">
                                    Укажите краткую информацию о приложении
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <Container maxWidth='sm' className={classes.containerNotCentered}>
                                {/*todo use repeating technique*/}
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="appName"
                                    label="Название приложения"
                                    name="appName"
                                    //todo is autofocus convenient?
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    multiline
                                    rowsMax={4}
                                    rows={4}
                                    name="appDescription"
                                    label="Описание приложения"
                                    id="appDescription"
                                />
                            </Container>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paperNoBottomPadding}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Магазины приложений
                                </Typography>
                                <Typography variant="body2">
                                    Укажите маркеты, в которых опубликовано ваше приложение
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <div className={marketClasses.marketsContainer}>
                                {
                                    selectedMarkets.map((isSelected, index) => {
                                        return <Chip variant="outlined"
                                                     clickable
                                                     key={MarketsInfoHelper[index].name}
                                                     component='a'
                                                     onClick={() => toggleMarket(index)}
                                                     label={MarketsInfoHelper[index].name}
                                                     color={isSelected ? "primary" : "default"}
                                                     avatar={<Avatar className={marketClasses.transparentBg}
                                                                     variant='square'
                                                                     src={MarketsInfoHelper[index].getIcon(!isSelected)}/>}/>
                                    })
                                }
                            </div>
                        </div>
                    </Paper>
                </Grid>

                {   //todo move to function ??
                    selectedMarkets.map((isSelected, index) => {
                        return isSelected &&
                            <Grid item xs={12}>
                                <Paper elevation={1} className={classes.paper}>
                                    <div className={formClasses.cardContainer}>
                                        <div className={formClasses.container}>
                                            <Typography variant="h6">
                                                {MarketsInfoHelper[index].name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {MarketsInfoHelper[index].description}
                                            </Typography>
                                        </div>
                                        <Divider className={formClasses.fullWidthDivider}/>
                                        <Container maxWidth='sm' className={classes.containerNotCentered}>

                                            {/*todo add state for found / not found app and make different content for that states*/}

                                            <div className={classes.searchCard}>
                                                <div className={classes.searchIcon}>
                                                    <SearchRounded color='action'/>
                                                </div>
                                                {/* todo filter apps list by search name*/}
                                                <InputBase
                                                    placeholder="Вставьте ссылку на приложение…"
                                                    classes={{
                                                        root: classes.inputRoot,
                                                        input: classes.inputInput,
                                                    }}
                                                    inputProps={{'aria-label': 'search'}}
                                                />
                                            </div>
                                        </Container>
                                    </div>
                                </Paper>
                            </Grid>
                    })
                }
            </Grid>

            <Hidden smDown>
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    /*component={RouterLink}
                    to={`./new-app`}*/
                    onClick={() => addNewApp()}
                >
                    <DoneRounded className={classes.extendedIcon}/>
                    Завершить
                </Fab>
            </Hidden>

            <Hidden mdUp>
                <Fab
                    variant="round"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    /*component={RouterLink}
                    to={`./new-app`}*/
                    onClick={() => addNewApp()}
                >
                    <DoneRounded/>
                </Fab>
            </Hidden>

        </Container>
    );
}