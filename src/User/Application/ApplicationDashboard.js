import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {
    ArrowForwardRounded,
    HelpOutlineRounded,
    HomeRounded,
    LoopRounded,
    NavigateNextRounded,
    SettingsRounded,
    StarBorderRounded,
    StarRounded
} from "@material-ui/icons";
import FormSectionStyles from "../../Styles/FormSectionStyles";
import MarketChipStyles from "../../Styles/MarketChipStyles";
import {Link as RouterLink} from "react-router-dom";
import clsx from "clsx";
import {HomepageUrl} from "../../App";
import {AppNameMaxLength, getAppMarketsArray, getMarketIdByStoreIndex, hasMarkets} from "../../Api/ApiAppHelper";
import {getRatings} from "../../Api/ApiRating";
import {deleteNotifications, getNotifications} from "../../Api/ApiNotification";
import {getAppNotificationsAlert} from "../../Helpers/AlertsHelper";
import {getLatestRatings} from "../../Api/ApiRatingsHelper";
import {getLatestReviews, getReviewsMultipleMarkets} from "../../Api/ApiReviewHelper";
import {filterNotificationsByApp} from "../../Api/ApiNotificationHelper";
import AppNoMarketsCard from "../../Components/AppNoMarketsCard";
import AdaptiveBreadcrumbItem from "../../Components/AdaptiveBreadcrumbItem";
import {formatDateShort} from "../../Helpers/UtilsHelper";
import {
    createLinkFromId,
    getLatestRatingsStartCheckDate,
    MarketsIndexes,
    MarketsInfo,
    MarketStarsTemplate
} from "../../Helpers/MarketsInfoHelper";
//images imports
import defaultAppIcon from "../../images/default_app_icon.png";

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

    containerNotCenteredSmallerPadding: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
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
        height: '100%'
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

    flexGrowFillCenterVertical: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },

    flexGrowFill: {
        flexGrow: 1
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

    extraToolbarTitleNoHide: {
        flexGrow: 1,
        display: 'block',
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

    applicationIconSmall: {
        borderRadius: "0.5em",
        width: theme.spacing(3.5),
        maxHeight: theme.spacing(3.5),
        marginRight: theme.spacing(0.5)
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

    textGreenBold: {
        fontWeight: "bold",
        color: green[400]
    },

    reviewCard: {
        height: '100%',
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        paddingBottom: theme.spacing(1)
    },

    mT: {
        marginTop: theme.spacing(1.5)
    },

    mYdividers: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5)
    }


}));
const useFormSectionStyles = makeStyles((theme) => FormSectionStyles(theme));
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function ApplicationDashboard(props) {

    const theme = useTheme();
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    const [appNotifications, setAppNotifications] = React.useState(undefined);
    const [latestRatings, setLatestRatings] = React.useState(undefined);
    const [latestReviews, setLatestReviews] = React.useState(undefined);

    useEffect(() => {
        if (props.app) {
            let markets = getAppMarketsArray(props.app);
            const requests = [];
            requests.push(getNotifications(props.userId));
            requests.push(getRatings(props.userId, props.app.id, getLatestRatingsStartCheckDate(new Date()), new Date()));
            requests.push(...getReviewsMultipleMarkets(props.userId, props.app.id, 0, 1, markets));
            Promise.all(requests)
                .then(([notifications, ratings, ...reviews]) => {

                    //update global notifications
                    props.updateUserNotifications(notifications);
                    setAppNotifications(filterNotificationsByApp(notifications, props.app));
                    setLatestRatings(getLatestRatings(ratings, props.app));
                    setLatestReviews(getLatestReviews(reviews));
                })
                .catch(err => console.log(err.message));
        }
    }, [props.app]);

    function reloadNotifications() {
        getNotifications(props.userId)
            .then(notifications => {
                props.updateUserNotifications(notifications);
                const newAppNotifications = notifications.filter(notification => notification.appId === props.app.id);
                setAppNotifications(newAppNotifications)
            })
            .catch(err => console.log(err.message));
    }

    function deleteAllAppNotifications() {
        console.log("delete all notifications");
        deleteNotifications(props.userId, appNotifications.map(n => n.id))
            .then(result => {
                if (result.ok) {
                    setAppNotifications([]);
                    reloadNotifications();
                } else {
                    props.showStatusAlert("Не удалось удалить уведомления","error");
                    console.log("error deleting notifications");
                }
            });
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={1}>
                    <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                        <Toolbar variant="dense" className={classes.extraToolbar}>
                            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextRounded fontSize="small"/>}
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
                                    isSelected
                                    link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                    icon={() => <img alt='app icon'
                                                     src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                                                     className={classes.applicationIconSmall}/>}
                                    text={props.app.name}
                                />}
                            </Breadcrumbs>

                            <Hidden smDown>
                                <Button
                                    edge="end"
                                    aria-label="app settings"
                                    component={RouterLink}
                                    to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/settings`}
                                    disableElevation
                                    variant="outlined"
                                    color="primary"
                                    size='small'
                                    endIcon={<SettingsRounded/>}
                                    className={classes.extraToolbarButtonBack}
                                >
                                    Настройки
                                </Button>
                            </Hidden>

                            <Hidden mdUp>
                                <IconButton
                                    edge="end"
                                    aria-label="app settings"
                                    component={RouterLink}
                                    to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/settings`}

                                    className={classes.extraToolbarButtonBack}
                                >
                                    {<SettingsRounded color="primary"/>}
                                </IconButton>
                            </Hidden>
                        </Toolbar>
                    </AppBar>
                </Paper>
            </Grid>

            {/*TODO !!! APPINFO CARD EXTRACT COMPONENT*/}
            <Grid item xs={12} md={7} lg={8}>
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
                            <Grid item xs={3} sm={2} md={2}>
                                <img alt='app icon'
                                     src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                                     className={classes.applicationIcon}/>
                            </Grid>
                            <Grid item xs={9} sm={10} md={10}>
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
                                return <Chip key={marketIndex}
                                             variant="outlined"
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

            {/*TODO IS NOTIFICATION SECTION IN APPS NEEDED?*/}
            <Grid item xs={12} md={5} lg={4}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={formClasses.container}>
                        <Typography variant="h6">
                            Уведомления
                        </Typography>
                        <Typography variant="body2">
                            Уведомления о новых отзывах и оценках
                        </Typography>
                    </div>
                    <Divider className={formClasses.fullWidthDivider}/>
                    <Container maxWidth='xs'
                               className={clsx(classes.containerNotCentered, classes.flexGrowFillCenterVertical)}>
                        {/*TODO FEATURE REQUEST: ERRORS WITH MARKETS NOTIFICATIONS*/}
                        <Box mt={2} mb={2}>
                            {getAppNotificationsAlert(appNotifications)}
                        </Box>
                    </Container>
                    {appNotifications &&
                    <>
                        <Divider className={classes.fullWidthDivider}/>

                        <Container maxWidth='xs' className={classes.containerNotCentered}>
                            <Box mt={1}>
                                {appNotifications.length !== 0
                                    ? <Button disableElevation
                                              size='small'
                                              variant="outlined"
                                              color="secondary"
                                              onClick={() => deleteAllAppNotifications()}>
                                        Очистить уведомления
                                    </Button>
                                    : <Button disableElevation
                                              size='small'
                                              variant="outlined"
                                              color="primary"
                                              onClick={() => reloadNotifications()}>
                                        Обновить уведомления
                                    </Button>
                                }
                            </Box>
                        </Container>
                    </>
                    }
                </Paper>
            </Grid>

            {props.app && hasMarkets(props.app) &&
            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={formClasses.container}>
                        <Typography variant="h6">
                            Средняя оценка
                        </Typography>
                        <Typography variant="body2">
                            Динамика изменения средней оценки приложения
                        </Typography>
                    </div>
                    <Divider className={formClasses.fullWidthDivider}/>

                    <Container maxWidth='md'
                               className={clsx(classes.containerNotCenteredSmallerPadding, classes.mYdividers, classes.flexGrowFillCenterVertical)}>
                        <Grid container alignItems='center' spacing={2}>
                            {latestRatings && getAppMarketsArray(props.app).map(marketIndex => {
                                return (<Grid key={marketIndex} item xs={12} sm={4} md={3} lg={3}>
                                    <Grid container alignItems='center' spacing={1} key={marketIndex}>
                                        <Grid item>
                                            <Avatar
                                                className={marketClasses.marketAvatar}
                                                variant='square'
                                                src={MarketsInfo[marketIndex].getIcon(false)}/>
                                        </Grid>
                                        <Grid item>
                                            <Box pl={0.5}>
                                                <Typography variant="body1">
                                                    <b>{MarketsInfo[marketIndex].name}</b>
                                                </Typography>
                                                {latestRatings[marketIndex].rating !== 0
                                                    ? <Typography variant="caption" noWrap>
                                                        {latestRatings[marketIndex].date} | <span
                                                        className={classes.textGreenBold}>{latestRatings[marketIndex].rating}</span>
                                                    </Typography>
                                                    : <Typography variant="caption">
                                                        Нет данных
                                                        с {formatDateShort(getLatestRatingsStartCheckDate(new Date()))}
                                                    </Typography>
                                                }
                                            </Box>
                                            <Box className={classes.textWithIcon}>
                                                <Typography variant="h6" display='inline'>
                                                    {latestRatings[marketIndex].rating !== 0
                                                        ? MarketStarsTemplate.map(value => {
                                                            if (latestRatings[marketIndex].rating < value)
                                                                return (
                                                                    <StarBorderRounded key={value} fontSize='inherit'
                                                                                       className={classes.reviewRating}/>)
                                                            return (<StarRounded key={value} fontSize='inherit'
                                                                                 className={classes.reviewRating}/>)
                                                        })
                                                        : MarketStarsTemplate.map(value => <HelpOutlineRounded
                                                            key={value}
                                                            fontSize='inherit'
                                                            color='error'/>)
                                                    }
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>);
                            })
                            }
                        </Grid>
                    </Container>
                    <Divider className={formClasses.fullWidthDivider}/>
                    <Container maxWidth='xs' className={classes.containerNotCentered}>
                        <Box mt={1}>
                            <Button
                                edge="end"
                                aria-label="app rating"
                                component={RouterLink}
                                to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/ratings`}
                                disableElevation
                                size='small'
                                variant="outlined"
                                endIcon={<ArrowForwardRounded/>}
                                color="primary">
                                Динамика оценок
                            </Button>
                        </Box>
                    </Container>
                </Paper>
            </Grid>
            }

            {props.app && hasMarkets(props.app) &&
            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={formClasses.container}>
                        <Typography variant="h6">
                            Отзывы
                        </Typography>
                        <Typography variant="body2">
                            Читайте и анализируйте отзывы о вашем приложении
                        </Typography>
                    </div>
                    <Divider className={formClasses.fullWidthDivider}/>

                    <Container
                        className={clsx(classes.containerNotCentered, classes.mYdividers, classes.flexGrowFillCenterVertical)}>
                        <Grid container alignItems='center'
                              spacing={2}>{/*TODO !!! justify='center' ONLY IF MD and 3 markets*/}
                            {latestReviews && latestReviews.map(review => {
                                return (<Grid key={review.marketIndex} xs={12} md={6} lg={4} item>
                                        <Box border={1} borderRadius={8} borderColor="grey.300"
                                             className={classes.reviewCard}>
                                            <Grid container alignItems='center' spacing={1}>
                                                <Grid item>
                                                    <Avatar
                                                        style={{backgroundColor: MarketsInfo[review.marketIndex].getChartColor(theme)}}
                                                        className={classes.reviewAvatar}>{
                                                        review.reviewerUsername === undefined
                                                            ? "?"
                                                            : review.reviewerUsername.match(/[a-zA-Zа-яА-Я]/)
                                                            ? review.reviewerUsername.charAt(0).toUpperCase()
                                                            : "!"
                                                    }
                                                    </Avatar>
                                                </Grid>
                                                <Grid item>
                                                    <Box pl={0.5}>
                                                        <Typography variant="body1" className={classes.textWithIcon}>
                                                <span> <Avatar
                                                    className={clsx(marketClasses.marketAvatarSmall, marketClasses.iconMargin)}
                                                    variant='square'
                                                    src={MarketsInfo[review.marketIndex].getIcon(false)}/></span>
                                                            <b>
                                                                {review.reviewerUsername === undefined
                                                                    ? "Имя неизвестно"
                                                                    : review.reviewerUsername}
                                                            </b>
                                                        </Typography>

                                                        <Typography variant="caption" noWrap>
                                                            {review.date} |
                                                            Версия: {review.version ? review.version : "?"}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="h6">
                                                        {review.rating !== 0
                                                            ? MarketStarsTemplate.map(value => {
                                                                if (review.rating < value)
                                                                    return (<StarBorderRounded key={value}
                                                                                               fontSize='inherit'
                                                                                               className={classes.reviewRating}/>)
                                                                return (<StarRounded key={value} fontSize='inherit'
                                                                                     className={classes.reviewRating}/>)
                                                            })
                                                            : MarketStarsTemplate.map(value => <HelpOutlineRounded
                                                                key={value}
                                                                fontSize='inherit'
                                                                color='error'/>)
                                                        }
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                            <Typography variant="body2" noWrap>
                                                {review.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })
                            }
                        </Grid>
                    </Container>
                    <Divider className={formClasses.fullWidthDivider}/>
                    <Container maxWidth='xs' className={classes.containerNotCentered}>
                        <Box mt={1}>
                            <Button
                                edge="end"
                                aria-label="app reviews"
                                component={RouterLink}
                                to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/reviews`}
                                disableElevation
                                size='small'
                                variant="outlined"
                                endIcon={<ArrowForwardRounded/>}
                                color="primary">
                                Все отзывы
                            </Button>
                        </Box>
                    </Container>
                </Paper>
            </Grid>
            }

            <Grid item xs={12}>
                <AppNoMarketsCard isShown={props.app && !hasMarkets(props.app)} userId={props.userId}
                                  appId={props.appId}/>
            </Grid>

        </Grid>);
}
