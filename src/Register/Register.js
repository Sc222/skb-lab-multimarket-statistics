import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import {Link as RouterLink} from 'react-router-dom';

import {HomepageUrl} from "../App";
import SimpleToolbar from "../SimpleToolbar";
import FormWindowStyles from "../Styles/FormWindowStyles";

const useStyles = makeStyles((theme) => FormWindowStyles(theme));

export default function Register() {
    const classes = useStyles();

    function submitRegister() {
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
                                Регистрация
                            </Typography>
                            <Typography variant="body2">
                                Зарегистрируйтесь на сайте или войдите в уже существующий аккаунт
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
                                    id="login"
                                    label="Логин"
                                    name="login"
                                    autoComplete="username"
                                    //todo is autofocus convenient?
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Почта"
                                    type="email"
                                    id="email"
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
                                    autoComplete="new-password"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="prove-password"
                                    label="Подтвердите пароль"
                                    type="password"
                                    id="prove-password"
                                    autoComplete="new-password"
                                />
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
                                            component={RouterLink} to={`/${HomepageUrl}/login`}
                                        >
                                            Войти
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
