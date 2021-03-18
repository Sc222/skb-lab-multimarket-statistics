import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/logo.png";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";

const useStyles = makeStyles((theme) => ({
    textWithIcon: {
        display: "flex",
        alignItems: "center"
    },
    logoIcon: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
        marginRight: theme.spacing(1)
    },
    container: {
        display: "flex",
        flexGrow: 1
    },
    buttonPadding: {
        padding: theme.spacing(0.5)
    },
    positionCenter: {
        margin: "auto"
    },
    positionStart: {}
}));

ServiceNameAndLogo.defaultProps = {
    centered: false,
    fontColor: "inherit"
}

export default function ServiceNameAndLogo(props) {
    const classes = useStyles();

    function getPositionClass() {
        return props.centered
            ? classes.positionCenter
            : classes.positionStart;
    }

    return (
        <Box className={classes.container}>
            <ButtonBase component={RouterLink} to={`${HomepageUrl}/`}
                        className={clsx(classes.buttonPadding, getPositionClass())}>
                <Typography variant="h6" color={props.fontColor} display="inline" noWrap
                            className={classes.textWithIcon}>
                <span>
                    <Avatar variant="square" alt="Website logo" src={logo} className={classes.logoIcon}/>
                </span>
                    Multimarket Statistics
                </Typography>
            </ButtonBase>
        </Box>
    );
}
