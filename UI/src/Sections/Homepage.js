import './Homepage.css';
import {Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {useFormSectionStyles} from "../Styles/FormSectionStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ServiceNameAndLogo from "../Components/ServiceNameAndLogo";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {getCookieUserId, isUserLoggedIn} from "../Helpers/CookieHelper";
import IconButton from "@material-ui/core/IconButton";
import demoProfile from "../images/demo_profile.png";
import {makeStyles} from "@material-ui/core/styles";
import {useMarginStyles} from "../Styles/MarginStyles";


const useStyles = makeStyles((theme) => ({
    profileIconButton: {
        marginLeft: theme.spacing(1.5),
        padding: 0
    },
    profileIcon: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5)
    }
}));

function Homepage() {
    //const formClasses = useStyles();

    const DemoSections = [
        {link: `${HomepageUrl}/register`, title: 'Регистрация'},
        {link: `${HomepageUrl}/login`, title: 'Вход'},
        {link: `${HomepageUrl}/password-reset`, title: 'Сброс пароля'},
        {link: `${HomepageUrl}/user/af19aef2-ddd0-42f6-8613-4685a50f35eb/apps`, title: 'Пользователь малый'},
        {link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/apps`, title: 'Пользователь большой'},
        {
            link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/profile`,
            title: 'Профиль пользователя большого'
        },
        {
            link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/new-app`,
            title: 'Добавить приложение'
        },
        {
            link: `${HomepageUrl}/user/2029c065-29b1-4897-8623-0f06301f5eaf/app/614828b5-6f50-4d62-a011-d2b501a92629/dashboard`,
            title: 'Панель управления VK (bigUser)'
        },
        {
            link: `${HomepageUrl}/user/029c065-29b1-4897-8623-0f06301f5eaf/app/614828b5-6f50-4d62-a011-d2b501a92629/settings`,
            title: 'Настройки приложения VK (bigUser)'
        },
    ];

    const classes = useStyles();
    const margins = useMarginStyles();
    const formClasses = useFormSectionStyles();

    return (
        <div>
            <AppBar position="absolute" color="transparent" elevation={0}>
                <Toolbar variant="dense">
                    <ServiceNameAndLogo fontColor="primary"/>

                    {isUserLoggedIn()
                        ? <IconButton className={classes.profileIconButton}
                                      color="inherit"
                                      component={RouterLink}
                                      to={`${HomepageUrl}/user/${getCookieUserId()}/apps`}>
                            {/*todo !!! USER PROFILE PIC load profile picture from server or cookies*/}
                            <Avatar className={classes.profileIcon} alt="Profile picture" src={demoProfile}/>
                        </IconButton>
                        : <>
                            <Button
                                className={margins.m05R}
                                size="small"
                                disableElevation
                                variant="outlined"
                                color="primary"
                                component={RouterLink}
                                to={`${HomepageUrl}/login`}
                            >
                                Войти
                            </Button>
                            <Button
                                size="small"
                                disableElevation
                                variant="text"
                                color="primary"
                                component={RouterLink}
                                to={`${HomepageUrl}/register`}
                            >
                                Зарегистрироваться
                            </Button>
                        </>
                    }
                </Toolbar>
                <Divider/>
            </AppBar>
            <main className={formClasses.content}>
                <Container maxWidth="sm" className={formClasses.containerWithYPadding}>
                    <div className={formClasses.appBarSpacer}/>
                    <Paper elevation={2} className={formClasses.paper}>
                        <div className={formClasses.cardContainer}>
                            <div className={formClasses.container}>
                                <Typography variant="h6">
                                    Неверный пользователь
                                </Typography>
                                <Typography variant="body2">
                                    Нельзя получить доступ к консоли другого пользователя
                                </Typography>
                            </div>
                            <Divider className={formClasses.fullWidthDivider}/>
                            <div className={formClasses.container}>
                                <Grid spacing={2} container className={formClasses.buttonGrid}>
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

export default Homepage;
