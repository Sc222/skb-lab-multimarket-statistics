import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import {Link as RouterLink} from 'react-router-dom';

import {HomepageUrl} from "../App";
import FormSectionStyles from "../Styles/FormSectionStyles";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function Login() {
    const classes = useStyles();

    function submitLogin() {
        //todo validate inputs, get inputs value and send server request
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
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
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
