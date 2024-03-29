import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {DoneRounded} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import update from 'immutability-helper';
import {Link as RouterLink, Redirect, Route, Switch as RouteSwitch} from 'react-router-dom';
import {useFormSectionStyles} from "../../Styles/FormSectionStyles";
import {useMarketChipStyles} from "../../Styles/MarketChipStyles";
import {
    AppGalleryIndex,
    AppStoreIndex,
    getAppIdFromUrl,
    MarketsInfo,
    PlayStoreIndex
} from "../../Helpers/MarketsInfoHelper";
import {getAppDescriptionError, getAppMarketError, getAppNameError} from "../../Helpers/ErrorHelper";
import {createApp} from "../../Api/ApiApp";
import {createAppForCreate, getDefaultAppNoIdNoPic} from "../../Api/Helpers/ApiAppHelper";
import {HomepageUrl} from "../../App";
import {UIDefaultValues} from "../../Config";

const useStyles = makeStyles((theme) => ({
    fabBottom: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    appBarSpacer: {
        height: '48px'
    },
    extraToolbarButtonBack: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%'
    },
    paperNoBottomPadding: {
        display: 'flex',
        paddingTop: theme.spacing(1.5),
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%'
    },
    //search toolbar styles
    extraToolbar: {
        background: "transparent",
        color: theme.palette.text.primary
    },
    extraToolbarTitleNoHide: {
        flexGrow: 1,
        display: 'block'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    }
}));

export default function NewApplications(props) {
    const userId = props.userId;

    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    const [selectedMarkets, setSelectedMarkets] = React.useState(UIDefaultValues.selectedMarkets);
    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [newApp, setNewApp] = React.useState(getDefaultAppNoIdNoPic());
    const [playStoreLink, setPlayStoreLink] = React.useState("");
    const [appStoreLink, setAppStoreLink] = React.useState("");
    const [appGalleryLink, setAppGalleryLink] = React.useState("");
    const [createdAppId, setCreatedAppId] = React.useState(undefined);

    function getLinkByIndex(index) {
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

    function hasErrors(areErrorsVisible) {
        return getAppNameError(areErrorsVisible, newApp.name)
            + getAppDescriptionError(areErrorsVisible, newApp.description)
            + getAppMarketError(areErrorsVisible, PlayStoreIndex, selectedMarkets[PlayStoreIndex], playStoreLink, newApp.playMarketId)
            + getAppMarketError(areErrorsVisible, AppStoreIndex, selectedMarkets[AppStoreIndex], appStoreLink, newApp.appStoreId)
            + getAppMarketError(areErrorsVisible, AppGalleryIndex, selectedMarkets[AppGalleryIndex], appGalleryLink, newApp.appGalleryId) !== "";
    }

    function addNewApp() {
        setErrorsVisible(true);
        if (!hasErrors(true)) {
            const appForCreate = createAppForCreate(newApp, selectedMarkets);
            createApp(userId, appForCreate)
                .then(result => {
                    console.log("successfully created app with id: " + result);
                    setCreatedAppId(result);
                    //TODO !!! ADD POSSIBILITY TO ADD APP ICON URL YOURSELF
                })
                .catch(err => {
                    props.showStatusAlert("Не удалось создать приложение", "error");
                    props.updateIsTokenExpired(err.message);
                    console.log(err.message);
                });
        }
    }

    function toggleMarket(index) {
        const newSelectedMarkets = update(selectedMarkets, {[index]: {$set: !selectedMarkets[index]}});
        setSelectedMarkets(newSelectedMarkets);
    }

    const handleNameInput = (event) => {
        const newAppValue = update(newApp, {name: {$set: event.target.value}});
        setNewApp(newAppValue);
    }

    const handleDescriptionInput = (event) => {
        const newAppValue = update(newApp, {description: {$set: event.target.value}});
        setNewApp(newAppValue);
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

    return (
        <RouteSwitch>
            {createdAppId && <Redirect to={`${HomepageUrl}/user/${userId}/app/${createdAppId}/`}/>}
            <Route>
                <Container maxWidth="lg" className={classes.container}>
                    <div className={classes.appBarSpacer}/>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={1}>
                                <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                                    <Toolbar variant="dense" className={classes.extraToolbar} disableGutters>
                                        <IconButton
                                            edge="start"
                                            aria-label="back to apps"
                                            component={RouterLink}
                                            to={`${HomepageUrl}/user/${userId}/apps`}
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
                                                return <Chip key={MarketsInfo[index].name}
                                                             variant="outlined"
                                                             clickable
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
                                    <Grid key={index} item xs={12}>
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
                </Container>
            </Route>
        </RouteSwitch>
    );
}