import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import clsx from "clsx";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import {getCookieUserId, isUserLoggedIn} from "../Helpers/CookieHelper";
import Button from "@material-ui/core/Button";
import {useMarginStyles} from "../Styles/MarginStyles";
import {GitHub} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    primaryBackground: {
        backgroundColor: theme.palette.primary.main
    },
    footerContainer: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6)
    },
    footerTitle: {
        color: theme.palette.background.default,
        display: "block",
        fontWeight: 500
    },
    footerSubtitle: {
        fontWeight: 200,
        color: theme.palette.background.default
    },
    buttonsCentered: {
        textAlign: "center"
    },
    textWhite: {
        color: "white"
    }
}));

HomepageFooterDescription.defaultProps = {
    isLarge: false
}

function HomepageFooterDescription(props) {
    const classes = useStyles();
    const margins = useMarginStyles();

    const getTitleVariant = () => props.isLarge ? "h2" : "h3";
    const getSubtitleVariant = () => props.isLarge ? "h4" : "h5";
    const getButtonSize = () => props.isLarge ? "large" : "medium";

    return (
        <div>
            <Typography align="center" variant={getTitleVariant()} color="primary"
                        className={clsx(classes.footerTitle, margins.m1)}>
                Попробуйте прямо сейчас
            </Typography>
            <Typography align="center" variant={getSubtitleVariant()} className={classes.footerSubtitle}>
                Войдите в консоль, если вы уже настроили ее на своей машине или посмотрите, как это сделать на Github
            </Typography>
            <div className={clsx(classes.buttonsCentered, margins.m2T)}>
                {isUserLoggedIn()
                    ? <Button
                        size={getButtonSize()}
                        disableElevation
                        variant="contained"
                        component={RouterLink}
                        to={`${HomepageUrl}/user/${getCookieUserId()}/apps`}
                    >
                        Вернуться в консоль
                    </Button>
                    : <Button
                        size={getButtonSize()}
                        disableElevation
                        variant="contained"
                        component={RouterLink}
                        to={`${HomepageUrl}/login`}
                    >
                        Войти
                    </Button>
                }
                <Button
                    className={clsx(classes.textWhite, margins.m2L)}
                    size={getButtonSize()}
                    disableElevation
                    variant="text"
                    startIcon={<GitHub color="inherit"/>}
                    component="a"
                    href={"https://github.com/Sc222/skb-lab-multimarket-statistics/"}
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </Button>
            </div>
        </div>
    );
}

export default function HomepageFooter() {
    const classes = useStyles();

    return (
        <div className={clsx(classes.primaryBackground)}>
            <Container maxWidth="md" className={classes.footerContainer}>
                <Hidden mdUp>
                    <HomepageFooterDescription/>
                </Hidden>
                <Hidden smDown>
                    <HomepageFooterDescription isLarge/>
                </Hidden>
            </Container>
        </div>
    );
}
