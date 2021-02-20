import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import update from "immutability-helper";

//image imports
import demoProfile from '../images/demo_profile.png';

import {fade} from "@material-ui/core";
import {
    AddAPhotoRounded,
    ClearRounded,
    LockRounded,
    MailRounded,
    PersonRounded, StarsRounded,
    UpdateRounded
} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import FormSectionStyles from "../Styles/FormSectionStyles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {deleteUser, getUser, updateUser} from "../Api/ApiUser";
import {createUserForUpdate, getDefaultFieldsStateUser, getDefaultUser} from "../Api/ApiUserHelper";
import {
    getCurrentPasswordError,
    getProfileEmailError,
    getProfilePasswordError,
    getProfileUsernameError,
    getSlackCredentialsError,
    parseCurrentPasswordServerError,
    parseEmailServerError,
    parseUsernameServerError
} from "../Helpers/ErrorHelper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {Link as RouterLink} from "react-router-dom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import IconButton from "@material-ui/core/IconButton";
import {HomepageUrl} from "../App";
import Link from "@material-ui/core/Link";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Button from "@material-ui/core/Button";
import DeleteCardAndConfirmDialog from "../Components/DeleteCardAndConfirmDialog";
import AdaptiveBreadcrumbItem from "../Components/AdaptiveBreadcrumbItem";
import {deleteApp} from "../Api/ApiApp";

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


    textWithIcon: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },


    //profile settings
    avatarIconContainer: {
        position: 'relative',
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1.5)
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

    sectionMarginTop: {
        marginTop: theme.spacing(1)
    },
}));

