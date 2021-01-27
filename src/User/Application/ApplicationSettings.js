import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";


//image imports
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {
    AppGalleryIndex,
    AppStoreIndex,
    createLinkFromId,
    getAppIdFromUrl,
    MarketsIndexes,
    MarketsInfo,
    PlayStoreIndex
} from "../../Helpers/MarketsInfoHelper";
import MarketChipStyles from "../../Styles/MarketChipStyles";
import Container from "@material-ui/core/Container";
import FormSectionStyles from "../../Styles/FormSectionStyles";
import update from "immutability-helper";
import defaultAppIcon from "../../images/default_app_icon.png";
import {createAppForCreate, getDefaultAppNoIdNoPic, getMarketIdByStoreIndex} from "../../Api/ApiAppHelper";
import {DoneRounded} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import {Link as RouterLink} from "react-router-dom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import {HomepageUrl} from "../../App";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import {getAppDescriptionError, getAppMarketError, getAppNameError} from "../../Helpers/ErrorHelper";
import {createApp} from "../../Api/ApiApp";
import TextField from "@material-ui/core/TextField";

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
    },

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

    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    },

    containerApps: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
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

    containerTopPadded: {
        flexGrow: 1,
        textAlign: "left",
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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
    extraToolbarButtonBack: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
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
    applicationIcon: {
        borderRadius: "1.5em",
        maxWidth: "100%",
        maxHeight: '100%'
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
    },
    chartSelectsContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },

    selectStyle: {
        minWidth: '200px',
    },

    textWithIcon: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    reviewAvatar: {
        color: theme.palette.white,
        backgroundColor: theme.palette.primary.light,
        width: theme.spacing(7),
        height: theme.spacing(7),
        fontSize: "32px"
    },

    reviewRating: {
        fill: green[400]
    },

    /*
    paperNoPadding: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%',
    },
    * */
    reviewCard: {
        height: '100%',
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        paddingBottom: theme.spacing(1)
    },


}));
const useFormSectionStyles = makeStyles((theme) => FormSectionStyles(theme));
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function ApplicationSettings(props) {
    const userId = props.userId;

    const theme = useTheme();
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();


    const [selectedMarkets, setSelectedMarkets] = React.useState([false, false, false]);
    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [newApp, setNewApp] = React.useState(getDefaultAppNoIdNoPic());
    const [playStoreLink, setPlayStoreLink] = React.useState("");
    const [appStoreLink, setAppStoreLink] = React.useState("");
    const [appGalleryLink, setAppGalleryLink] = React.useState("");

    const [createdAppId, setCreatedAppId] = React.useState(undefined);

    useEffect(() => {

        if (props.app) {

            setSelectedMarkets([
                props.app.playMarketId !== undefined,
                props.app.appStoreId !== undefined,
                props.app.appGalleryId !== undefined
            ]);



            setNewApp(props.app);

        }
    }, [props.app]);


    function hasErrors(areErrorsVisible) {
        return getAppNameError(areErrorsVisible, newApp.name)
            + getAppDescriptionError(areErrorsVisible, newApp.description)
            + getAppMarketError(areErrorsVisible, PlayStoreIndex, selectedMarkets[PlayStoreIndex], playStoreLink, newApp.playMarketId)
            + getAppMarketError(areErrorsVisible, AppStoreIndex, selectedMarkets[AppStoreIndex], appStoreLink, newApp.appStoreId)
            + getAppMarketError(areErrorsVisible, AppGalleryIndex, selectedMarkets[AppGalleryIndex], appGalleryLink, newApp.appGalleryId) !== "";
    }

    function addNewApp() {
        setErrorsVisible(true);
        console.log("add");
        if (!hasErrors(true)) {
            const appForCreate = createAppForCreate(newApp, selectedMarkets);
            createApp(userId, appForCreate)
                .then(result => {
                    console.log("successfully created app with id: " + result);

                    setCreatedAppId(result);
                    //TODO !!! REDIRECT TO APPLICATION DASHBOARD AFTER APP CREATED
                    //TODO ПОЧЕМУ-ТО ЗАПРОСЫ НА СЕРВАК ВЛАДА МЕДЛЕННЫЕ
                    //TODO !!! ADD POSSIBILITY TO ADD APP ICON URL YOURSELF
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }


    const handleNameInput = (event) => {
        const newAppValue = update(newApp, {name: {$set: event.target.value}});
        setNewApp(newAppValue);
    }

    const handleDescriptionInput = (event) => {
        const newAppValue = update(newApp, {description: {$set: event.target.value}});
        setNewApp(newAppValue);
    }

    function toggleMarket(index) {
        console.log('toggle market: ' + index);
        const newSelectedMarkets = update(selectedMarkets, {[index]: {$set: !selectedMarkets[index]}});
        setSelectedMarkets(newSelectedMarkets);
    }

    const handlePlayStoreLinkInput = (event) => {
        const link = event.target.value;
        setPlayStoreLink(link);
        const newAppValue = update(newApp, {playMarketId: {$set: getAppIdFromUrl(PlayStoreIndex, link)}});
        setNewApp(newAppValue);
    }

    const handleAppStoreLinkInput = (event) => {
        const link = event.target.value;
        setAppStoreLink(link);
        const newAppValue = update(newApp, {appStoreId: {$set: getAppIdFromUrl(AppStoreIndex, link)}});
        setNewApp(newAppValue);
    }

    const handleAppGalleryLinkInput = (event) => {
        const link = event.target.value;
        setAppGalleryLink(link);
        const newAppValue = update(newApp, {appGalleryId: {$set: getAppIdFromUrl(AppGalleryIndex, link)}});
        setNewApp(newAppValue);
    }

    const handleLinkInputByIndex = [
        handlePlayStoreLinkInput,
        handleAppStoreLinkInput,
        handleAppGalleryLinkInput
    ];

    function getLinkByIndex(index) {
        console.log("get link by index;")
        switch (index) {
            case PlayStoreIndex:
                return playStoreLink;
            case AppStoreIndex:
                return appStoreLink;
            case AppGalleryIndex:
                return appGalleryLink;
            default:
                return "";
        }
    }

    function getApplicationStoreIdByIndex(index) {
        console.log("get store id by index");
        console.log(newApp);
        switch (index) {
            case PlayStoreIndex:
                return newApp.playMarketId;
            case AppStoreIndex:
                return newApp.appStoreId;
            case AppGalleryIndex:
                return newApp.appGalleryId;
            default:
                return "";
        }
    }

    useEffect(() => {
        // todo load info by userId (TOKEN)
        console.log(userId);
        console.log(newApp);
    }, []);


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={1}>
                        <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                            <Toolbar variant="dense" className={classes.extraToolbar} disableGutters>
                                <IconButton
                                    edge="start"
                                    aria-label="back to apps"
                                    component={RouterLink}
                                    to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                    className={classes.extraToolbarButtonBack}
                                >
                                    {<ArrowBackRoundedIcon color="action"/>}
                                </IconButton>

                                <Typography className={classes.extraToolbarTitleNoHide} variant="h6" noWrap>
                                    Настройки приложения
                                </Typography>

                            </Toolbar>
                        </AppBar>
                    </Paper>
                </Grid>

                {/* todo lg = {6} TEST   */}
                {/*TODO !!! APPINFO CARD EXTRACT COMPONENT*/}
                <Grid item xs={12}>
                    {props.app &&
                    <Paper className={classes.paperNoPadding} elevation={1}>

                        <div className={classes.containerTopPadded}>
                            <Typography variant="h6">
                                Информация о приложении
                            </Typography>
                            <Typography variant="body2">
                                Текущая информация о приложении
                            </Typography>
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <div className={classes.appDescriptionContainer}>

                            <Grid container alignItems='center' spacing={2}>
                                <Grid item xs={3} sm={2} md={1}>
                                    <img alt='app icon'
                                         src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                                         className={classes.applicationIcon}/>
                                </Grid>
                                <Grid item xs={9} sm={10} md={11}>
                                    <Typography component="h5" variant="h6">{props.app.name}</Typography>
                                    <Typography component="p" variant="body1">
                                        {props.app.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider className={classes.fullWidthDivider}/>
                        <div className={marketClasses.marketsContainer}>
                            {
                                MarketsIndexes.map(marketIndex => {
                                    let marketId = getMarketIdByStoreIndex(props.app, marketIndex);
                                    return <Chip variant="outlined"
                                                 clickable
                                                 component='a'
                                                 label={MarketsInfo[marketIndex].name}
                                                 href={createLinkFromId(marketIndex, marketId)}
                                                 target="_blank"
                                                 rel='noreferrer'
                                                 disabled={marketId === undefined}
                                                 color={marketId === undefined ? "default" : "primary"}
                                                 avatar={<Avatar className={marketClasses.transparentBg}
                                                                 variant='square'
                                                                 src={MarketsInfo[marketIndex].getIcon(marketId === undefined)}/>}/>


                                })
                            }
                        </div>
                    </Paper>
                    }
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Редактирование приложения
                                </Typography>
                                <Typography variant="body2">
                                    Обновите информацию о приложении
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <Container maxWidth='sm' className={classes.containerNotCentered}>
                                <TextField
                                    error={getAppNameError(areErrorsVisible, newApp.name) !== ''}
                                    helperText={getAppNameError(areErrorsVisible, newApp.name)}
                                    value={newApp.name}
                                    onChange={handleNameInput}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Название приложения"
                                    name="name"
                                />
                                <TextField
                                    error={getAppDescriptionError(areErrorsVisible, newApp.description) !== ''}
                                    helperText={getAppDescriptionError(areErrorsVisible, newApp.description)}
                                    value={newApp.description}
                                    onChange={handleDescriptionInput}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    multiline
                                    rowsMax={4}
                                    rows={4}
                                    name="description"
                                    label="Описание приложения"
                                    id="description"
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
                                                     key={MarketsInfo[index].name}
                                                     component='a'
                                                     onClick={() => toggleMarket(index)}
                                                     label={MarketsInfo[index].name}
                                                     color={isSelected ? "primary" : "default"}
                                                     avatar={<Avatar className={marketClasses.transparentBg}
                                                                     variant='square'
                                                                     src={MarketsInfo[index].getIcon(!isSelected)}/>}/>
                                    })
                                }
                            </div>
                        </div>
                    </Paper>
                </Grid>

                {
                    selectedMarkets.map((isSelected, index) => {
                        return isSelected &&
                            <Grid item xs={12}>
                                <Paper elevation={1} className={classes.paper}>
                                    <div className={formClasses.cardContainer}>
                                        <div className={formClasses.container}>
                                            <Typography variant="h6">
                                                {MarketsInfo[index].name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {MarketsInfo[index].description}
                                            </Typography>
                                        </div>
                                        <Divider className={formClasses.fullWidthDivider}/>
                                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                                            <TextField
                                                error={getAppMarketError(areErrorsVisible, index, selectedMarkets[index], getLinkByIndex(index), getApplicationStoreIdByIndex(index)) !== ''}
                                                helperText={getAppMarketError(areErrorsVisible, index, selectedMarkets[index], getLinkByIndex(index), getApplicationStoreIdByIndex(index))}
                                                value={getLinkByIndex(index)}
                                                onChange={handleLinkInputByIndex[index]}
                                                variant="outlined"
                                                margin="dense"
                                                required
                                                fullWidth
                                                id={`link-${index}`}
                                                label="Ссылка на приложение"
                                                name="store-url"
                                                autoComplete='url'
                                            />
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
                    onClick={() => addNewApp()}
                >
                    <DoneRounded className={classes.extendedIcon}/>
                    Создать
                </Fab>
            </Hidden>

            <Hidden mdUp>
                <Fab
                    variant="round"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    onClick={() => addNewApp()}
                >
                    <DoneRounded/>
                </Fab>
            </Hidden>
        </>

    );
}
