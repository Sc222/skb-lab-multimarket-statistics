import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import {Link as RouterLink} from 'react-router-dom';

import {useFormSectionStyles} from "../../Styles/FormSectionStyles";
import {HomepageUrl} from "../../App";

export default function PasswordReset() {
    const classes = useFormSectionStyles();

    function submitPasswordReset() {
        //TODO PASSWORD-RESET IN DEVELOPMENT: validate inputs, get inputs value and send server request
    }

    return (
        <div className={classes.cardContainer}>
            <div className={classes.container}>
                <Typography variant="h6">
                    Сброс пароля
                </Typography>
                <Typography variant="body2">
                    Введите почту, на которую зарегистрирован аккаунт и на неё придёт ссылка для сброса
                    пароля
                </Typography>
            </div>
            <Divider className={classes.fullWidthDivider}/>
            <div className={classes.container}>
                <form noValidate>
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
                    <Grid spacing={2} container className={classes.buttonGrid}>
                        <Grid xs item>
                            <Button
                                fullWidth
                                disableElevation
                                variant="contained"
                                color="primary"
                                onClick={() => submitPasswordReset()}
                            >
                                Отправить
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
