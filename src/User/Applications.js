import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//image imports
import defaultAppIcon from "../images/default_app_icon.png";

import {fade} from "@material-ui/core";
import {AddRounded, SearchRounded} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link as RouterLink} from "react-router-dom";
import MarketChipStyles from "../Styles/MarketChipStyles";
import {createLinkFromId, MarketsIndexes, MarketsInfo} from "../Helpers/MarketsInfoHelper";
import {getApps} from "../Api/ApiApp";
import {getMarketIdByStoreIndex} from "../Api/ApiAppHelper";
import {escapeRegex} from "../Helpers/UtilsHelper";
import {HomepageUrl} from "../App";
import Link from "@material-ui/core/Link";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({

    fabBottom: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },

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

    primaryRippleFillHeight: {
        color: theme.palette.primary.light,
        height: '100%'
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

    applicationIcon: {
        borderRadius: "1.5em",
        maxWidth: "100%",
        maxHeight: '100%'
    }

}));
const useMarketChipStyles = makeStyles((theme) => MarketChipStyles(theme));

export default function Applications(props) {
    let userId = props.userId;
    const [apps, setApps] = React.useState(undefined);
    const [appsNameFilter, setAppsNameFilter] = React.useState('');

    const classes = useStyles();
    const marketClasses = useMarketChipStyles();

    const handleAppsNameFilterInput = (event) => {
        setAppsNameFilter(event.target.value);
    };

    function isNameMatchesSearchFilter(app) {
        return app.name.match(new RegExp(`^${escapeRegex(appsNameFilter)}.*`, 'i'));
    }

    useEffect(() => {
        getApps(userId)
            .then(apps => {
                console.log("load apps");
                console.log(apps);
                setApps(apps);
            })
            .catch(err => console.log(err.message));
    }, []);

    function renderApplicationsGrid() {
        if (apps === undefined) {
            return (
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.paperContainer}>
                            <Typography component="h2" variant="h6" color="primary">
                                Загрузка
                            </Typography>
                            <Typography variant="body1">
                                Загрузка списка приложений с сервера...
                            </Typography>
                        </div>
                    </Paper>
                </Grid>);
        } else if (apps.length === 0) {
            return (
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.paperContainer}>
                            <Typography component="h2" variant="h6" color="primary">У Вас еще нет
                                приложений</Typography>
                            <Typography component="p" variant="body1">
                                Нажмите на кнопку <Link component={RouterLink}
                                                        to={`${HomepageUrl}/user/${userId}/new-app`}>добавить</Link> для
                                того, чтобы создать новое приложение
                            </Typography>
                        </div>
                    </Paper>
                </Grid>);
        } else if (apps.length !== 0) {
            return apps.filter(isNameMatchesSearchFilter).map(app => {
                return (<Grid key={app.id} item xs={12} md={6}>
                        <Paper className={classes.paperNoPadding}>
                            <ButtonBase className={classes.primaryRippleFillHeight} component={RouterLink}
                                        to={`${HomepageUrl}/user/${userId}/app/${app.id}/`}>
                                <div className={classes.appDescriptionContainer}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item xs={3} sm={2} md={3}>
                                            <img alt='app icon'
                                                 className={classes.applicationIcon}
                                                 src={app.picUrl !== undefined ? app.picUrl : defaultAppIcon}/>
                                        </Grid>
                                        <Grid item xs={9} sm={10} md={9}>
                                            <Typography component="h5" variant="h6">{app.name}</Typography>
                                            <Typography component="p" variant="body1">
                                                {app.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </ButtonBase>
                            <Divider className={classes.fullWidthDivider}/>
                            <div className={marketClasses.marketsContainer}>
                                {
                                    MarketsIndexes.map(marketIndex => {
                                        let marketId = getMarketIdByStoreIndex(app, marketIndex);
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
                    </Grid>
                );
            })
        }
    }

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={1}>
                        <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                            <Toolbar variant="dense" className={classes.extraToolbar}>
                                <Typography className={classes.extraToolbarTitle} variant="h6" noWrap>
                                    Приложения
                                </Typography>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchRounded color='action'/>
                                    </div>
                                    <InputBase
                                        value={appsNameFilter}
                                        onChange={handleAppsNameFilterInput}
                                        placeholder="Поиск по названию…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </div>
                            </Toolbar>
                        </AppBar>
                    </Paper>
                </Grid>

                {renderApplicationsGrid()}

            </Grid>

            <Hidden smDown>
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    component={RouterLink}
                    to={`${HomepageUrl}/user/${userId}/new-app`}
                >
                    <AddRounded className={classes.extendedIcon}/>
                    Добавить
                </Fab>
            </Hidden>

            <Hidden mdUp>
                <Fab
                    variant="round"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    component={RouterLink}
                    to={`${HomepageUrl}/user/${userId}/new-app`}
                >
                    <AddRounded/>
                </Fab>
            </Hidden>
        </Container>
    );
}