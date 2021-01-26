import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Avatar from "@material-ui/core/Avatar";


//image imports
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {
    createLinkFromId,
    getChipChartColor,
    getFirstExistingMarketRequestKey,
    MarketRatingPrecision,
    MarketsIndexes,
    MarketsInfo,
    MarketsRequestKeys
} from "../../Helpers/MarketsInfoHelper";
import MarketChipStyles from "../../Styles/MarketChipStyles";
import Container from "@material-ui/core/Container";
import FormSectionStyles from "../../Styles/FormSectionStyles";
import update from "immutability-helper";
import defaultAppIcon from "../../images/default_app_icon.png";
import {getMarketIdByStoreIndex} from "../../Api/ApiAppHelper";

import DateFnsUtils from '@date-io/date-fns';
import {format} from 'date-fns';

import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {getRatings} from "../../Api/ApiRating";
import {deleteNotifications, getNotifications} from "../../Api/ApiNotification";
import {getAppNotificationsAlert} from "../../Helpers/AlertsHelper";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {getReviews} from "../../Api/ApiReview";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {StarBorderRounded, StarRounded} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";

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
    }
}));
const useFormSectionStyles = makeStyles((theme) => FormSectionStyles(theme));
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function ApplicationDashboard(props) {

    const theme = useTheme();
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    const [selectedChartMarkets, setSelectedChartMarkets] = React.useState([false, false, false]);
    const [appNotifications, setAppNotifications] = React.useState(undefined);
    const [chartData, setChartData] = React.useState(undefined);

    //for status snackbars
    const [isChartsStatusSuccessOpen, setChartsStatusSuccessOpen] = React.useState(false);

    const [chartDateFrom, setChartDateFrom] = React.useState(new Date().setDate(new Date().getDate() - 1));
    const [chartDateTo, setChartDateTo] = React.useState(new Date());
    const [chartDateFromError, setChartDateFromError] = React.useState('');
    const [chartDateToError, setChartDateToError] = React.useState('');

    //for reviews
    const [reviews, setReviews] = React.useState(undefined);
    const [reviewsCurrentPage, setReviewsPage] = React.useState(0);
    const [reviewsPerPage, setReviewsPerPage] = React.useState(10);
    const [reviewsSelectedMarket, setReviewsSelectedMarket] = React.useState(MarketsRequestKeys[0]);

    const handleChangeReviewsCurrentPage = (event, newPage) => {
        setReviewsPage(newPage);
        loadNextReviewsPage(newPage, reviewsPerPage, reviewsSelectedMarket);
    };

    const handleReviewsSelectedMarketChange = (event) => {
        const selectedMarket = event.target.value;
        setReviewsSelectedMarket(selectedMarket);
        setReviewsPage(0);
        loadNextReviewsPage(0, reviewsPerPage, selectedMarket);
    };

    const handleChangeReviewsPerPage = (event) => {
        const newReviewsPerPage = parseInt(event.target.value, 10);
        setReviewsPerPage(newReviewsPerPage);
        setReviewsPage(0);
        loadNextReviewsPage(0, newReviewsPerPage, reviewsSelectedMarket);
    };

    function hasChartErrors() {
        return !chartDateFrom || !chartDateTo ||
            chartDateFromError + chartDateToError !== "";
    }

    useEffect(() => {

        if (props.app) {
            setSelectedChartMarkets([
                props.app.playMarketId !== undefined,
                props.app.appStoreId !== undefined,
                props.app.appGalleryId !== undefined
            ]);

            Promise.all([
                getNotifications(props.userId),
                getRatings(props.userId, props.app.id, new Date().setDate(new Date().getDate() - 1), new Date()),
                getReviews(props.userId, props.app.id, (reviewsCurrentPage) * reviewsPerPage, reviewsPerPage, getFirstExistingMarketRequestKey(props.app))
            ])
                .then(([notifications, ratings, reviews]) => {

                    //update global notifications
                    props.updateUserNotifications(notifications);

                    /*TODO IS NOTIFICATION SECTION IN APPS NEEDED?*/
                    //select current app notifications
                    const newAppNotifications = notifications.filter(notification => notification.appId === props.app.id);
                    setAppNotifications(newAppNotifications)

                    fillChartDataWithRatings(ratings);

                    console.log("reviews: ");
                    console.log(reviews);
                    setReviews(reviews);

                })
                .catch(err => console.log(err.message));
        }
    }, [props.app]);

    function fillChartDataWithRatings(ratings) {
        console.log("load ratings");
        console.log(ratings);

        //replace 0 ratings with 0
        ratings.forEach(r => {
            r.date = format(new Date(r.date), "dd/MM/yyyy HH:mm");
            r.playMarketRating = !r.playMarketRating ? null : parseFloat(r.playMarketRating).toPrecision(MarketRatingPrecision);
            r.appStoreRating = !r.appStoreRating ? null : parseFloat(r.appStoreRating).toPrecision(MarketRatingPrecision);
            r.appGalleryRating = !r.appGalleryRating ? null : parseFloat(r.appGalleryRating).toPrecision(MarketRatingPrecision);
        })
        setChartData(ratings);
    }

    function loadNextReviewsPage(page, perPage, selectedMarket) {
        getReviews(props.userId, props.app.id, (page) * perPage, perPage, selectedMarket)
            .then(reviews => {
                console.log("reviews next page: ");
                console.log(reviews);
                setReviews(reviews);

            }).catch(err => console.log(err.message));

    }

    function loadChartRatingsData() {
        if (!hasChartErrors()) {
            getRatings(props.userId, props.app.id, chartDateFrom, chartDateTo)
                .then(ratings => {
                    setChartsStatusSuccessOpen(true);
                    fillChartDataWithRatings(ratings);
                }).catch(err => console.log(err.message));
        }
    }

    function toggleSelectedMarket(index) {
        console.log('toggle market: ' + index);
        const newValue = update(selectedChartMarkets, {[index]: {$set: !selectedChartMarkets[index]}});
        setSelectedChartMarkets(newValue);
    }

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
                } else {
                    console.log("error deleting notifications");
                    //todo show error alert
                }
            });
    }

    const handleChartsStatusSuccessClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setChartsStatusSuccessOpen(false);
    };


    const handleChartDateFromError = (error, _) => {
        setChartDateFromError(error);
    }

    const handleChartDateToError = (error, _) => {
        setChartDateToError(error);
    }

    const handleChartDateFromInput = (date) => {
        setChartDateFrom(date);
    };

    const handleChartDateToInput = (date) => {
        setChartDateTo(date);
    };

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
            {/*TODO !!! APPINFO CARD EXTRACT COMPONENT*/}
            <Grid item xs={12}>
                {props.app &&
                <Paper className={classes.paperNoPadding} elevation={1}>
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

            {/*TODO IS NOTIFICATION SECTION IN APPS NEEDED?*/}
            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paper}>
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
                        <Container maxWidth='xs' className={classes.containerNotCentered}>
                            {/* TODO IS ALL NOTIFICATIONS LISTING NEEDED?
                            <Paper>
                                <Grid container alignItems='center' spacing={2} style={{maxHeight: '100px'}}>
                                    {appNotifications?.map((notification, index) => {
                                        return (<Grid key={notification.id} item xs={6} sm={4}>
                                            <Box borderRadius={8} border={1} borderColor="text.primary"
                                                 style={{
                                                     display: 'flex',
                                                     overflow: 'auto',
                                                     flexDirection: 'column',
                                                     height: '100%',
                                                 }}
                                            >
                                                <div style={{flexGrow: 1, height: '100%'}}>
                                                    <Typography variant='body1' color='textPrimary'>
                                                        {notification.title}
                                                    </Typography>

                                                    <Typography variant='body2'
                                                                color='textSecondary'>{notification.text}
                                                    </Typography>
                                                </div>
                                                <Link
                                                    className={classes.marginLeftSmall}
                                                    component="button"
                                                    variant="body2"
                                                    color='error'
                                                    onClick={() => updateNotifications(notification.id, index)}
                                                >
                                                    Удалить
                                                </Link>
                                            </Box>
                                        </Grid>);})}
                                </Grid>
                            </Paper>
                            */}

                            {/*TODO FEATURE REQUEST: ERRORS WITH MARKETS NOTIFICATIONS*/}
                            <Box mt={2} mb={2}>
                                {getAppNotificationsAlert(appNotifications)}
                            </Box>

                        </Container>
                        {appNotifications &&
                        <>
                            <Divider className={classes.fullWidthDivider}/>

                            <Container maxWidth='xs' className={classes.containerNotCentered}>
                                <Box mt={2}>
                                    {appNotifications.length !== 0
                                        ? <Button disableElevation
                                                  variant="outlined"
                                                  color="secondary"
                                                  onClick={() => deleteAllAppNotifications()}>
                                            Очистить уведомления
                                        </Button>
                                        : <Button disableElevation
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
                    </div>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paperNoPadding}>
                    <div className={classes.containerTopPadded}>
                        <Typography variant="h6">
                            Средняя оценка
                        </Typography>
                        <Typography variant="body2">
                            Как меняется средняя оценка приложения со временем
                        </Typography>
                    </div>
                    <Divider className={formClasses.fullWidthDivider}/>

                    <Container maxWidth='md' className={classes.containerNotCentered}>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container spacing={2} justify='flex-start' alignItems='stretch'
                                  className={classes.chartSelectsContainer}>
                                <Grid item xs={7} sm={10} md={3}>
                                    {/*TODO MIN AND MAX DATE IGNORE HOURS AND MINUTES :(*/}
                                    <KeyboardDateTimePicker
                                        fullWidth
                                        size="small"
                                        disableFuture
                                        value={chartDateFrom}
                                        onChange={handleChartDateFromInput}
                                        maxDate={chartDateTo}
                                        onError={handleChartDateFromError}
                                        error={!chartDateFrom || chartDateFromError !== ""}
                                        helperText={!chartDateFrom
                                            ? "Укажите начальную дату"
                                            : chartDateFromError
                                        }
                                        format="dd/MM/yyyy HH:mm"
                                        inputVariant="outlined"
                                        ampm={false}
                                        label="От"
                                        id="date-picker-from"
                                        variant="inline"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        invalidDateMessage='Неверный формат даты'
                                        maxDateMessage='Дата не может быть позднее даты в поле «До»'
                                    />
                                </Grid>
                                <Grid item xs={7} sm={10} md={3}>
                                    <KeyboardDateTimePicker
                                        fullWidth
                                        size="small"
                                        disableFuture
                                        value={chartDateTo}
                                        onChange={handleChartDateToInput}
                                        minDate={chartDateFrom}
                                        onError={handleChartDateToError}
                                        error={!chartDateTo || chartDateToError !== ""}
                                        helperText={!chartDateTo
                                            ? "Укажите конечную дату"
                                            : chartDateToError
                                        }
                                        format="dd/MM/yyyy HH:mm"
                                        inputVariant="outlined"
                                        ampm={false}
                                        label="До"
                                        id="date-picker-to"
                                        variant="inline"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        invalidDateMessage='Неверный формат даты'
                                        maxDateMessage='Дата не может быть позднее текущего времени'
                                        minDateMessage='Дата не может быть раньше даты в поле «От»'
                                    />
                                </Grid>
                                <Grid item xs={7} sm={8} md={4}>
                                    <Button disableElevation variant="contained" color="primary" size='medium'
                                            onClick={() => loadChartRatingsData()}>
                                        Показать
                                    </Button>
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Container>

                    <Chart data={chartData} selectedMarkets={selectedChartMarkets}/>
                    {chartData && chartData.length !== 0 && selectedChartMarkets.some(isSelected => isSelected) &&
                    <div className={formClasses.container}>
                        <Typography variant="caption" color='primary'>
                            Если диапазон графика меньше указанного, это значит, что отзывы есть не на всем исходном
                            диапазоне
                        </Typography>
                    </div>}

                    <Divider className={formClasses.fullWidthDivider}/>
                    <div className={marketClasses.marketsContainer}>
                        {props.app &&
                        MarketsIndexes.map(marketIndex => {
                            let marketId = getMarketIdByStoreIndex(props.app, marketIndex);
                            return marketId !== undefined &&
                                <Chip
                                    clickable
                                    component='a'
                                    label={MarketsInfo[marketIndex].name}
                                    color={selectedChartMarkets[marketIndex] ? "primary" : "default"}
                                    style={{backgroundColor: getChipChartColor(theme, marketIndex, selectedChartMarkets[marketIndex])}}
                                    onClick={() => toggleSelectedMarket(marketIndex)}
                                />
                        })
                        }
                    </div>
                </Paper>
                <Snackbar open={isChartsStatusSuccessOpen} autoHideDuration={1000}
                          onClose={handleChartsStatusSuccessClose}>
                    <Alert onClose={handleChartsStatusSuccessClose} severity="success">
                        График успешно обновлён
                    </Alert>
                </Snackbar>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paperNoPadding}>
                    <div className={formClasses.cardContainer}>
                        <div className={classes.containerTopPadded}>
                            <Typography variant="h6">
                                Отзывы
                            </Typography>
                            <Typography variant="body2">
                                Читайте и анализируйте отзывы о вашем приложении
                            </Typography>

                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container maxWidth='md' className={classes.containerApps}>
                            <Grid container alignItems='center' spacing={1} justify='space-between'>

                                <Grid item >
                            <FormControl variant="outlined" className={classes.selectStyle}>
                                <InputLabel id="demo-simple-select-outlined-label">Магазин приложений</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={reviewsSelectedMarket}
                                    onChange={handleReviewsSelectedMarketChange}
                                    label="Магазин приложений"
                                >
                                    {
                                        MarketsRequestKeys.map((key, index) =>
                                            <MenuItem value={key}>{MarketsInfo[index].name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                                </Grid>
                                <Grid item >
                                    <Box border={1} mt={1} mb={1} borderRadius={4} borderColor="grey.400">
                            <TablePagination
                                component="div"
                                labelRowsPerPage='На странице'
                                count={!reviews ? 0 : reviews.total}
                                page={reviewsCurrentPage}
                                rowsPerPageOptions={[10, 25, 50, 100, 250]}
                                onChangePage={handleChangeReviewsCurrentPage}
                                rowsPerPage={reviewsPerPage}
                                onChangeRowsPerPage={handleChangeReviewsPerPage}
                            />
                                    </Box>
                                </Grid>

                            </Grid>
                            <Grid container alignItems='stretch' spacing={2}>
                                {reviews && reviews.foundItem.length !== 0 &&
                                reviews.foundItem.map(review =>
                                    <Grid xs={12} sm={12} md={6} item key={review.text + review.date}>
                                        <Box border={1} borderRadius={8} borderColor="grey.300"
                                             className={classes.reviewCard}>
                                            <Grid container alignItems='center' spacing={1}>

                                                <Grid item>
                                                    <Avatar
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
                                                    <Typography variant="body1">
                                                        <b>
                                                            {review.reviewerUsername === undefined
                                                            ? "Имя неизвестно"
                                                            : review.reviewerUsername}
                                                        </b>
                                                    </Typography>

                                                    <Typography variant="caption" noWrap>
                                                        {format(new Date(review.date), "dd/MM/yyyy HH:mm")} | Версия: {review.version}
                                                    </Typography>
                                                        <br/>
                                                    <Typography variant="caption" noWrap>

                                                    </Typography>
                                                    </Box>
                                                    <Typography variant="h6">
                                                        {[1, 2, 3, 4, 5].map(value => {
                                                            if (review.rating < value)
                                                                return (<StarBorderRounded fontSize='inherit'
                                                                    className={classes.reviewRating}/>)
                                                            return (<StarRounded fontSize='inherit' className={classes.reviewRating}/>)
                                                        })
                                                        }
                                                    </Typography>

                                                </Grid>
                                            </Grid>


                                            <Typography variant="body2">
                                                {review.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )
                                }
                            </Grid>

                        </Container>


                        <Divider className={formClasses.fullWidthDivider}/>
                        {/* <Grid container  justify = "center"> </Grid>*/}


                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}
