import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import {Link as RouterLink} from 'react-router-dom';

import FormSectionStyles from "../Styles/FormSectionStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
    getRegisterEmailError,
    getPasswordError,
    getUsernameError,
    getSlackCredentialsError,
    parseEmailServerError,
    parseUsernameServerError
} from "../Helpers/ErrorHelper";
import {createUserForCreate, getDefaultLoginCredentials, getDefaultUserNoId} from "../Api/ApiUserHelper";
import update from "immutability-helper";
import {authenticateUser, createUser} from "../Api/ApiUser";
import {HomepageUrl} from "../App";
import {setCookieToken, setCookieUserId} from "../Helpers/CookieHelper";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function Register(props) {
    const classes = useStyles();

    const [enableNotifications, setEnableNotifications] = React.useState(false);
    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [newUser, setNewUser] = React.useState(getDefaultUserNoId());
    const [usernameServerError, setUsernameServerError] = React.useState("");
    const [emailServerError, setEmailServerError] = React.useState("");

    function hasErrors(areErrorsVisible, usernameServerError, emailServerError) {
        return getUsernameError(areErrorsVisible, newUser.username, usernameServerError)
            + getRegisterEmailError(areErrorsVisible, newUser.email, emailServerError)
            + getPasswordError(areErrorsVisible, newUser.password)
            + getSlackCredentialsError(areErrorsVisible, enableNotifications, newUser.slackCredentials) !== "";
    }

    function submitRegister() {
        setErrorsVisible(true);
        setUsernameServerError("");
        setEmailServerError("");
        if (!hasErrors(true, "", "")) {
            const userForCreate = createUserForCreate(newUser, enableNotifications);
            createUser(userForCreate)
                .then(result => {
                    console.log("successfully created user with id: " + result);
                    console.log(newUser);
                    console.log(userForCreate);

                    //TODO REMOVE TEMP SOLUTION USING TOKEN
                    //const loggedInUser = newUser;
                    //console.log("result blob: "+result);
                    //loggedInUser.id=result;
                    //props.setLoggedInUser(loggedInUser);
                    const loginCredentials = getDefaultLoginCredentials();
                    loginCredentials.username=newUser.username;
                    loginCredentials.password=newUser.password;

                    return loginCredentials;
                    //TODO !!! REQUEST AUTHENTICATION TOKEN
                    //TODO !!! REDIRECT TO USER APPS LIST
                })
                .then(user=> {
                    const loginCredentials = getDefaultLoginCredentials();
                    loginCredentials.username=user.username;
                    loginCredentials.password=user.password;
                        authenticateUser(loginCredentials).then(result => {
                            setCookieUserId(result.user.id);
                            setCookieToken(result.token);

                            //set user and redirect
                            props.setLoggedInUser(result.user);
                        })
                    }

                )
                .catch(err => {
                    console.log(err.message);
                    setUsernameServerError(parseUsernameServerError(err.message));
                    setEmailServerError(parseEmailServerError(err.message));
                });
        }
    }

    const toggleNotificationChange = (event) => {
        setEnableNotifications(event.target.checked);
    };

    const handleUsernameInput = (event) => {
        const newUserValue = update(newUser, {username: {$set: event.target.value}});
        setNewUser(newUserValue);

        if (usernameServerError !== "")
            setUsernameServerError("");
    }

    const handleEmailInput = (event) => {
        const newUserValue = update(newUser, {email: {$set: event.target.value}});
        setNewUser(newUserValue);

        if (emailServerError !== "")
            setEmailServerError("");
    }

    const handlePasswordInput = (event) => {
        const newUserValue = update(newUser, {password: {$set: event.target.value}});
        setNewUser(newUserValue);
    }

    const handleSlackCredentialsInput = (event) => {
        const newUserValue = update(newUser, {slackCredentials: {$set: event.target.value}});
        setNewUser(newUserValue);
    };

    return (
        <div className={classes.cardContainer}>
            <div className={classes.container}>
                <Typography variant="h6">
                    Регистрация
                </Typography>
                <Typography variant="body2">
                    Зарегистрируйтесь на сайте или войдите в уже существующий аккаунт
                </Typography>
            </div>
            <Divider className={classes.fullWidthDivider}/>
            <div className={classes.container}>
                <form noValidate>
                    <TextField
                        error={getUsernameError(areErrorsVisible, newUser.username, usernameServerError) !== ''}
                        helperText={getUsernameError(areErrorsVisible, newUser.username, usernameServerError)}
                        value={newUser.username}
                        onChange={handleUsernameInput}
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="login"
                        label="Логин"
                        name="login"
                        autoComplete='username'
                    />
                    <TextField
                        error={getRegisterEmailError(areErrorsVisible, newUser.email, emailServerError) !== ''}
                        helperText={getRegisterEmailError(areErrorsVisible, newUser.email, emailServerError)}
                        value={newUser.email}
                        onChange={handleEmailInput}
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
                        error={getPasswordError(areErrorsVisible, newUser.password) !== ''}
                        helperText={getPasswordError(areErrorsVisible, newUser.password)}
                        value={newUser.password}
                        onChange={handlePasswordInput}
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={enableNotifications}
                                           onChange={toggleNotificationChange}
                                           value="notifications-checkbox" color="primary"/>}
                        label="Включить уведомления от Slack-бота"
                    />
                    {
                        !enableNotifications &&
                        <Typography variant="body2" color='textSecondary'>
                            Можно включить позднее в разделе «Настройки»
                        </Typography>
                    }
                    {
                        enableNotifications &&
                        <TextField
                            error={getSlackCredentialsError(areErrorsVisible, enableNotifications, newUser.slackCredentials) !== ''}
                            helperText={getSlackCredentialsError(areErrorsVisible, enableNotifications, newUser.slackCredentials)}
                            value={newUser.slackCredentials}
                            onChange={handleSlackCredentialsInput}
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="slack-token"
                            label="Slack-токен"
                            name="slack-token">
                        </TextField>
                    }
                    <Grid spacing={2} container className={classes.buttonGrid}>
                        <Grid xs item>
                            <Button
                                fullWidth
                                disableElevation
                                variant="contained"
                                color="primary"
                                onClick={() => submitRegister()}
                            >
                                Зарегистрироваться
                            </Button>
                        </Grid>
                        <Grid xs item>
                            <Button
                                fullWidth
                                disableElevation
                                variant="outlined"
                                color="primary"
                                component={RouterLink} to={`${HomepageUrl}/login`}
                            >
                                Войти
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}
