import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import {HomeRounded, LoopRounded, NavigateNextRounded, SettingsRounded, UpdateRounded} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import update from "immutability-helper";
import {Redirect, Route, Switch as RouteSwitch} from "react-router-dom";
import {useMarketChipStyles} from "../../../Styles/MarketChipStyles";
import {useFormSectionStyles} from "../../../Styles/FormSectionStyles";
import {
    AppNameMaxLength,
    createAppForUpdate,
    getDefaultAppNoIdNoPic,
    getMarketIdByStoreIndex
} from "../../../Api/Helpers/ApiAppHelper";
import {HomepageUrl} from "../../../App";
import {
    AppGalleryIndex,
    AppStoreIndex,
    createLinkFromId,
    getAppIdFromUrl,
    MarketsInfo,
    PlayStoreIndex
} from "../../../Helpers/MarketsInfoHelper";
import {getAppDescriptionError, getAppMarketError, getAppNameError} from "../../../Helpers/ErrorHelper";
import {deleteApp, updateApp} from "../../../Api/ApiApp";
import AdaptiveBreadcrumbItem from "../../../Components/AdaptiveBreadcrumbItem";
import DeleteCardAndConfirmDialog from "../../../Components/DeleteCardAndConfirmDialog";
import AppInfoCard from "../../../Components/AppInfoCard";
import defaultAppIcon from "../../../images/default_app_icon.png";

const useStyles = makeStyles((theme) => ({
    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
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
        paddingTop: theme.spacing(1.5),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%'
    },
    fabBottom: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    //search toolbar styles
    extraToolbar: {
        background: "transparent",
        color: theme.palette.text.primary
    },
    applicationIconSmall: {
        borderRadius: "0.5em",
        width: theme.spacing(3.5),
        maxHeight: theme.spacing(3.5),
        marginRight: theme.spacing(0.5)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5)
    }
}));

