import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import {Link as RouterLink} from 'react-router-dom';

import {HomepageUrl} from "../App";
import SimpleToolbar from "../SimpleToolbar";
import FormWindowStyles from "../Styles/FormWindowStyles";


const useStyles = makeStyles((theme) => FormWindowStyles(theme));

export default function Login() {
    const classes = useStyles();

    function submitLogin() {
        //todo validate inputs, get inputs value and send server request
    }

    return (
        <div className={classes.root}>
            <SimpleToolbar/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="sm">
                    <Paper elevation={2} className={classes.paper}>
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
                                    //todo is autofocus convenient?
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
                                <Box ml={1.5}>
                                    <Link variant="body2" color='secondary'
                                          component={RouterLink} to={`/${HomepageUrl}/password-reset`}>
                                        {'Забыли пароль?'}
                                    </Link>
                                </Box>
                                {/*
                            todo is remember me option needed?
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
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
                                            component={RouterLink} to={`/${HomepageUrl}/register`}
                                        >
                                            Зарегистрироваться
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}
