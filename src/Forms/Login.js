import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import {Link as RouterLink} from 'react-router-dom';

import FormSectionStyles from "../Styles/FormSectionStyles";
import {getDefaultLoginCredentials, getDefaultUser} from "../Api/ApiUserHelper";
import {authenticateUser} from "../Api/ApiUser";
import update from "immutability-helper";
import {
    getPasswordError,
    getUsernameError,
    parseLoginWrongCredentialsServerError
} from "../Helpers/ErrorHelper";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function Login() {
    const classes = useStyles();

    const [areErrorsVisible, setErrorsVisible] = React.useState(false);
    const [user, setUser] = React.useState(getDefaultUser());
    const [token, setToken] = React.useState("");
    const [loginCredentials, setLoginCredentials] = React.useState(getDefaultLoginCredentials());
    const [wrongCredentials, setWrongCredentials] = React.useState(false);

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
                console.log(result);
                setUser(result.item1);
                setToken(result.item2);

                console.log(user);
                console.log(token);

                //TODO STORE TOKEN AND ID IN COOKIES AND REDIRECT TO DASHBOARD

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
                    {/*todo use repeating technique*/}
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

                    <Typography variant="body2" color='error'>
                        {wrongCredentials ? 'Неверный логин или пароль' : ''}
                    </Typography>

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
                                component={RouterLink} to={`./register`}
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
