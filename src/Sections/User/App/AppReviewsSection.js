import React, {useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";

//image imports
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
    getFirstExistingMarketRequestKey,
    MarketsInfo,
    MarketsRequestKeys,
    MarketStarsTemplate,
    ReviewFilterDateKey,
    ReviewFilterInfo,
    ReviewFilterRatingKey,
    ReviewFilterTypes,
    ReviewFilterVersionKey
} from "../../../Helpers/MarketsInfoHelper";
import Container from "@material-ui/core/Container";
import FormSectionStyles from "../../../Styles/FormSectionStyles";
import {AppNameMaxLength, AppVersionNullKey, getAppMarketsArray, hasMarkets} from "../../../Api/Helpers/ApiAppHelper";
import {format} from 'date-fns';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {getReviews} from "../../../Api/ApiReview";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
    FilterListRounded,
    GroupRounded,
    HelpOutlineRounded,
    HomeRounded,
    LoopRounded,
    NavigateNextRounded,
    SettingsRounded,
    StarBorderRounded,
    StarRounded
} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../../../App";
import Pagination from "@material-ui/lab/Pagination";
import {scrollToTop} from "../../../Helpers/UiHelper";
import Hidden from "@material-ui/core/Hidden";
import AppNoMarketsCard from "../../../Components/AppNoMarketsCard";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import AdaptiveBreadcrumbItem from "../../../Components/AdaptiveBreadcrumbItem";
import defaultAppIcon from "../../../images/default_app_icon.png";
import {getAppVersions} from "../../../Api/ApiApp";
import {UIDefaultValues, UIProperties} from "../../../Config";
import ReviewsFilterAddDialog from "../../../Components/ReviewsFilterSelectDialog";
import update from "immutability-helper";
import Chip from "@material-ui/core/Chip";
import {useMarginStyles} from "../../../Styles/MarginStyles";

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
    containerFilters: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
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