export default function Profile(props) {
    let userId = props.userId;

    const [isStatusSuccessOpen, setStatusSuccessOpen] = React.useState(false);
    const [shouldChangeLogin, setShouldChangeLogin] = React.useState(false);
    const [shouldChangeEmail, setShouldChangeEmail] = React.useState(false);
    const [shouldChangePassword, setShouldChangePassword] = React.useState(false);
    const [fieldsStateUser, setFieldsStateUser] = React.useState(getDefaultFieldsStateUser());  // fieldsStateUser from server that handles field states
    const [currentUser, setCurrentUser] = React.useState(getDefaultUser());                     // current user from server
    const [enableNotifications, setEnableNotifications] = React.useState(false);
    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [currentPasswordServerError, setCurrentPasswordServerError] = React.useState("");
    const [usernameServerError, setUsernameServerError] = React.useState("");
    const [emailServerError, setEmailServerError] = React.useState("");

    const classes = useStyles();
    const formClasses = useFormStyles();

    //TODO ADD POSSIBILITY TO CHANGE PROFILE PHOTO
    function editProfile() {
        setErrorsVisible(true);
        setCurrentPasswordServerError("");
        setUsernameServerError("");
        setEmailServerError("");
        console.log(getProfileUsernameError(true, true, fieldsStateUser.username, currentUser.username, usernameServerError));
        if (!hasErrors(true, "", "", "")) {
            const newUser = createUserForUpdate(currentUser, fieldsStateUser, enableNotifications);
            updateUser(newUser)
                .then(result => {
                    console.log(result);

                    //save success so current user is equal to new user
                    setCurrentUser(newUser);
                    props.updatePopoverUser(newUser);

                    setStatusSuccessOpen(true);

                    //slackcredentials saved, other values are "" by default
                    //reset fields
                    const newFieldStateUser = getDefaultFieldsStateUser();
                    newFieldStateUser.slackCredentials = fieldsStateUser.slackCredentials;
                    setFieldsStateUser(newFieldStateUser);
                    setErrorsVisible(false);
                    setShouldChangeLogin(false);
                    setShouldChangeEmail(false);
                    setShouldChangePassword(false);
                })
                .catch(err => {
                    console.log(err.message);
                    setCurrentPasswordServerError(parseCurrentPasswordServerError(err.message));
                    setUsernameServerError(parseUsernameServerError(err.message));
                    setEmailServerError(parseEmailServerError(err.message));
                });
        }
    }

    function deleteCurrentUser(){
        deleteUser(userId)
            .then(result => {
                console.log("successfully deleted user with result: " + result);
                //TODO !!! DELETE FIX: DELETE COOKIES AND REDIRECT TO HOMEPAGE AFTER USER DELETE
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const handleStatusSuccessClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setStatusSuccessOpen(false);
    };

    const toggleLoginChange = (event) => {
        setShouldChangeLogin(event.target.checked);
    };

    const toggleEmailChange = (event) => {
        setShouldChangeEmail(event.target.checked);
    };

    const togglePasswordChange = (event) => {
        setShouldChangePassword(event.target.checked);
    };

    const toggleNotificationChange = (event) => {
        setEnableNotifications(event.target.checked);
    };

    const handleUsernameInput = (event) => {
        const newUser = update(fieldsStateUser, {username: {$set: event.target.value}});
        setFieldsStateUser(newUser);
        if (usernameServerError !== "")
            setUsernameServerError("");
    }

    const handleEmailInput = (event) => {
        const newUser = update(fieldsStateUser, {email: {$set: event.target.value}});
        setFieldsStateUser(newUser);
        if (emailServerError !== "")
            setEmailServerError("");
    }

    const handleNewPasswordInput = (event) => {
        const newUser = update(fieldsStateUser, {password: {$set: event.target.value}});
        setFieldsStateUser(newUser);
    }

    const handleCurrentPasswordInput = (event) => {
        const newUser = update(fieldsStateUser, {currentPassword: {$set: event.target.value}});
        setFieldsStateUser(newUser);
        if (currentPasswordServerError !== "")
            setCurrentPasswordServerError("");
    }

    const handleSlackCredentialsInput = (event) => {
        const newUser = update(fieldsStateUser, {slackCredentials: {$set: event.target.value}});
        setFieldsStateUser(newUser);
    };

    function hasErrors(areErrorsVisible, currentPasswordServerError, usernameServerError, emailServerError) {
        return getProfileUsernameError(areErrorsVisible, shouldChangeLogin, fieldsStateUser.username, currentUser.username, usernameServerError)
            + getProfileEmailError(areErrorsVisible, shouldChangeEmail, fieldsStateUser.email, currentUser.email, emailServerError)
            + getProfilePasswordError(areErrorsVisible, shouldChangePassword, fieldsStateUser.password)
            + getCurrentPasswordError(areErrorsVisible, shouldTypeCurrentPassword(), fieldsStateUser.currentPassword, currentPasswordServerError)
            + getSlackCredentialsError(areErrorsVisible, enableNotifications, fieldsStateUser.slackCredentials) !== "";
    }

    useEffect(() => {
        getUser(userId)
            .then(result => {
                result.password = ""; //add empty password as server doesn't return it
                setCurrentUser(result);
                setEnableNotifications(result.slackCredentials !== "");

                //slackcredentials from server, other values are "" by default
                const stateUser = update(fieldsStateUser, {slackCredentials: {$set: result.slackCredentials}});
                setFieldsStateUser(stateUser);
            })
            .catch(err => console.log(err.message));
    }, []);


    function shouldTypeCurrentPassword() {
        return shouldChangeLogin || shouldChangeEmail || shouldChangePassword
            || (enableNotifications && (currentUser.slackCredentials !== fieldsStateUser.slackCredentials))
            || (!enableNotifications && currentUser.slackCredentials !== "");
    }

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer}/>
            <Grid container spacing={3}>
                {/* App search toolbar */}
                <Grid item xs={12}>
                    <Paper elevation={1}>
                        <AppBar elevation={0} position="static" className={classes.extraToolbar}>
                            <Toolbar variant="dense" className={classes.extraToolbar} disableGutters>
                                <IconButton
                                    edge="start"
                                    aria-label="back to apps"
                                    component={RouterLink}
                                    to={`${HomepageUrl}/user/${userId}/apps`}
                                    className={classes.extraToolbarButtonBack}
                                >
                                    {<ArrowBackRoundedIcon color="action"/>}
                                </IconButton>
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
                                     className={classes.uploadAvatarIcon}><AddAPhotoRounded/>
                                </Fab>
                                {/* todo show delete button only if profile image is set */}
                                <Fab size='small' color="primary"
                                     className={classes.removeAvatarIcon}><ClearRounded/>
                                </Fab>
                            </div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant='h6'>
                                    Информация о профиле
                                </Typography>
                                <Typography variant='body2'>
                                    Текущие данные вашего профиля
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <Container className={classes.containerNotCentered}>
                                <Box className={classes.sectionMarginTop}>
                                    <Typography variant='subtitle1' gutterBottom className={classes.textWithIcon}>
                                        <PersonRounded className={classes.extendedIcon} color='primary'/>
                                        {currentUser.username}
                                    </Typography>
                                    <Typography variant='subtitle1' gutterBottom className={classes.textWithIcon}>
                                        <MailRounded className={classes.extendedIcon} color='primary'/>
                                        {currentUser.email}
                                    </Typography>
                                    <Typography variant='subtitle1' gutterBottom className={classes.textWithIcon}>
                                        <LockRounded className={classes.extendedIcon}
                                                     color={currentUser.slackCredentials === "" ? 'action' : 'primary'}/>
                                        <Typography noWrap>
                                            {currentUser.slackCredentials === ""
                                                ? "Уведомления выключены"
                                                : currentUser.slackCredentials}
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Container>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Редактирование профиля
                                </Typography>
                                <Typography variant="body2">
                                    Настройте данные вашего профиля
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <Container maxWidth='sm' className={classes.containerNotCentered}>
                                <Box>
                                    <FormControlLabel
                                        label="Сменить логин"
                                        control={<Checkbox
                                            checked={shouldChangeLogin}
                                            onChange={toggleLoginChange}
                                            value="change-login"
                                            color="primary"/>}
                                    />
                                    {shouldChangeLogin &&
                                    <TextField
                                        error={getProfileUsernameError(areErrorsVisible, shouldChangeLogin, fieldsStateUser.username, currentUser.username, usernameServerError) !== ''}
                                        helperText={getProfileUsernameError(areErrorsVisible, shouldChangeLogin, fieldsStateUser.username, currentUser.username, usernameServerError)}
                                        value={fieldsStateUser.username}
                                        onChange={handleUsernameInput}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="login"
                                        label="Новый логин"
                                        name="login"
                                        autoComplete='username'
                                    />}
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        label="Сменить почту"
                                        control={<Checkbox
                                            checked={shouldChangeEmail}
                                            onChange={toggleEmailChange}
                                            value="change-mail"
                                            color="primary"/>}/>
                                    {shouldChangeEmail &&
                                    <TextField
                                        error={getProfileEmailError(areErrorsVisible, shouldChangeEmail, fieldsStateUser.email, currentUser.email, emailServerError) !== ''}
                                        helperText={getProfileEmailError(areErrorsVisible, shouldChangeEmail, fieldsStateUser.email, currentUser.email, emailServerError)}
                                        value={fieldsStateUser.email}
                                        onChange={handleEmailInput}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Новая почта"
                                        name="email"
                                        autoComplete="email"/>
                                    }
                                </Box>

                                <Box>
                                    <FormControlLabel
                                        label="Сменить пароль"
                                        control={
                                            <Checkbox
                                                checked={shouldChangePassword}
                                                onChange={togglePasswordChange}
                                                value="change-password"
                                                color="primary"/>}/>
                                    {shouldChangePassword &&
                                    <TextField
                                        error={getProfilePasswordError(areErrorsVisible, shouldChangePassword, fieldsStateUser.password) !== ''}
                                        helperText={getProfilePasswordError(areErrorsVisible, shouldChangePassword, fieldsStateUser.password)}
                                        value={fieldsStateUser.password}
                                        onChange={handleNewPasswordInput}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        fullWidth
                                        name="new-password"
                                        label="Новый пароль"
                                        type="password"
                                        id="new-password"
                                        autoComplete="new-password"/>
                                    }
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={<Checkbox checked={enableNotifications}
                                                           onChange={toggleNotificationChange}
                                                           value="notifications-checkbox" color="primary"/>}
                                        label="Включить уведомления от бота"/>
                                    {enableNotifications &&
                                    <>
                                        <TextField
                                            error={getSlackCredentialsError(areErrorsVisible, enableNotifications, fieldsStateUser.slackCredentials) !== ''}
                                            helperText={getSlackCredentialsError(areErrorsVisible, enableNotifications, fieldsStateUser.slackCredentials)}
                                            value={fieldsStateUser.slackCredentials}
                                            onChange={handleSlackCredentialsInput}
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="slack-token"
                                            label="Slack-токен"
                                            name="slack-token">
                                        </TextField>
                                        <Link
                                            variant='caption'
                                            color='primary'
                                            href="https://api.slack.com/messaging/webhooks"
                                            target="_blank"
                                            rel='noreferrer'>
                                            Как получить токен и настроить канал в Slack
                                        </Link>
                                    </>}
                                </Box>
                                {shouldTypeCurrentPassword() &&
                                <Box className={classes.sectionMarginTop}>
                                    <Typography variant='subtitle1' gutterBottom className={classes.textWithIcon}>
                                        <LockRounded className={classes.extendedIcon} color='primary'/>
                                        Для смены данных требуется пароль
                                    </Typography>
                                    <TextField
                                        error={getCurrentPasswordError(areErrorsVisible, shouldTypeCurrentPassword(), fieldsStateUser.currentPassword, currentPasswordServerError) !== ''}
                                        helperText={getCurrentPasswordError(areErrorsVisible, shouldTypeCurrentPassword(), fieldsStateUser.currentPassword, currentPasswordServerError)}
                                        value={fieldsStateUser.currentPassword}
                                        onChange={handleCurrentPasswordInput}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        fullWidth
                                        id="password-current-password"
                                        label="Текущий пароль"
                                        type="password"
                                        name="password-current-password"
                                        autoComplete="current-password"
                                    />
                                </Box>}
                            </Container>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                   <DeleteCardAndConfirmDialog
                       cardTitle = "Удаление профиля"
                       cardSubtitle = "Удаление профиля без возможности восстановления"
                       buttonTitle = "Удалить профиль"
                       dialogTitle= "Удаление профиля"
                       dialogDescriptionComponent={
                           ()=><>
                               <Typography>
                               Это действие невозможно отменить.<br/>
                               Будут удалены все данные вашего профиля, в том числе добавленные приложения,
                               информация об отзывах, оценках, уведомлениях.
                               </Typography>
                           </>
                       }
                       confirmFieldLabel = "Логин профиля"
                       confirmFieldExpectedValue = {currentUser.username}
                       handleDeleteButton = {()=>deleteCurrentUser()}
                   />
                </Grid>
            </Grid>

            <Hidden smDown>
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    aria-label="update"
                    className={classes.fabBottom}
                    onClick={() => editProfile()}>
                    <UpdateRounded className={classes.extendedIcon}/>
                    Обновить
                </Fab>
            </Hidden>

            <Hidden mdUp>
                <Fab
                    variant="round"
                    size="medium"
                    color="secondary"
                    aria-label="update"
                    className={classes.fabBottom}
                    onClick={() => editProfile()}>
                    <UpdateRounded/>
                </Fab>
            </Hidden>

            <Snackbar open={isStatusSuccessOpen} autoHideDuration={1000} onClose={handleStatusSuccessClose}>
                <Alert onClose={handleStatusSuccessClose} severity="success">
                    Данные успешно обновлены
                </Alert>
            </Snackbar>
        </Container>
    );
}