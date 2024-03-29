import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {useFormSectionStyles} from "../../Styles/FormSectionStyles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {HomepageUrl} from "../../App";
import {getCookieUserId} from "../../Helpers/CookieHelper";
import {Link as RouterLink} from 'react-router-dom';
import ServiceNameAndLogo from "../../Components/ServiceNameAndLogo";

export default function WrongUser() {
    const classes = useFormSectionStyles();

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar variant="dense">
                    <ServiceNameAndLogo centered/>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Container maxWidth="sm" className={classes.containerWithYPadding}>
                    <div className={classes.appBarSpacer}/>
                    <Paper elevation={2} className={classes.paper}>
                        <div className={classes.cardContainer}>
                            <div className={classes.container}>
                                <Typography variant="h6">
                                    Неверный пользователь
                                </Typography>
                                <Typography variant="body2">
                                    Нельзя получить доступ к консоли другого пользователя
                                </Typography>
                            </div>
                            <Divider className={classes.fullWidthDivider}/>
                            <div className={classes.container}>
                                <Grid spacing={2} container className={classes.buttonGrid}>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            size='medium'
                                            disableElevation
                                            variant="outlined"
                                            color="primary"
                                            component={RouterLink}
                                            to={`${HomepageUrl}/`}
                                        >
                                            Главная
                                        </Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Button
                                            fullWidth
                                            size='medium'
                                            disableElevation
                                            variant="contained"
                                            color="primary"
                                            component={RouterLink}
                                            to={`${HomepageUrl}/user/${getCookieUserId()}/apps`}
                                        >
                                            Вернуться в свою консоль
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}
