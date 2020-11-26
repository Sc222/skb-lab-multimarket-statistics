import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//image imports
import demoProfile from '../images/demo_profile.png';


import {fade} from "@material-ui/core";
import {AddAPhotoRounded, ClearRounded, DoneRounded} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import FormSectionStyles from "../Styles/FormSectionStyles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useFormStyles = makeStyles((theme) => FormSectionStyles(theme));

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

    extraToolbarButtonBack: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    },
    title: {
        flexGrow: 1,
        /*textAlign:"center" todo toolbar title styles here*/
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
    paperNoBottomPadding: {
        display: 'flex',
        paddingTop: theme.spacing(1.5),
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

    marketsContainer: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1.5),
        '& > *': {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5),
        },
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
    extraToolbarTitleNoHide: {
        flexGrow: 1,
        display: 'block',
    },
    searchCard: {
        display: 'block',
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(1.5),
        position: 'relative',
        backgroundColor: fade(theme.palette.common.black, 0.07),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.09),
        },

        [theme.breakpoints.up('sm')]: {
            display: 'inline-block',
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
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '45ch'
        },
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    fullWidthDivider: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
    },

    containerNotCentered: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    },

    //profile settings
    avatarIconContainer: {
        position: 'relative',
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop:theme.spacing(1.5)
    },
    avatarIconLarge: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    uploadAvatarIcon: {
        boxShadow: 'none !important',
        position: 'absolute',
        top: '0',
        right: '0'
    },
    removeAvatarIcon: {
        boxShadow: 'none !important',
        position: 'absolute',
        bottom: '0',
        left: '0'
    },
}));

export default function Profile(props) {
    let username = props.username;

    //todo get this values from net
    const [shouldChangeEmail, setShouldChangeEmail] = React.useState(false);
    const [shouldChangePassword, setShouldChangePassword] = React.useState(false);
    const [enableNotifications, setEnableNotifications] = React.useState(true);

    const classes = useStyles();
    const formClasses = useFormStyles();

    function editProfile() {
        //todo validate input and check if username is unique,
        //todo  make post request to edit profile and redirect to apps section if everything is ok
        //todo !!! TYPE CURRENT PASSWORD TO CHANGE EMAIL OR PASSWORD
        console.log('update profile');
    }

    useEffect(() => {
        // todo load info by username
        console.log(username);
    }, []);


    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer}/>
            <Grid container spacing={3}>
                {/* App search toolbar */}
                <Grid item xs={12}>
                    <Paper elevation={1}>
                        <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                            <Toolbar variant="dense" className={classes.extraToolbar}>
                                <Typography className={classes.extraToolbarTitleNoHide} variant="h6" noWrap>
                                    Настройки
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Изображение профиля
                                </Typography>
                                <Typography variant="body2">
                                    Удалите или загрузите изображение профиля
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>

                                    <div className={classes.avatarIconContainer}>
                                        <Avatar alt="Profile" src={demoProfile} className={classes.avatarIconLarge}>
                                        </Avatar>
                                        <Fab size='small' color="secondary"
                                             className={classes.uploadAvatarIcon}><AddAPhotoRounded/></Fab>
                                        {/* todo show delete button only if profile image is set */}
                                        <Fab size='small' color="primary"
                                             className={classes.removeAvatarIcon}><ClearRounded/></Fab>
                                    </div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Данные для входа
                                </Typography>
                                <Typography variant="body2">
                                    Настройте логин, смените почту или пароль
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <Container maxWidth='sm' className={classes.containerNotCentered}>
                                {/*todo use repeating technique*/}
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Логин"
                                    name="login"
                                    autoComplete='username'
                                >
                                </TextField>

                                <Box>
                                    <FormControlLabel
                                        control={<Checkbox value="change-mail" color="primary"/>}
                                        label="Сменить почту?"
                                        checked={shouldChangeEmail}
                                        onClick={() => setShouldChangeEmail(!shouldChangeEmail)}
                                    />
                                </Box>
                                {
                                    shouldChangeEmail &&
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Почта"
                                            name="email"
                                            autoComplete="email"
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            name="password-change-email"
                                            label="Текущий пароль"
                                            type="password"
                                            id="password-change-email"
                                            autoComplete="current-password"
                                        />
                                    </div>
                                }

                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="change-mail"
                                                color="primary"
                                                checked={shouldChangePassword}
                                                onClick={() => setShouldChangePassword(!shouldChangePassword)}
                                            />}
                                        label="Сменить пароль?"
                                    />
                                </Box>
                                {
                                    shouldChangePassword &&
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="password-change-password"
                                            label="Текущий пароль"
                                            name="password-change-password"
                                            autoComplete="current-password"
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            name="new-password"
                                            label="Новый пароль"
                                            type="password"
                                            id="new-password"
                                            autoComplete="new-password"
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            name="prove-new-password"
                                            label="Подтвердите пароль"
                                            type="password"
                                            id="prove-new-password"
                                            autoComplete="new-password"
                                        />
                                    </div>
                                }
                            </Container>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Slack уведомления
                                </Typography>
                                <Typography variant="body2">
                                    Настройте Slack-бота для получения уведомлений
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <Container maxWidth='sm' className={classes.containerNotCentered}>
                                    {/*todo use repeating technique*/}
                                    <TextField
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="slack-token"
                                        label="OAuth-токен"
                                        name="slack-token"
                                    >
                                    </TextField>

                                    <Box>
                                        <FormControlLabel
                                            control={<Checkbox value="notifications-checkbox" color="primary"/>}
                                            label="Включить уведомления от бота"
                                            checked={enableNotifications}
                                            onClick={() => setEnableNotifications(!enableNotifications)}
                                        />
                                    </Box>

                            </Container>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <Hidden smDown>
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    onClick={() => editProfile()}
                >
                    <DoneRounded className={classes.extendedIcon}/>
                    Завершить
                </Fab>
            </Hidden>

            <Hidden mdUp>
                <Fab
                    variant="round"
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fabBottom}
                    onClick={() => editProfile()}
                >
                    <DoneRounded/>
                </Fab>
            </Hidden>

        </Container>
    );
}