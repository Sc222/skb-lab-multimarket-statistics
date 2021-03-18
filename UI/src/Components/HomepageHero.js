import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import logo from "../images/logo.png";
import clsx from "clsx";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import {getCookieUserId, isUserLoggedIn} from "../Helpers/CookieHelper";
import Button from "@material-ui/core/Button";
import {useFormSectionStyles} from "../Styles/FormSectionStyles";
import {useMarginStyles} from "../Styles/MarginStyles";

const useStyles = makeStyles((theme) => ({
    heroContainer: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    heroTitle: {
        display: "block",
        fontWeight: 500
    },
    heroSubtitleSelection: {
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    logoIconLargeCentered: {
        display: "block",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(15),
            height: theme.spacing(15)
        },
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(20),
            height: theme.spacing(20)
        },
    },
    buttonsCentered: {
        textAlign: "center"
    }
}));

HomepageHeroDescription.defaultProps = {
    isLarge: false
}

function HomepageHeroDescription(props) {
    const classes = useStyles();
    const margins = useMarginStyles();

    const getTitleVariant = () => props.isLarge ? "h2" : "h3";
    const getSubtitleVariant = () => props.isLarge ? "h4" : "h5";
    const getButtonSize = () => props.isLarge ? "large" : "medium";

    return (
        <>
            <Typography align="center" variant={getTitleVariant()} color="primary"
                        className={clsx(classes.heroTitle, margins.m1)}>
                Multimarket Statistics
            </Typography>
            <Typography align="center" variant={getSubtitleVariant()}>
                Система для просмотра отзывов и оценок приложений со всех маркетов
                <span className={classes.heroSubtitleSelection}> в одном месте</span>
            </Typography>
            <div className={clsx(classes.buttonsCentered, margins.m2T)}>
                {isUserLoggedIn()
                    ? <Button
                        size={getButtonSize()}
                        disableElevation
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`${HomepageUrl}/user/${getCookieUserId()}/apps`}
                    >
                        Вернуться в консоль
                    </Button>
                    : <>
                        <Button
                            size={getButtonSize()}
                            disableElevation
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to={`${HomepageUrl}/login`}
                        >
                            Войти
                        </Button>
                        <Button
                            className={margins.m1L}
                            size={getButtonSize()}
                            disableElevation
                            variant="outlined"
                            color="primary"
                            component={RouterLink}
                            to={`${HomepageUrl}/register`}
                        >
                            Зарегистрироваться
                        </Button>
                    </>
                }
            </div>
        </>
    );
}

export default function HomepageHero() {
    const classes = useStyles();
    const formClasses = useFormSectionStyles();

    return (
        <Container maxWidth="md" className={clsx(classes.heroContainer)}>
            <div className={formClasses.appBarSpacer}/>
            <div>
                <img alt="Website logo"
                     src={logo}
                     className={classes.logoIconLargeCentered}/>
                <Hidden mdUp>
                    <HomepageHeroDescription/>
                </Hidden>
                <Hidden smDown>
                    <HomepageHeroDescription isLarge/>
                </Hidden>
            </div>
        </Container>
    );
}
