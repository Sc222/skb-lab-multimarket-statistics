import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
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
import {useFormSectionStyles} from "../../../Styles/FormSectionStyles";
import {useMarketChipStyles} from "../../../Styles/MarketChipStyles";
import {Link as RouterLink} from "react-router-dom";
import clsx from "clsx";
import {HomepageUrl} from "../../../App";
import {AppNameMaxLength, getAppMarketsArray, hasMarkets} from "../../../Api/Helpers/ApiAppHelper";
import {getRatings} from "../../../Api/ApiRating";
import {deleteAllNotificationsForApp, getNotifications} from "../../../Api/ApiNotification";
import {getAppNotificationsAlert} from "../../../Helpers/AlertsHelper";
import {getLatestRatings} from "../../../Api/Helpers/ApiRatingsHelper";
import {getLatestReviews, getReviewsMultipleMarkets} from "../../../Api/Helpers/ApiReviewHelper";
import {filterNotificationsByApp} from "../../../Api/Helpers/ApiNotificationHelper";
import AppNoMarketsCard from "../../../Components/AppNoMarketsCard";
import AdaptiveBreadcrumbItem from "../../../Components/AdaptiveBreadcrumbItem";
import {formatDateShort} from "../../../Helpers/UtilsHelper";
import {getLatestRatingsStartCheckDate, MarketsInfo, MarketStarsTemplate} from "../../../Helpers/MarketsInfoHelper";
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
    containerNotCenteredSmallerPadding: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
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
    flexGrowFillCenterVertical: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
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
    extraToolbarButtonBack: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
    },
    applicationIconSmall: {
        borderRadius: "0.5em",
        width: theme.spacing(3.5),
        maxHeight: theme.spacing(3.5),
        marginRight: theme.spacing(0.5)
    },
    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5)
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
    mYdividers: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5)
    }
}));

export default function AppDashboard(props) {
    const theme = useTheme();
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketChipClasses = useMarketChipStyles();

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
    }, [props.app, props.userId]);

    function reloadNotifications() {
        getNotifications(props.userId)
            .then(notifications => {
                props.updateUserNotifications(notifications);
                const newAppNotifications = notifications.filter(notification => notification.appId === props.app.id);
                setAppNotifications(newAppNotifications)
            })
            .catch(err => {
                props.updateIsTokenExpired(err.message);
                props.showStatusAlert("Не удалось обновить уведомления", "error");
                console.log(err.message);
            });
    }

    function deleteAllAppNotifications() {
        console.log("delete all notifications");
        deleteAllNotificationsForApp(props.userId, props.appId)
            .then(result => {
                if (result.ok) {
                    setAppNotifications([]);
                    reloadNotifications();
                } else {
                    props.updateIsTokenExpired(result.status.toString());
                    props.showStatusAlert("Не удалось удалить уведомления", "error");
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

            {props.app &&
            <Grid item xs={12} md={7} lg={8}>
                <AppInfoCard app={props.app} iconGridMd={2} hasCardDescription/>
            </Grid>
            }

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
                                                className={marketChipClasses.marketAvatar}
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
                              spacing={2}>
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
                                                    className={clsx(marketChipClasses.marketAvatarSmall, marketChipClasses.iconMargin)}
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
