import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import {Link as RouterLink} from 'react-router-dom';
import FormSectionStyles from "../../Styles/FormSectionStyles";
import {getDefaultLoginCredentials} from "../../Api/Helpers/ApiUserHelper";
import {authenticateUser} from "../../Api/ApiUser";
import update from "immutability-helper";
import {getPasswordError, getUsernameError, parseLoginWrongCredentialsServerError} from "../../Helpers/ErrorHelper";
import {HomepageUrl} from "../../App";
import {setCookieUsername, setCookieToken, setCookieUserId, getCookieUsername} from "../../Helpers/CookieHelper";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function Login(props) {
    const classes = useStyles();

    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [wrongCredentials, setWrongCredentials] = React.useState(false);
    const startCredentials = getDefaultLoginCredentials();
    startCredentials.username=getCookieUsername();
    const [loginCredentials, setLoginCredentials] = React.useState(startCredentials);

    function hasErrors(areErrorsVisible, wrongCredentials) {
        return !wrongCredentials &&
            getUsernameError(areErrorsVisible, loginCredentials.username)
            + getPasswordError(areErrorsVisible, loginCredentials.password)
            !== "";
    }

    function submitLogin() {
        setErrorsVisible(true)
        setWrongCredentials(false);

        if (!hasErrors(true, false)) {

            authenticateUser(loginCredentials)
                .then(result => {
                    setCookieUserId(result.user.id);
                    setCookieToken(result.token, new Date(result.expires));
                    setCookieUsername(result.user.username);

                    //set user and redirect
                    props.setLoggedInUser(result.user);
                })
                .catch(err => {
                    console.log(err.message);
                    setWrongCredentials(parseLoginWrongCredentialsServerError(err.message));
                });
        }
    }

    const handleUsernameInput = (event) => {
        const newLoginCredentials = update(loginCredentials, {username: {$set: event.target.value}});
        setLoginCredentials(newLoginCredentials);
        if (wrongCredentials)
            setWrongCredentials(false);
    }

    const handlePasswordInput = (event) => {
        const newLoginCredentials = update(loginCredentials, {password: {$set: event.target.value}});
        setLoginCredentials(newLoginCredentials);
        if (wrongCredentials)
            setWrongCredentials(false);
    }

    return (
        <div className={classes.cardContainer}>
            <div className={classes.container}>
                <Typography variant="h6">
                    Вход
                </Typography>
                <Typography variant="body2">
                    Войдите в аккаунт или зарегистрируйтесь на сайте
                </Typography>
            </div>
            <Divider className={classes.fullWidthDivider}/>
            <div className={classes.container}>
                <form noValidate>
                    <TextField
                        error={getUsernameError(areErrorsVisible, loginCredentials.username) !== ''}
                        helperText={getUsernameError(areErrorsVisible, loginCredentials.username)}
                        value={loginCredentials.username}
                        onChange={handleUsernameInput}
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="username"
                        label="Логин"
                        name="username"
                        autoComplete="username"
                    />
                    <TextField
                        error={getPasswordError(areErrorsVisible, loginCredentials.password) !== ''}
                        helperText={getPasswordError(areErrorsVisible, loginCredentials.password)}
                        value={loginCredentials.password}
                        onChange={handlePasswordInput}
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {wrongCredentials &&
                    <Typography variant="body2" color='error'>
                        Неверный логин или пароль
                    </Typography>
                    }

                    {/* TODO: PASSWORD-RESET IN DEVELOPMENT
                        <Box ml={1.5}>
                            <Link variant="body2" color='secondary'
                                  component={RouterLink} to={`./password-reset`}>
                                {'Забыли пароль?'}
                            </Link>
                        </Box>
                    */}
                    <Grid spacing={2} container className={classes.buttonGrid}>
                        <Grid xs item>
                            <Button
                                fullWidth
                                disableElevation
                                variant="contained"
                                color="primary"
                                onClick={() => submitLogin()}
                            >
                                Войти
                            </Button>
                        </Grid>
                        <Grid xs item>
                            <Button
                                fullWidth
                                disableElevation
                                variant="outlined"
                                color="primary"
                                component={RouterLink} to={`${HomepageUrl}/register`}
                            >
                                Зарегистрироваться
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}
