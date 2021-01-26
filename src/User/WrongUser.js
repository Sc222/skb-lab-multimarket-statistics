import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormSectionStyles from "../Styles/FormSectionStyles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {HomepageUrl} from "../App";
import {getCookieUserId} from "../Helpers/CookieHelper";


import {Link as RouterLink} from 'react-router-dom';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => FormSectionStyles(theme));

export default function WrongUser() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar variant="dense">
                    <Typography component="h1" variant="h6" color="inherit" noWrap
                                className={classes.titleCentered}>
                        Multimarket Statistics
                    </Typography>
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
                                    <Grid item>
                                        <Button
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
