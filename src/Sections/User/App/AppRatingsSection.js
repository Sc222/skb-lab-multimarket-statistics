import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../../../Components/Chart';
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {getChipChartColor, MarketRatingPrecision, MarketsInfo} from "../../../Helpers/MarketsInfoHelper";
import {useMarketChipStyles} from "../../../Styles/MarketChipStyles";
import Container from "@material-ui/core/Container";
import {useFormSectionStyles} from "../../../Styles/FormSectionStyles";
import update from "immutability-helper";
import {AppNameMaxLength, getAppMarketsArray, hasMarkets} from "../../../Api/Helpers/ApiAppHelper";
import {format} from 'date-fns';
import Button from "@material-ui/core/Button";
import {getRatings} from "../../../Api/ApiRating";
import {HomeRounded, LoopRounded, NavigateNextRounded, SettingsRounded, StarsRounded} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../../../App";
import Hidden from "@material-ui/core/Hidden";
import AppNoMarketsCard from "../../../Components/AppNoMarketsCard";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import AdaptiveBreadcrumbItem from "../../../Components/AdaptiveBreadcrumbItem";
import defaultAppIcon from "../../../images/default_app_icon.png";
import DateTimePickerFromTo from "../../../Components/DateTimePickerFromTo";
import {UIDefaultValues} from "../../../Config";

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
    paperNoPadding: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '100%'
    },
    containerTopPadded: {
        flexGrow: 1,
        textAlign: "left",
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%'
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
        marginRight: theme.spacing(0.5),
    },
    applicationIconSmall: {
        borderRadius: "0.5em",
        width: theme.spacing(3.5),
        maxHeight: theme.spacing(3.5),
        marginRight: theme.spacing(0.5)
    }
}));

export default function AppRatingsSection(props) {

    const theme = useTheme();
    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const marketClasses = useMarketChipStyles();

    const [selectedChartMarkets, setSelectedChartMarkets] = React.useState([false, false, false]);
    const [chartData, setChartData] = React.useState(undefined);
    const [chartDateFrom, setChartDateFrom] = React.useState(UIDefaultValues.dateTimePickerFrom());
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

            getRatings(props.userId, props.app.id, UIDefaultValues.dateTimePickerFrom(), new Date())
                .then(ratings => fillChartDataWithRatings(ratings))
                .catch(err => console.log(err.message));
        }
    }, [props.app]);

    function fillChartDataWithRatings(ratings) {
        //replace 0 ratings with null and format date
        let formattedRatings = ratings.map(r => {
            let formattedRating = {};
            formattedRating.date = format(new Date(r.date), "dd/MM/yyyy HH:mm");
            formattedRating.playMarketRating = !r.playMarketRating || isNaN(r.playMarketRating) ? null : parseFloat(r.playMarketRating).toPrecision(MarketRatingPrecision);
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
                    props.showStatusAlert("График успешно обновлен", "success");
                    fillChartDataWithRatings(ratings);
                })
                .catch(err => {
                    props.updateIsTokenExpired(err.message);
                    props.showStatusAlert("Не удалось обновить график", "error");
                    console.log(err.message);
                });
        }
    }

    function toggleSelectedMarket(index) {
        const newValue = update(selectedChartMarkets, {[index]: {$set: !selectedChartMarkets[index]}});
        setSelectedChartMarkets(newValue);
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
                                    link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                    icon={() => <img alt='app icon'
                                                     src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                                                     className={classes.applicationIconSmall}/>}
                                    text={props.app.name}
                                />}
                                <AdaptiveBreadcrumbItem
                                    isSelected
                                    link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/ratings`}
                                    icon={StarsRounded}
                                    text="Оценки"
                                />
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
            <Grid item xs={12}>
                <AppNoMarketsCard isShown={props.app && !hasMarkets(props.app)} userId={props.userId}
                                  appId={props.appId}/>
            </Grid>
            {props.app && hasMarkets(props.app) &&
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
                        <DateTimePickerFromTo
                            dateFrom={chartDateFrom}
                            setDateFrom={setChartDateFrom}
                            dateFromError={chartDateFromError}
                            setDateFromError={setChartDateFromError}
                            dateTo={chartDateTo}
                            setDateTo={setChartDateTo}
                            dateToError={chartDateToError}
                            setDateToError={setChartDateToError}
                            handleShowButton={() => loadChartRatingsData()}
                        />
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
            </Grid>
            }
        </Grid>);
}
