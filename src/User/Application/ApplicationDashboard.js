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
import {getChipChartColor, MarketsInfo} from "../../Constants/MarketsInfo";
import MarketChipStyles from "../../Styles/MarketChipStyles";
import Container from "@material-ui/core/Container";
import FormSectionStyles from "../../Styles/FormSectionStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import update from "immutability-helper";

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

    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

    console.log(selectedChartMarkets);

    const [chartAverageRatingType, setAverageRatingType] = React.useState('day'); //all time or by day
    const [chartAverageRatingInterval, setAverageRatingInterval] = React.useState('day'); //daily, weekly, monthly
    const [chartData, setChartData] = React.useState(undefined);

    useEffect(() => {
        if (props.app) {
            setSelectedChartMarkets([
                !props.app.markets[0].disabled,
                !props.app.markets[1].disabled,
                !props.app.markets[2].disabled
            ]);
            console.log([
                !props.app.markets[0].disabled,
                !props.app.markets[1].disabled,
                !props.app.markets[2].disabled
            ]);
        }
    }, [props.app]);

    useEffect(() => {

        //todo API: load chart data from server

        function createData(date, playStore, appStore, appGallery) {
            return {date, playStore, appStore, appGallery};
        }

        const demoData = [
            createData('00:00', 4.0, 4.2, 3.8),
            createData('03:00', 4.5, 4.1, 3.9),
            createData('06:00', 4.7, 3.9, 4.2),
            createData('09:00', 4.3, 3.7, 4.5),
            createData('12:00', 4.5, 3.8, 4.3),
            createData('15:00', 4.3, 4.0, 4.1),
            createData('18:00', 4.7, 4.3, 3.8),
            createData('21:00', 4.8, 4.6, 4.0),
            createData('24:00', 4.5, 4.4, 4.3),
        ];

        setChartData(demoData);

    }, [props.username, props.app, chartAverageRatingType, chartAverageRatingInterval]);

    function toggleSelectedMarket(index) {
        console.log('toggle market: ' + index);
        const newValue = update(selectedChartMarkets, {[index]: {$set: !selectedChartMarkets[index]}});
        setSelectedChartMarkets(newValue);
    }

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
            <Grid item xs={12}>
                {/* TODO !!! IMPORTANT show app not found card when app not found */}
                {props.app &&
                <Paper className={classes.paperNoPadding} elevation={1}>
                    <div className={classes.appDescriptionContainer}>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item xs={3} sm={2} md={1}>
                                <img alt='app icon' src={props.app.icon}
                                     style={{maxWidth: "100%", maxHeight: '100%'}}/>
                            </Grid>
                            <Grid item xs={9} sm={10} md={11}>
                                <Typography component="h5" variant="h6">{props.app.title}</Typography>
                                <Typography component="p" variant="body1">
                                    {props.app.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider className={classes.fullWidthDivider}/>
                    <div className={marketClasses.marketsContainer}>
                        {
                            props.app.markets.map((market, index) => {
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
                }
            </Grid>

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
                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                        </Container>
                    </div>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={formClasses.cardContainer}>
                        <div className={formClasses.container}>
                            <Typography variant="h6">
                                Средняя оценка
                            </Typography>
                            <Typography variant="body2">
                                Как меняется средняя оценка приложения со временем
                            </Typography>
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>

                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                            <Grid container spacing={2} justify='flex-start' className={classes.chartSelectsContainer}>
                                <Grid item xs={9} sm={7}>
                                    <FormControl fullWidth variant="outlined" size='small'>
                                        <InputLabel id="averageRatingTypeLabel">Средняя оценка</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="averageRatingTypeLabel"
                                            id="averageRatingType"
                                            value={chartAverageRatingType}
                                            label="Средняя оценка"
                                            onChange={event => setAverageRatingType(event.target.value)}>
                                            <MenuItem value={'day'}>За день</MenuItem>
                                            <MenuItem value={'allTime'}>За все время</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={5}>
                                    <FormControl fullWidth variant="outlined" size='small'>
                                        <InputLabel id="averageRatingIntervalLabel">Интервал</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="averageRatingIntervalLabel"
                                            id="averageRatingInterval"
                                            value={chartAverageRatingInterval}
                                            label="Интервал"
                                            onChange={event => setAverageRatingInterval(event.target.value)}>
                                            <MenuItem value={'day'}>День</MenuItem>
                                            <MenuItem value={'week'}>Неделя</MenuItem>
                                            <MenuItem value={'month'}>Месяц</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Container>

                        <Chart data={chartData} selectedMarkets={selectedChartMarkets}/>

                        <Divider className={formClasses.fullWidthDivider}/>
                        <div className={marketClasses.marketsContainer}>
                            {props.app &&
                            props.app.markets.map((market, index) => {
                                return (!market.disabled &&
                                    <Chip
                                        clickable
                                        key={MarketsInfo[index].name}
                                        component='a'
                                        color={selectedChartMarkets[index] ? "primary" : "default"}
                                        style={{backgroundColor: getChipChartColor(theme, index, selectedChartMarkets[index])}}
                                        onClick={() => toggleSelectedMarket(index)}
                                        label={MarketsInfo[index].name}
                                    />)
                            })
                            }
                        </div>

                    </div>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={formClasses.cardContainer}>
                        <div className={formClasses.container}>
                            <Typography variant="h6">
                                Отзывы
                            </Typography>
                            <Typography variant="body2">
                                Читайте и анализируйте отзывы о вашем приложении
                            </Typography>
                            
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container maxWidth='sm' className={classes.containerNotCentered}>
                        </Container>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}
