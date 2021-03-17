import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {fade} from "@material-ui/core";
import {AddRounded, SearchRounded} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import Hidden from "@material-ui/core/Hidden";
import {Link as RouterLink} from "react-router-dom";
import {getApps} from "../../Api/ApiApp";
import {escapeRegex} from "../../Helpers/UtilsHelper";
import {HomepageUrl} from "../../App";
import AppInfoCard from "../../Components/AppInfoCard";

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
        display: 'flex'
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
    paperContainer: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        width: '100%'
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
        }
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
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
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
                width: '30ch'
            }
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default function Apps(props) {
    let userId = props.userId;
    const classes = useStyles();

    const [apps, setApps] = React.useState(undefined);
    const [appsNameFilter, setAppsNameFilter] = React.useState('');

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
                            <Typography variant="h6" color="primary">
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
                            <Typography variant="h6" color="primary">У Вас еще нет
                                приложений
                            </Typography>
                            <Typography variant="body1">
                                Нажмите на кнопку <Link component={RouterLink}
                                                        to={`${HomepageUrl}/user/${userId}/new-app`}>добавить</Link> для
                                того, чтобы создать новое приложение
                            </Typography>
                        </div>
                    </Paper>
                </Grid>);
        } else if (apps.length !== 0) {
            const filteredApps = apps.filter(isNameMatchesSearchFilter);
            if (filteredApps.length === 0) {
                return (
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className={classes.paperContainer}>
                                <Typography variant="h6" color="primary">
                                    Приложения не найдены
                                </Typography>
                                <Typography variant="body1">
                                    Не найдены приложения с введенным названием
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                );
            }
            return filteredApps.map(app => {
                return (
                    <Grid key={app.id} item xs={12} md={6}>
                        <AppInfoCard app={app} iconGridMd={3} isButtonBaseEnabled
                                     buttonBaseLink={`${HomepageUrl}/user/${userId}/app/${app.id}/`}/>
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