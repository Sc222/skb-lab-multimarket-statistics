import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/logo.png";
import Box from "@material-ui/core/Box";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    textWithIcon: {
        display: 'flex',
        alignItems: 'center'
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
    positionCenter: {
        margin: "auto"
    },
    positionStart: {},
}));

ServiceNameAndLogo.defaultProps = {
    centered: false
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
            <Typography component="h1" variant="h6" color="inherit" display="inline" noWrap
                        className={clsx(classes.textWithIcon, getPositionClass())}>
                <span>
                    <Avatar variant="square" alt='Website logo' src={logo} className={classes.logoIcon}/>
                </span>
                Multimarket Statistics
            </Typography>
        </Box>
    );
}