export default function AppSettings(props) {
    const userId = props.userId;
    const appId = props.appId;

    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    const [isAppDeleted, setIsAppDeleted] = React.useState(false);
    const [selectedMarkets, setSelectedMarkets] = React.useState([false, false, false]);
    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [fieldsStateApp, setFieldsStateApp] = React.useState(getDefaultAppNoIdNoPic());
    const [playStoreLink, setPlayStoreLink] = React.useState("");
    const [appStoreLink, setAppStoreLink] = React.useState("");
    const [appGalleryLink, setAppGalleryLink] = React.useState("");

    useEffect(() => {
        if (props.app) {
            setSelectedMarkets([
                props.app.playMarketId !== undefined,
                props.app.appStoreId !== undefined,
                props.app.appGalleryId !== undefined
            ]);

            setFieldsStateApp(props.app);
            setPlayStoreLink(createLinkFromId(PlayStoreIndex, props.app.playMarketId));
            setAppStoreLink(createLinkFromId(AppStoreIndex, props.app.appStoreId));
            setAppGalleryLink(createLinkFromId(AppGalleryIndex, props.app.appGalleryId));
        }
    }, [props.app]);

    function hasErrors(areErrorsVisible) {
        return getAppNameError(areErrorsVisible, fieldsStateApp.name)
            + getAppDescriptionError(areErrorsVisible, fieldsStateApp.description)
            + getAppMarketError(areErrorsVisible, PlayStoreIndex, selectedMarkets[PlayStoreIndex], playStoreLink, fieldsStateApp.playMarketId)
            + getAppMarketError(areErrorsVisible, AppStoreIndex, selectedMarkets[AppStoreIndex], appStoreLink, fieldsStateApp.appStoreId)
            + getAppMarketError(areErrorsVisible, AppGalleryIndex, selectedMarkets[AppGalleryIndex], appGalleryLink, fieldsStateApp.appGalleryId) !== "";
    }

    function editApp() {
        setErrorsVisible(true);
        console.log("update");
        if (!hasErrors(true)) {
            const appForUpdate = createAppForUpdate(fieldsStateApp, props.appId, selectedMarkets);
            updateApp(userId, appForUpdate)
                .then(result => {
                    props.showStatusAlert("Информация о приложении успешно обновлена", "success");
                    console.log("successfully updated app with new picUrl: " + result);
                    if (result)
                        appForUpdate.picUrl = result.replace(/^"/, "").replace(/"$/, "");
                    props.updateAppInSection(appForUpdate);
                    setErrorsVisible(false);
                })
                .catch(err => {
                    props.updateIsTokenExpired(err.message);
                    props.showStatusAlert("Не удалось обновить информацию о приложении", "error");
                    console.log(err.message);
                });
        }
    }

    function deleteCurrentApp() {
        deleteApp(userId, appId)
            .then(result => {
                console.log("successfully deleted app with result: " + result);
                setIsAppDeleted(true);
            })
            .catch(err => {
                props.updateIsTokenExpired(err.message);
                props.showStatusAlert("Не удалось удалить приложение", "error");
                console.log(err.message);
            })
    }

    const handleNameInput = (event) => {
        const newAppValue = update(fieldsStateApp, {name: {$set: event.target.value}});
        setFieldsStateApp(newAppValue);
    }

    const handleDescriptionInput = (event) => {
        const newAppValue = update(fieldsStateApp, {description: {$set: event.target.value}});
        setFieldsStateApp(newAppValue);
    }

    function toggleMarket(index) {
        console.log('toggle market: ' + index);
        const newSelectedMarkets = update(selectedMarkets, {[index]: {$set: !selectedMarkets[index]}});
        setSelectedMarkets(newSelectedMarkets);
    }

    const handlePlayStoreLinkInput = (event) => {
        const link = event.target.value;
        setPlayStoreLink(link);
        const newAppValue = update(fieldsStateApp, {playMarketId: {$set: getAppIdFromUrl(PlayStoreIndex, link)}});
        setFieldsStateApp(newAppValue);
    }

    const handleAppStoreLinkInput = (event) => {
        const link = event.target.value;
        setAppStoreLink(link);
        const newAppValue = update(fieldsStateApp, {appStoreId: {$set: getAppIdFromUrl(AppStoreIndex, link)}});
        setFieldsStateApp(newAppValue);
    }

    const handleAppGalleryLinkInput = (event) => {
        const link = event.target.value;
        setAppGalleryLink(link);
        const newAppValue = update(fieldsStateApp, {appGalleryId: {$set: getAppIdFromUrl(AppGalleryIndex, link)}});
        setFieldsStateApp(newAppValue);
    }

    const handleLinkInputByIndex = [
        handlePlayStoreLinkInput,
        handleAppStoreLinkInput,
        handleAppGalleryLinkInput
    ];

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

    return (
        <RouteSwitch>
            {isAppDeleted && <Redirect to={`${HomepageUrl}/user/${userId}/apps/`}/>}
            <Route>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={1}>
                            <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                                <Toolbar variant="dense" className={classes.extraToolbar}>
                                    <Breadcrumbs aria-label="breadcrumb"
                                                 separator={<NavigateNextRounded fontSize="small"/>}
                                                 className={classes.extraToolbarTitleNoHide}>
                                        <AdaptiveBreadcrumbItem
                                            link={`${HomepageUrl}/user/${props.userId}/apps`}
                                            icon={HomeRounded}
                                            text="Приложения"
                                        />
                                        {props.app === undefined &&
                                        <AdaptiveBreadcrumbItem
                                            link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                            icon={LoopRounded}
                                            text="Загрузка..."
                                        />
                                        }
                                        {props.app &&
                                        <AdaptiveBreadcrumbItem
                                            maxLength={AppNameMaxLength}
                                            link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                            icon={() => <img alt='app icon'
                                                             src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                                                             className={classes.applicationIconSmall}/>}
                                            text={props.app.name}
                                        />}
                                        <AdaptiveBreadcrumbItem
                                            isSelected
                                            link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/settings`}
                                            icon={SettingsRounded}
                                            text="Настройки"
                                        />
                                    </Breadcrumbs>
                                </Toolbar>
                            </AppBar>
                        </Paper>
                    </Grid>
                    {props.app &&
                    <Grid item xs={12}>
                        <AppInfoCard app={props.app} iconGridMd={1} hasCardDescription/>
                    </Grid>
                    }
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
                                        error={getAppNameError(areErrorsVisible, fieldsStateApp.name) !== ''}
                                        helperText={getAppNameError(areErrorsVisible, fieldsStateApp.name)}
                                        value={fieldsStateApp.name}
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
                                        error={getAppDescriptionError(areErrorsVisible, fieldsStateApp.description) !== ''}
                                        helperText={getAppDescriptionError(areErrorsVisible, fieldsStateApp.description)}
                                        value={fieldsStateApp.description}
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
                                                    error={getAppMarketError(areErrorsVisible, index, selectedMarkets[index], getLinkByIndex(index), getMarketIdByStoreIndex(fieldsStateApp, index)) !== ''}
                                                    helperText={getAppMarketError(areErrorsVisible, index, selectedMarkets[index], getLinkByIndex(index), getMarketIdByStoreIndex(fieldsStateApp, index))}
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
                                                {getMarketIdByStoreIndex(props.app, index) !== undefined && getMarketIdByStoreIndex(fieldsStateApp, index) !== getMarketIdByStoreIndex(props.app, index) &&
                                                <Typography variant="caption" color='primary'>
                                                    С момента изменения ссылки, сервер будет получать отзывы и
                                                    оценки на
                                                    новое
                                                    приложение, но <b>старые при этом сохранятся</b>
                                                </Typography>
                                                }
                                            </Container>
                                        </div>
                                    </Paper>
                                </Grid>
                        })
                    }
                    {props.app &&
                    <Grid item xs={12}>
                        <DeleteCardAndConfirmDialog
                            cardTitle="Удаление приложения"
                            cardSubtitle="Удаление приложения без возможности восстановления"
                            buttonTitle="Удалить приложение"
                            dialogTitle="Удаление приложения"
                            dialogDescriptionComponent={
                                () => <>
                                    <Typography>
                                        Это действие невозможно отменить.<br/>
                                        Будут удалены все данные вашего приложения, в том числе информация об
                                        отзывах,
                                        оценках, уведомлениях.
                                    </Typography>
                                </>
                            }
                            confirmFieldLabel="Название приложение"
                            confirmFieldExpectedValue={props.app.name}
                            handleDeleteButton={() => deleteCurrentApp()}
                        />
                    </Grid>
                    }
                </Grid>
                <Hidden smDown>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="secondary"
                        aria-label="update"
                        className={classes.fabBottom}
                        onClick={() => editApp()}
                    >
                        <UpdateRounded className={classes.extendedIcon}/>
                        Обновить
                    </Fab>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        variant="round"
                        size="medium"
                        color="secondary"
                        aria-label="update"
                        className={classes.fabBottom}
                        onClick={() => editApp()}
                    >
                        <UpdateRounded/>
                    </Fab>
                </Hidden>
            </Route>
        </RouteSwitch>
    );
}
