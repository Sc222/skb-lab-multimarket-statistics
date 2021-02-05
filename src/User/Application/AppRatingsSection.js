import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';


//image imports
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {getChipChartColor, MarketRatingPrecision, MarketsInfo} from "../../Helpers/MarketsInfoHelper";
import MarketChipStyles from "../../Styles/MarketChipStyles";
import Container from "@material-ui/core/Container";
import FormSectionStyles from "../../Styles/FormSectionStyles";
import update from "immutability-helper";
import {getAppMarketsArray, hasMarkets} from "../../Api/ApiAppHelper";

import DateFnsUtils from '@date-io/date-fns';
import {format} from 'date-fns';

import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {getRatings} from "../../Api/ApiRating";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {SettingsRounded} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import {Link as RouterLink} from "react-router-dom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import {HomepageUrl} from "../../App";
import Hidden from "@material-ui/core/Hidden";
import AppNoMarketsCard from "../../Components/AppNoMarketsCard";


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

export default function AppRatingsSection(props) {

    const theme = useTheme();
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    const [selectedChartMarkets, setSelectedChartMarkets] = React.useState([false, false, false]);
    const [chartData, setChartData] = React.useState(undefined);

    //for status snackbars
    const [isChartsStatusSuccessOpen, setChartsStatusSuccessOpen] = React.useState(false);

    const [chartDateFrom, setChartDateFrom] = React.useState(new Date().setDate(new Date().getDate() - 1));
    const [chartDateTo, setChartDateTo] = React.useState(new Date());
    const [chartDateFromError, setChartDateFromError] = React.useState('');
    const [chartDateToError, setChartDateToError] = React.useState('');

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

            getRatings(props.userId, props.app.id, new Date().setDate(new Date().getDate() - 1), new Date())
                .then(ratings => fillChartDataWithRatings(ratings))
                .catch(err => console.log(err.message));
        }
    }, [props.app]);

    function fillChartDataWithRatings(ratings) {
        //replace 0 ratings with null and format date
        let formattedRatings = ratings.map(r => {
            let formattedRating = {};
            formattedRating.date = format(new Date(r.date), "dd/MM/yyyy HH:mm");
            formattedRating.playMarketRating = !r.playMarketRating ? null : parseFloat(r.playMarketRating).toPrecision(MarketRatingPrecision);
            formattedRating.appStoreRating = !r.appStoreRating ? null : parseFloat(r.appStoreRating).toPrecision(MarketRatingPrecision);
            formattedRating.appGalleryRating = !r.appGalleryRating ? null : parseFloat(r.appGalleryRating).toPrecision(MarketRatingPrecision);
            return formattedRating;
        });

        setChartData(formattedRatings);
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
        const newValue = update(selectedChartMarkets, {[index]: {$set: !selectedChartMarkets[index]}});
        setSelectedChartMarkets(newValue);
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
                        <Toolbar variant="dense" className={classes.extraToolbar} disableGutters>
                            <IconButton
                                edge="start"
                                aria-label="back to app dashboard"
                                component={RouterLink}
                                to={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                className={classes.extraToolbarButtonBack}
                            >
                                {<ArrowBackRoundedIcon color="action"/>}
                            </IconButton>

                            <Typography className={classes.extraToolbarTitleNoHide} variant="h6" noWrap>
                                Панель управления
                            </Typography>
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

            <AppNoMarketsCard isShown={props.app && !hasMarkets(props.app)} userId={props.userId} appId={props.appId}/>

            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paperNoPadding}>
                    <div className={classes.containerTopPadded}>
                        <Typography variant="h6">
                            Средняя оценка
                        </Typography>
                        <Typography variant="body2">
                            Динамика изменения средней оценки приложения
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
                            Если диапазон графика меньше указанного, это значит, что оценки есть не на всем исходном
                            диапазоне
                        </Typography>
                    </div>}

                    <Divider className={formClasses.fullWidthDivider}/>
                    <div className={marketClasses.marketsContainer}>
                        {props.app &&
                        getAppMarketsArray(props.app).map(marketIndex =>
                            <Chip
                                key={marketIndex}
                                clickable
                                component='a'
                                label={MarketsInfo[marketIndex].name}
                                color={selectedChartMarkets[marketIndex] ? "primary" : "default"}
                                style={{backgroundColor: getChipChartColor(theme, marketIndex, selectedChartMarkets[marketIndex])}}
                                onClick={() => toggleSelectedMarket(marketIndex)}
                            />)
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
        </Grid>);
}