export default function AppReviewsSection(props) {

    const classes = useStyles();
    const formClasses = useFormSectionStyles();
    const margins = useMarginStyles();

    const [filterToEdit, setFilterToEdit] = React.useState(UIDefaultValues.reviewFilterToEdit);
    const [dialogFiltersOpen, setDialogFiltersOpen] = React.useState(false);
    const [reviewsSelectedFilters, setReviewsSelectedFilters] = React.useState(UIDefaultValues.reviewFilters);

    const [reviews, setReviews] = React.useState(undefined);
    const [reviewsCurrentPage, setReviewsPage] = React.useState(0);
    const [reviewsPerPage, setReviewsPerPage] = React.useState(UIProperties.reviewsPerPageDefault);
    const [reviewsSelectedMarket, setReviewsSelectedMarket] = React.useState(MarketsRequestKeys[0]);
    const [appVersions, setAppVersions] = React.useState([]);

    const reviewsTopRef = useRef(null);

    const handleChangeReviewsCurrentPage = (event, newPage) => {
        setReviewsPage(newPage);
        loadNextReviewsPage(newPage, reviewsPerPage, reviewsSelectedMarket, reviewsSelectedFilters);
    };

    //TablePagination starts from zero, default Pagination starts from 1 + scroll to top
    const handleChangeReviewsCurrentPageBottomPagination = (event, newPage) => {
        handleChangeReviewsCurrentPage(event, newPage - 1);
        scrollToTop(reviewsTopRef, false); //when isSmooth sometimes scroll is broken
    };

    const handleReviewsSelectedMarketChange = (event) => {
        const selectedMarket = event.target.value;
        setReviewsSelectedMarket(selectedMarket);
        setReviewsPage(0);
        loadNextReviewsPage(0, reviewsPerPage, selectedMarket, reviewsSelectedFilters);
        loadAppVersions(selectedMarket);

        // new market so reset version filter
        const newReviewsFilters = update(reviewsSelectedFilters, {[ReviewFilterVersionKey]: {$set: undefined}});
        setReviewsSelectedFilters(newReviewsFilters);
    };

    const handleChangeReviewsPerPage = (event) => {
        const newReviewsPerPage = parseInt(event.target.value, 10);
        setReviewsPerPage(newReviewsPerPage);
        setReviewsPage(0);
        loadNextReviewsPage(0, newReviewsPerPage, reviewsSelectedMarket, reviewsSelectedFilters);
    };

    const handleDialogOpen = () => {
        setDialogFiltersOpen(true);
    };

    const handleFilterEdit = (filter) => () => {
        // set filter to edit flag and open edit filter dialog (same as add filter dialog)
        setFilterToEdit({key:filter,value:reviewsSelectedFilters[filter]});
        handleDialogOpen();
    };

    //LIFEHACK TO PASS ARGUMENTS AND NOT CALL FUNCTION
    const handleFilterDelete = (filter) => () => {
        handleAddReviewsFilter(filter, undefined);
    };

    const handleAddReviewsFilter = (filter, value) => {
        const newReviewsFilters = update(reviewsSelectedFilters, {[filter]: {$set: value}});
        setReviewsSelectedFilters(newReviewsFilters);
        setReviewsPage(0);
        loadNextReviewsPage(0, reviewsPerPage, reviewsSelectedMarket, newReviewsFilters);

        // reset filter to edit flag
        if(filterToEdit.key!=="")
            setFilterToEdit(UIDefaultValues.reviewFilterToEdit);
    };

    useEffect(() => {
        if (props.app) {
            const defaultMarketKey = getFirstExistingMarketRequestKey(props.app);
            if (defaultMarketKey)
                setReviewsSelectedMarket(defaultMarketKey);
            const requests = [];
            requests.push(getReviews(props.userId, props.app.id, (reviewsCurrentPage) * reviewsPerPage, reviewsPerPage, defaultMarketKey));
            requests.push(getAppVersions(props.userId, props.app.id, defaultMarketKey));
            Promise.all(requests)
                .then(([reviews, versions]) => {
                    setReviews(reviews);
                    if (versions[0] === null)
                        versions[0] = AppVersionNullKey;
                    setAppVersions(versions);
                })
                .catch(err => console.log(err.message));
        }
    }, [props.app]);

    function loadAppVersions(selectedMarket) {
        getAppVersions(props.userId, props.app.id, selectedMarket)
            .then(versions => {
                if (versions[0] === null)
                    versions[0] = AppVersionNullKey;
                console.log("versions: " + versions);
                setAppVersions(versions);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function loadNextReviewsPage(page, perPage, selectedMarket, filters) {
        const date = filters[ReviewFilterDateKey];
        const versions = filters[ReviewFilterVersionKey];
        const ratings = filters[ReviewFilterRatingKey];
        console.log("GET: ");
        console.log(filters);
        getReviews(props.userId, props.app.id, (page) * perPage, perPage, selectedMarket, date, versions, ratings)
            .then(reviews => {
                setReviews(reviews);
            })
            .catch(err => {
                props.updateIsTokenExpired(err.message);
                props.showStatusAlert("Не удалось загрузить отзывы", "error");
                console.log(err.message);
                setReviews(undefined);
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
                                    link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}`}
                                    icon={() => <img alt='app icon'
                                                     src={props.app.picUrl !== undefined ? props.app.picUrl : defaultAppIcon}
                                                     className={classes.applicationIconSmall}/>}
                                    text={props.app.name}
                                />}
                                <AdaptiveBreadcrumbItem
                                    isSelected
                                    link={`${HomepageUrl}/user/${props.userId}/app/${props.appId}/reviews`}
                                    icon={GroupRounded}
                                    text="Отзывы"
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
                    <div className={formClasses.cardContainer}>
                        <div className={classes.containerTopPadded}>
                            <Typography variant="h6" ref={reviewsTopRef}>
                                Отзывы
                            </Typography>
                            <Typography variant="body2">
                                Читайте и анализируйте отзывы о вашем приложении
                            </Typography>
                        </div>
                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container className={classes.containerFilters}>
                            <Button onClick={handleDialogOpen} startIcon={<FilterListRounded/>} variant="outlined"
                                    color="primary">
                                Добавить фильтр
                            </Button>
                            <ReviewsFilterAddDialog
                                filterTypes={ReviewFilterTypes(reviewsSelectedFilters, filterToEdit.key)}
                                filterToEdit={filterToEdit}
                                filterVersions={appVersions}
                                dialogOpen={dialogFiltersOpen}
                                setDialogOpen={setDialogFiltersOpen}
                                handleAddFilter={handleAddReviewsFilter}
                            />
                            <Grid container className={margins.m1T} alignItems='flex-start' spacing={1}
                                  justify='flex-start'>
                                {Object.entries(reviewsSelectedFilters).map(([key, value]) => (
                                    value !== undefined &&
                                    <Grid item key={key}>
                                        <Chip color="primary" clickable
                                              onClick={handleFilterEdit(key)}
                                              onDelete={handleFilterDelete(key)}
                                              label={`${ReviewFilterInfo[key].name}: ${ReviewFilterInfo[key].getLabel(value)}`}/>
                                    </Grid>))
                                }
                            </Grid>
                        </Container>

                        <Divider className={formClasses.fullWidthDivider}/>
                        <Container className={classes.containerApps}>
                            <Grid container alignItems='center' spacing={2} justify='space-between'>
                                <Grid item>
                                    <FormControl variant="outlined" className={classes.selectStyle}>
                                        <InputLabel id="market-select-label">Магазин
                                            приложений</InputLabel>
                                        <Select
                                            labelId="market-select-label"
                                            id="market-select"
                                            value={reviewsSelectedMarket}
                                            onChange={handleReviewsSelectedMarketChange}
                                            label="Магазин приложений"
                                        >
                                            {props.app
                                            && getAppMarketsArray(props.app)
                                                .map(index =>
                                                    <MenuItem key={index} value={MarketsRequestKeys[index]}>
                                                        {MarketsInfo[index].name}
                                                    </MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Box border={1} mt={1} mb={1} borderRadius={4} borderColor="grey.400">
                                        <TablePagination
                                            component="div"
                                            labelRowsPerPage='На странице'
                                            count={!reviews ? 0 : reviews.total}
                                            page={reviewsCurrentPage}
                                            rowsPerPageOptions={UIProperties.reviewsPerPageVariants}
                                            onChangePage={handleChangeReviewsCurrentPage}
                                            rowsPerPage={reviewsPerPage}
                                            onChangeRowsPerPage={handleChangeReviewsPerPage}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container alignItems='stretch' justify='center' spacing={2}>
                                {reviews && reviews.foundItem.length !== 0 &&
                                reviews.foundItem.map(review =>
                                    <Grid key={review.text + review.date} xs={12} sm={12} md={6} lg={4} item>
                                        <Box border={1} borderRadius={8} borderColor="grey.300"
                                             className={classes.reviewCard}>
                                            <Grid container alignItems='center' spacing={1}>
                                                <Grid item>
                                                    <Avatar className={classes.reviewAvatar}>
                                                        {review.reviewerUsername === undefined
                                                            ? "?"
                                                            : review.reviewerUsername.match(/[a-zA-Zа-яА-Я]/)
                                                                ? review.reviewerUsername.charAt(0).toUpperCase()
                                                                : "!"}
                                                    </Avatar>
                                                </Grid>
                                                <Grid item>
                                                    <Box pl={0.5}>
                                                        <Typography variant="body1">
                                                            <b>{review.reviewerUsername === undefined
                                                                ? "Имя неизвестно"
                                                                : review.reviewerUsername}
                                                            </b>
                                                        </Typography>

                                                        <Typography variant="caption" noWrap>
                                                            {format(new Date(review.date), "dd/MM/yyyy HH:mm")} |
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
                                            <Typography variant="body2">
                                                {review.text}
                                            </Typography>
                                        </Box>
                                    </Grid>)
                                }
                            </Grid>
                            <Grid container justify="center">
                                <Grid item>
                                    <Box border={1} mt={2} py={1} borderRadius={4} borderColor="grey.400">
                                        <Pagination count={!reviews ? 0 : Math.ceil(reviews.total / reviewsPerPage)}
                                                    page={reviewsCurrentPage + 1}
                                                    onChange={handleChangeReviewsCurrentPageBottomPagination}
                                                    color='primary'
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </Paper>
            </Grid>
            }
        </Grid>);
}
